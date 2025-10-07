import { Order, Product, ProductVariant, QueryObject } from "@my-store/shared";
import { db, payment } from "@config/adapters";

//-checkout flow - check stock, authorize payment,
// check stock/place order/update stock, capture payment. all in backend.

export class OrderProcessingService {
  static async placeOrder(payment: any, order: Order) {
    // implement order placement logic
    console.log("Placing order:", order, "with payment:", payment);

    const hasStock = await checkStock(order);

    return { success: true, orderId: "order_12345" };
  }

  static async refundOrder(id: string) {
    // implement refund logic
  }
}

async function checkStock(order: Order): Promise<boolean> {
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
    const productResult = await db.products.get(productQuery);
    if (!productResult?.data?.length)
      throw new Error("No products found for this order");

    // Gather all variant IDs from order items
    const variantIds = order.items
      .map((item) => item.variant?.id)
      .filter(Boolean) as string[];

    let variantMap: Record<string, ProductVariant> = {};
    if (variantIds.length > 0) {
      // Fetch variants separately
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
      const variantResult = await db.productVariants.get(variantQuery);
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

    console.log("Stock check passed for order:", order.id);

    return true;
  } catch (error) {
    console.error("Error checking stock:", error);
    return false;
  }
}
