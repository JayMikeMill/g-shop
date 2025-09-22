import { Product, SelectedProductOption } from "./product";
import { ShippingInfo } from "./shipping-info";
import { PaymentInfo } from "./payment-info";

export type Order = {
  id: string;
  userId?: string;
  status: OrderStatus;
  createdAt: number; // Unix TimeStamp
  updatedAt: number; // Unix TimeStamp
  items: OrderItem[];
  total: number; // cents
  paymentInfo: PaymentInfo;
  shippingInfo: ShippingInfo;
  notes?: string;
};

export interface OrderItem extends Product {
  selectedOptions?: SelectedProductOption[]; // Selected options for this item
  quantity: number; // How many of this item are in the cart
}

export const OrderStatuses = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof OrderStatuses)[keyof typeof OrderStatuses];
