import { SystemSettingsService } from "@services";
import {
  Address,
  Order,
  Product,
  ProductVariant,
  QueryObject,
} from "shared/types";
import { db, payment, shipping } from "@adapters/services";
import { DBAdapter } from "@adapters/types/DBAdapter";
import { toMajorPriceString } from "shared/utils/PriceUtils";
import { OrderProcessingApi } from "shared/interfaces";

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

      // 1️⃣ Check stock (optimized to fetch all products & variants in parallel)
      await this.stockAvailable(order, db);

      // 2️⃣ Prepare metadata for payment
      const metadata: Record<string, string> = {};
      order.items.forEach((item, index) => {
        const prefix = `item_${index}_`;
        metadata[`${prefix}productId`] = item.product.id ?? "unknown";
        metadata[`${prefix}variantId`] = item.variant?.id ?? "unknown";
        metadata[`${prefix}name`] = item.product.name ?? "unknown";
        metadata[`${prefix}quantity`] = String(item.quantity || 1);
        metadata[`${prefix}price`] = String(toMajorPriceString(item.price));
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

      // 4️⃣ Create order and update stock in a transaction
      let newOrder: Order | undefined;
      await db.transaction(async (tx) => {
        // Re-check stock in transaction to prevent race conditions
        await this.stockAvailable(order, tx);

        // Create order
        newOrder = await tx.orders.create(order);

        // Update stock for products & variants
        await this.updateStock(order, tx);
      });

      // 5️⃣ Capture payment
      const captureResult = await payment.capturePayment(paymentResult.id);
      if (captureResult.status !== "CAPTURED")
        throw new Error("Payment capture failed");

      return {
        success: true,
        data: { newOrder: newOrder!, payment: captureResult },
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
    const order = await db.orders.getOne({ id: orderId });
    if (!order) throw new Error(`Order not found (id: ${orderId})`);

    // Get store origin address
    const adminSettings = await SystemSettingsService.getAdminSettings();
    const fromAddress: Address = {
      name: "My Store",
      street1: "1791 King Ave",
      city: "Hamilton",
      state: "OH",
      postalCode: "45015",
      country: "US",
      phone: "614-555-1234",
      email: "info@mystore.com",
    };

    const normalizedFrom = (await shipping.verifyAddress(fromAddress))
      .normalizedAddress;
    if (!normalizedFrom) throw new Error("Shipping origin address not set");

    const toAddress = order.shippingInfo?.address;
    if (!toAddress) throw new Error("Order has no shipping address");

    const parcel = { length: 12, width: 8, height: 4, weight: 32 };

    // Create & purchase shipment in parallel
    const [shipment, purchasedShipment] = await (async () => {
      const s = await shipping.createShipment(
        normalizedFrom,
        toAddress,
        parcel
      );
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

    await db.orders.update(order as Order & { id: string });

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
  private async stockAvailable(
    order: Order,
    dbAdapter: DBAdapter
  ): Promise<boolean> {
    const productIds = order.items!.map((item) => item.product.id!);
    const variantIds = order
      .items!.map((item) => item.variant?.id)
      .filter(Boolean) as string[];

    const [productResult, variantResult] = await Promise.all([
      dbAdapter.products.getMany({
        conditions: [{ field: "id", operator: "in", value: productIds }],
        select: ["id", "name", "stock"],
      }),
      variantIds.length
        ? dbAdapter.productVariants.getMany({
            conditions: [{ field: "id", operator: "in", value: variantIds }],
            select: ["id", "productId", "stock"],
          })
        : Promise.resolve({ data: [] }),
    ]);

    const productMap = Object.fromEntries(
      (productResult?.data ?? []).map((p) => [p.id!, p])
    );
    const variantMap = Object.fromEntries(
      (variantResult?.data ?? []).map((v) => [v.id!, v])
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
   * Update stock for all order items
   * Optimized:
   *  - Aggregate updates
   *  - Apply bulk updates in parallel
   */
  private async updateStock(order: Order, dbAdapter: DBAdapter) {
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

    const promises: Promise<any>[] = [];

    for (const [variantId, qty] of Object.entries(variantUpdates)) {
      promises.push(
        dbAdapter.productVariants.update(
          { id: variantId, stock: -qty },
          { increment: true }
        )
      );
    }

    for (const [productId, qty] of Object.entries(productUpdates)) {
      promises.push(
        dbAdapter.products.update(
          { id: productId, stock: -qty },
          { increment: true }
        )
      );
    }

    await Promise.all(promises);
  }
}

export default new OrderProcessingService();
