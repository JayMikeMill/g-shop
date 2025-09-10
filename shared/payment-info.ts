import { type ShippingAddress } from "./shipping-address";

export type PaymentInfo = {
    nonce: string;
    amount: number;
    orderItems: { name: string; price: number; quantity: number }[];
    shipping: ShippingAddress;
}
