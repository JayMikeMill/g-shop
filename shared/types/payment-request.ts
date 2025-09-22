import type { Address } from "./shipping";

export type PaymentRequest = {
  nonce: string;
  amount: number;

  items: {
    name: string;
    price: number;
    quantity: number;
  }[];

  address: Address;
};
