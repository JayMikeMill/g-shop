import { Order, Product, ProductVariant, QueryObject } from "@my-store/shared";
import { db, payment as paymentAdapter } from "@config/adapters";
import { DBAdapter } from "@adapters/db/DBAdapter";

export class OrderProcessingService {
  static async placeOrder(payment: any, order: Order) {
    // implement order placement logic
    console.log("Placing order:", order, "with payment:", payment);
    try {
      // 1. Check stock for all items in the order
      if (!(await stockAvailable(order, db))) {
        throw new Error("One or more items are out of stock");
      }

      // 2. Authorize payment
      const paymentResult = await paymentAdapter.authorizePayment({
        token: payment.id,
        amount: order.total,
        currency: order.transaction?.currency || "USD",
        metadata: Object.fromEntries(
          Object.entries(order).map(([key, value]) => [
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value),
          ])
        ) as Record<string, string>,
      });

      if (paymentResult.status !== "AUTHORIZED") {
        throw new Error(
          "Payment authorization failed: " + paymentResult.status
        );
      }

      // 3. Create order and update stock within a transaction
      let newOrder: Order | undefined;
      await db.transaction(async (tx) => {
        // 3a. Re-check stock to avoid race conditions
        if (!(await stockAvailable(order, tx))) {
          throw new Error("Out of stock");
        }

        // 3b. Create order and update stock
        newOrder = await tx.orders.create(order);

        // 3c. Update stock levels
        await updateStock(order, tx);
      });

      // 5. Capture payment
      const captureResult = await paymentAdapter.capturePayment(
        paymentResult.id
      );
      if (captureResult.status !== "CAPTURED") {
        throw new Error("Payment capture failed");
      }

      return { success: true, data: { newOrder, payment: captureResult } };
    } catch (error) {
      console.error("Error placing order:", error);
      return {
        success: false,
        error:
          typeof error === "object" && error !== null && "message" in error
            ? (error as any).message
            : String(error),
      };
    }
  }

  static async refundOrder(id: string) {
    // implement refund logic
  }
}

async function stockAvailable(
  order: Order,
  dbAdapter: DBAdapter
): Promise<boolean> {
  try {
    if (!order.items || order.items.length === 0)
      throw new Error("Order has no items");

    const productIds = order.items.map((item) => item.product.id);
    if (productIds.some((id) => !id)) throw new Error("Invalid product ID");

    // Fetch all products first
    const productQuery: QueryObject<Product> = {
      conditions: [
        {
          field: "id",
          operator: "in",
          value: productIds,
        },
      ],
      includeFields: ["id", "name", "stock"],
    };
    const productResult = await dbAdapter.products.get(productQuery);
    if (!productResult?.data?.length)
      throw new Error("No products found for this order");

    // Gather all variant IDs from order items
    const variantIds = order.items
      .map((item) => item.variant?.id)
      .filter(Boolean) as string[];

    let variantMap: Record<string, ProductVariant> = {};
    if (variantIds.length > 0) {
      const variantQuery: QueryObject<ProductVariant> = {
        conditions: [
          {
            field: "id",
            operator: "in",
            value: variantIds,
          },
        ],
        includeFields: ["id", "productId", "stock"],
      };
      const variantResult = await dbAdapter.productVariants.get(variantQuery);
      if (variantResult?.data?.length) {
        for (const v of variantResult.data) {
          if (v.id) variantMap[v.id] = v;
        }
      }
    }

    // Check stock
    for (const item of order.items) {
      if (item.variant?.id) {
        const variant = variantMap[item.variant.id];
        if (!variant) throw new Error(`Variant not found: ${item.variant.id}`);

        if (
          variant.stock !== undefined &&
          variant.stock !== null &&
          variant.stock < item.quantity
        ) {
          throw new Error(
            `Insufficient stock for variant ${variant.id} of product ${item.product.id}`
          );
        }
      } else {
        const product = productResult.data.find(
          (p) => p.id === item.product.id
        );
        if (!product) throw new Error(`Product not found: ${item.product.id}`);

        if (
          product.stock !== undefined &&
          product.stock !== null &&
          product.stock < item.quantity
        ) {
          throw new Error(`Insufficient stock for product ${product.id}`);
        }
      }
    }

    return true;
  } catch (error) {
    console.error("Error checking stock:", error);
    return false;
  }
}

// ------------------ Update Stock ------------------
async function updateStock(order: Order, dbAdapter: DBAdapter) {
  if (!order.items || order.items.length === 0)
    throw new Error("Order has no items");

  const updatePromises: Promise<any>[] = [];

  for (const item of order.items) {
    const quantity = item.quantity || 1;

    if (item.variant?.id) {
      // Variant stock decrement
      updatePromises.push(
        dbAdapter.productVariants.update(
          { id: item.variant.id, stock: -quantity },
          { increment: true }
        )
      );
    } else if (item.product?.id) {
      // Product stock decrement
      updatePromises.push(
        dbAdapter.products.update(
          { id: item.product.id, stock: -quantity },
          { increment: true }
        )
      );
    }
  }

  await Promise.all(updatePromises);
}
