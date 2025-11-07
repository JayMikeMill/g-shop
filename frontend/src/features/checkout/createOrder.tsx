import { useApi } from "@app/hooks";
import type { CartTotals } from "@features/cart/cartSlice";
import {
  type ShippingInfo,
  TransactionStatusKeys,
  PaymentMethodKeys,
  OrderStatusKeys,
  type Order,
  type Cart,
} from "shared/types";

export async function createOrder(
  cart: Cart,
  cartTotals: CartTotals,
  shippingInfo: ShippingInfo
): Promise<{
  order: Order | null;
  error: "ADDRESS_VERIFICATION_FAILED" | null;
}> {
  try {
    shippingInfo = await verifyAddress(shippingInfo);
  } catch (error) {
    return { order: null, error: "ADDRESS_VERIFICATION_FAILED" };
  }

  if (process.env.NODE_ENV === "development")
    console.log("Address verified with EasyPost:", shippingInfo.address);

  if (process.env.NODE_ENV === "development")
    console.log("Creating order with totals:", cartTotals);

  // Return Order object
  const order: Order = {
    tax: cartTotals.tax,
    shippingCost: cartTotals.shipping,
    total: cartTotals.total,
    status: OrderStatusKeys.PENDING,
    items: cart.items
      ?.filter((item) => item.product !== undefined)
      .map((item) => ({
        product: item.product as NonNullable<typeof item.product>,
        variant: item.variant as NonNullable<typeof item.variant>,
        quantity: item.quantity,
        price: item.price,
      })),
    shippingInfo: { ...shippingInfo, cost: cartTotals.shipping },
    transaction: {
      billingAddress: shippingInfo.address,
      method: PaymentMethodKeys.STRIPE,
      amount: cartTotals.total,
      currency: "USD",
      status: TransactionStatusKeys.PENDING,
    },
    invoices: [{ createdAt: new Date(), invoiceNumber: `INV-${Date.now()}` }],
  };

  return { order, error: null };
}

async function verifyAddress(
  shippingInfo: ShippingInfo
): Promise<ShippingInfo> {
  if (!shippingInfo.address) {
    throw new Error("Shipping address is missing");
  }

  const { verifyAddress } = useApi().shipping;

  const result = await verifyAddress({
    ...shippingInfo.address,
    country: "US",
  });

  if (!result.valid) {
    throw new Error(
      "Address verification failed: " + (result.errors ?? []).join(", ")
    );
  }

  if (process.env.NODE_ENV === "development")
    console.log("Address verified:", result);

  return {
    ...shippingInfo,
    address: result.normalizedAddress ?? shippingInfo.address,
  };
}
