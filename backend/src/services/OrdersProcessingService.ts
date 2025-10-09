import { Order, Product, ProductVariant, QueryObject } from "@shared/types";
import { db, payment } from "@adapters/services";
import { DBAdapter } from "@adapters/types/DBAdapter";
import { toMajorPriceString } from "@shared/utils/PriceUtils";

export class OrderProcessingService {
  static async placeOrder(paymentMethod: any, order: Order) {
    // implement order placement logic
    try {
      // 1. Check stock for all items in the order
      if (!(await stockAvailable(order, db))) {
        throw new Error("One or more items are out of stock");
      }

      // 2a Create metadata for payment
      const metadata: Record<string, string> = {};

      order.items?.forEach((item, index) => {
        const prefix = `item_${index}_`;
        metadata[`${prefix}productId`] = item.product.id ?? "unknown";
        metadata[`${prefix}variantId`] = item.variant?.id ?? "unknown";
        metadata[`${prefix}name`] = item.product.name ?? "unknown";
        metadata[`${prefix}quantity`] = String(item.quantity || 1);
        metadata[`${prefix}price`] = String(toMajorPriceString(item.price));
      });

      // 2b. Authorize payment
      const paymentResult = await payment.authorizePayment({
        token: paymentMethod.id,
        amount: order.total / 100, // amount is in cents
        currency: order.transaction?.currency || "USD",
        metadata,
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

        console.log("Stock verified, creating order...", order);
        // 3b. Create order and update stock
        newOrder = await tx.orders.create(order);

        // 3c. Update stock levels
        await updateStock(order, tx);
      });

      // 5. Capture payment
      const captureResult = await payment.capturePayment(paymentResult.id);
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
  if (!order.items || order.items.length === 0)
    throw new Error("Order has no items");

  const productIds = order.items.map((item) => item.product.id);
  if (productIds.some((id) => !id)) throw new Error("Invalid product ID");

  const productQuery: QueryObject<Product> = {
    conditions: [{ field: "id", operator: "in", value: productIds }],
    includeFields: ["id", "name", "stock"],
  };
  const productResult = await dbAdapter.products.get(productQuery);
  if (!productResult?.data?.length)
    throw new Error("No products found for this order");

  const variantIds = order.items
    .map((item) => item.variant?.id)
    .filter(Boolean) as string[];

  const variantMap: Record<string, ProductVariant> = {};
  if (variantIds.length > 0) {
    const variantQuery: QueryObject<ProductVariant> = {
      conditions: [{ field: "id", operator: "in", value: variantIds }],
      includeFields: ["id", "productId", "stock"],
    };
    const variantResult = await dbAdapter.productVariants.get(variantQuery);
    if (variantResult?.data?.length) {
      for (const v of variantResult.data) {
        if (v.id) variantMap[v.id] = v;
      }
    }
  }

  for (const item of order.items) {
    if (item.variant?.id) {
      const variant = variantMap[item.variant.id];
      if (!variant) throw new Error(`Variant not found: ${item.variant.id}`);

      // Only check stock if defined
      if (variant.stock != null && variant.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for variant ${variant.id} of product ${item.product.id}`
        );
      }
    } else {
      const product = productResult.data.find((p) => p.id === item.product.id);
      if (!product) throw new Error(`Product not found: ${item.product.id}`);

      // Only check stock if defined
      if (product.stock != null && product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.id}`);
      }
    }
  }

  return true;
}

// ------------------ Update Stock ------------------
async function updateStock(order: Order, dbAdapter: DBAdapter) {
  if (!order.items || order.items.length === 0)
    throw new Error("Order has no items");

  const updatePromises: Promise<any>[] = [];

  console.log("Updating stock for order items:", order.items);

  for (const item of order.items) {
    const quantity = item.quantity || 1;

    if (item.variant?.id) {
      const variant = await dbAdapter.productVariants.get({
        conditions: [{ field: "id", operator: "=", value: item.variant.id }],
      });
      if (variant?.data?.[0]?.stock != null) {
        updatePromises.push(
          dbAdapter.productVariants.update(
            { id: item.variant.id, stock: -quantity },
            { increment: true }
          )
        );

        updatePromises.push(
          dbAdapter.products.update(
            { id: item.product.id!, stock: -quantity },
            { increment: true }
          )
        );
      }
    } else if (item.product?.id) {
      const product = await dbAdapter.products.get({
        conditions: [{ field: "id", operator: "=", value: item.product.id }],
      });
      if (product?.data?.[0]?.stock != null) {
        updatePromises.push(
          dbAdapter.products.update(
            { id: item.product.id, stock: -quantity },
            { increment: true }
          )
        );
      }
    }
  }

  await Promise.all(updatePromises);
}
