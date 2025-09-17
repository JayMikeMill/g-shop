import { StoreItem } from "./store-item";
import { ShippingInfo } from "./shipping-info";
import { PaymentInfo } from "./payment-info";

export type Order = {
  id: string;
  userId?: string;
  status: OrderStatus;
  createdAt: number; // Unix TimeStamp
  updatedAt: number; // Unix TimeStamp
  items: StoreItem[];
  total: number; // cents
  paymentInfo: PaymentInfo;
  shippingInfo: ShippingInfo;
  notes?: string;
};

export const OrderStatuses = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof OrderStatuses)[keyof typeof OrderStatuses];
