import { useApi } from "@api";
import {
  type ShippingInfo,
  TransactionStatus as TransactionStatuses,
  PaymentMethod as PaymentMethods,
  OrderStatus as OrderStatuses,
  type Order,
  type Cart,
} from "@shared/types";

import { toMinorUnit } from "@shared/utils";

export async function createOrder(
  cart: Cart,
  shippingInfo: ShippingInfo
): Promise<Order | null> {
  try {
    shippingInfo = await verifyAddress(shippingInfo);
  } catch (error) {
    console.error("Error verifying address:", error);
    return null;
  }

  // Create order object
  return {
    total: cart.total + (shippingInfo.cost ?? 0),
    status: OrderStatuses.PENDING,
    items: cart.items
      ?.filter((item) => item.product !== undefined)
      .map((item) => ({
        product: item.product as NonNullable<typeof item.product>,
        variant: item.variant as NonNullable<typeof item.variant>,
        quantity: item.quantity,
        price: toMinorUnit(item.price),
      })),
    statusHistory: [
      {
        status: OrderStatuses.PENDING,
        timestamp: new Date(),
      },
    ],
    shippingInfo,
    transaction: {
      billingAddress: shippingInfo.address,
      method: PaymentMethods.STRIPE,
      amount: cart.total,
      currency: "USD",
      status: TransactionStatuses.PENDING,
    },
    invoices: [{ createdAt: new Date(), invoiceNumber: `INV-${Date.now()}` }],
  };
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

  return {
    ...shippingInfo,
    address: result.normalizedAddress ?? shippingInfo.address,
  };
}
