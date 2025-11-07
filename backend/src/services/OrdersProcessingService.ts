import { Address, Order } from "shared/types";
import { DatabaseService as dbs, SystemSettingsService } from "@services";
import { payment, shipping } from "@adapters/services";
import { toMajorPriceString } from "shared/utils/PriceUtils";
import { OrderProcessingApi } from "shared/interfaces";
import { OrderStatusKeys, TransactionStatusKeys } from "shared/types";
/**
 * OrderProcessingService handles:
 *  - Placing orders
 *  - Stock validation and updates
 *  - Payment authorization and capture
 *  - Buying shipping labels
 */
class OrderProcessingService implements OrderProcessingApi {
  /**
   * Places an order:
   *  - Checks stock
   *  - Authorizes payment
   *  - Creates order and updates stock atomically
   *  - Captures payment
   */
  async placeOrder(
    paymentMethod: any,
    order: Order
  ): Promise<{
    success: boolean;
    data?: { newOrder: Order; payment: any };
    error?: string;
  }> {
    try {
      if (!order.items?.length) throw new Error("Order has no items");

      order.status = OrderStatusKeys.PENDING;
      order.statusHistory = [
        { status: OrderStatusKeys.PENDING, timestamp: new Date() },
      ];

      // 1️⃣ Check stock (optimized to fetch all products & variants in parallel)
      await this.stockAvailable(order, dbs);

      // 2️⃣ Prepare metadata for payment
      const metadata: Record<string, string> = {};
      order.items.forEach((item, index) => {
        const itemName = item.product.name ?? "unknown";
        const quantity = item.quantity || 1;
        const total = toMajorPriceString(item.price); // assuming this gives the total for that line
        metadata[`item_${index}`] = `${itemName}_x${quantity}_$${total}`;
      });

      // 3️⃣ Authorize payment
      const paymentResult = await payment.authorizePayment({
        token: paymentMethod.id,
        amount: order.total / 100,
        currency: order.transaction?.currency || "USD",
        metadata,
      });

      if (paymentResult.status !== "AUTHORIZED")
        throw new Error(
          "Payment authorization failed. Try another payment method."
        );

      order.transaction!.status = TransactionStatusKeys.AUTHORIZED;
      order.transaction!.transactionRef = paymentResult.id;
      order.status = OrderStatusKeys.PROCESSING;
      order.statusHistory!.push({
        status: OrderStatusKeys.PROCESSING,
        timestamp: new Date(),
      });

      console.log("Stock verified, creating order...", order);

      // 4️⃣ Create order and update stock in a transaction
      let newOrder: Order | undefined;
      await dbs.transaction(async (tx) => {
        // Re-check stock in transaction to prevent race conditions
        await this.stockAvailable(order, tx);

        // Create order
        newOrder = await tx.orders.create(order);

        if (!newOrder) throw new Error("Failed to create order");

        // Update stock for products & variants sequentially for pool safety
        await this.updateStockSafe(order, tx);
      });

      if (!newOrder) throw new Error("Failed to create order");

      // 5️⃣ Capture payment
      const captureResult = await payment.capturePayment(paymentResult.id);

      if (captureResult.status !== "CAPTURED")
        throw new Error("Payment capture failed");

      newOrder.transaction!.transactionRef = captureResult.id;
      newOrder.transaction!.status = TransactionStatusKeys.PAID;
      newOrder.status = OrderStatusKeys.PAID;
      newOrder.statusHistory!.push({
        status: OrderStatusKeys.PAID,
        timestamp: new Date(),
      });

      const finalOrder = await dbs.orders.update({ ...newOrder } as Order & {
        id: string;
      });

      if (!finalOrder)
        throw new Error("Failed to update order after payment capture");

      console.log("Order placed successfully:", finalOrder);

      return {
        success: true,
        data: { newOrder: finalOrder!, payment: captureResult },
      };
    } catch (error) {
      console.error("Error placing order:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Buy a shipping label for an order
   */
  async buyOrderShipping(orderId: string): Promise<Order | null> {
    const order = await dbs.orders.getOne({ id: orderId });
    if (!order) throw new Error(`Order not found (id: ${orderId})`);

    // Ensure shipping info exists
    const adminSettings = await SystemSettingsService.getAdminSettings();
    const fromAddress: Address = adminSettings?.shippingOrigin!;
    const toAddress = order.shippingInfo?.address;

    // Validate addresses
    if (!fromAddress)
      throw new Error("System shipping origin address is not set");
    if (!toAddress) throw new Error("Order has no shipping address");

    const parcel = { length: 12, width: 8, height: 4, weight: 32 };

    // Create & purchase shipment in parallel
    const [shipment, purchasedShipment] = await (async () => {
      const s = await shipping.createShipment(fromAddress, toAddress, parcel);
      if (!s) throw new Error("Failed to create shipment");
      const p = await shipping.buyShipment(s.id);
      if (!p) throw new Error("Failed to buy shipment");
      return [s, p];
    })();

    order.shippingInfo = {
      ...order.shippingInfo,
      shipmentId: purchasedShipment.id,
      parcel,
      tracking: purchasedShipment.trackingNumber,
      labelUrl: purchasedShipment.labelUrl,
      carrier: purchasedShipment.carrier,
      status: purchasedShipment.status,
    };

    await dbs.orders.update(order as Order & { id: string });

    console.log("Shipping purchased:", purchasedShipment);
    return order;
  }

  /**
   * Refund an order (not implemented)
   */
  async refundOrder(id: string): Promise<void> {
    // TODO: implement refund logic
  }

  /**
   * Check if stock is available for all order items
   * Optimized:
   *  - Fetch all products & variants in parallel
   *  - Build maps for O(1) lookup
   */
  private async stockAvailable(order: Order, dbService: any): Promise<boolean> {
    const productIds = order.items!.map((item) => item.product.id!);
    const variantIds = order
      .items!.map((item) => item.variant?.id)
      .filter(Boolean) as string[];

    const [productResult, variantResult] = await Promise.all([
      dbService.products.getMany({
        conditions: [{ field: "id", operator: "in", value: productIds }],
        select: ["id", "name", "stock"],
      }),
      variantIds.length
        ? dbService.productVariants.getMany({
            conditions: [{ field: "id", operator: "in", value: variantIds }],
            select: ["id", "productId", "stock"],
          })
        : Promise.resolve({ data: [] }),
    ]);

    const productMap = Object.fromEntries(
      (productResult?.data ?? []).map((p: any) => [p.id!, p])
    );
    const variantMap = Object.fromEntries(
      (variantResult?.data ?? []).map((v: any) => [v.id!, v])
    );

    for (const item of order.items!) {
      const quantity = item.quantity || 1;

      if (item.variant?.id) {
        const variant = variantMap[item.variant.id];
        if (!variant) throw new Error(`Variant not found: ${item.variant.id}`);
        if (variant.stock != null && variant.stock < quantity)
          throw new Error(
            `Insufficient stock for variant ${variant.id} of product ${item.product.id}`
          );
      } else {
        const product = productMap[item.product.id!];
        if (!product) throw new Error(`Product not found: ${item.product.id}`);
        if (product.stock != null && product.stock < quantity)
          throw new Error(`Insufficient stock for product ${product.id}`);
      }
    }

    return true;
  }

  /**
   * Update stock for all order items safely
   * Optimized for Supabase / small connection pools:
   *  - Aggregate updates
   *  - Apply sequentially to prevent pool exhaustion
   */
  private async updateStockSafe(order: Order, dbService: any) {
    const productUpdates: Record<string, number> = {};
    const variantUpdates: Record<string, number> = {};

    for (const item of order.items!) {
      const quantity = item.quantity || 1;
      if (item.variant?.id) {
        variantUpdates[item.variant.id] =
          (variantUpdates[item.variant.id] || 0) + quantity;
        productUpdates[item.product.id!] =
          (productUpdates[item.product.id!] || 0) + quantity;
      } else if (item.product?.id) {
        productUpdates[item.product.id] =
          (productUpdates[item.product.id] || 0) + quantity;
      }
    }

    // Sequential updates: safe for small connection pools
    for (const [variantId, qty] of Object.entries(variantUpdates)) {
      await dbService.productVariants.update(
        { id: variantId, stock: -qty },
        { increment: true }
      );
    }

    for (const [productId, qty] of Object.entries(productUpdates)) {
      await dbService.products.update(
        { id: productId, stock: -qty },
        { increment: true }
      );
    }
  }
}

export default new OrderProcessingService();
