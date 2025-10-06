import type { OrderShippingInfo } from "../";

export type PaymentRequest = {
  token: string;
  amount: number;

  items: {
    name: string;
    price: number;
    quantity: number;
  }[];

  shippingInfo: OrderShippingInfo;
};
