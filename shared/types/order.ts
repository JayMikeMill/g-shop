import type { Product, ProductVariant, SelectedProductOption } from "./Product";
import type { ShippingInfo } from "./Shipping";
import type { Transaction } from "./Transaction";
import type { User } from "./User";

export interface Order {
  id: string;
  userId?: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number; // cents
  paymentInfo: Transaction;
  shippingInfo: ShippingInfo;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;

  // Related user
  user?: User;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;

  // Related product
  product?: Product;
  variant?: ProductVariant;
}

export const OrderStatuses = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof OrderStatuses)[keyof typeof OrderStatuses];

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: Date;
}
