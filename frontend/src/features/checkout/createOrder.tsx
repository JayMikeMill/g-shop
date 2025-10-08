import {
  type ShippingInfo,
  TransactionStatus as TransactionStatuses,
  PaymentMethod as PaymentMethods,
  OrderStatus as OrderStatuses,
  type Order,
  type Cart,
} from "@my-store/shared";

import { floatToPrice } from "@utils/productUtils";

export function createOrder(cart: Cart, shippingInfo: ShippingInfo): Order {
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
        price: floatToPrice(item.price),
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
