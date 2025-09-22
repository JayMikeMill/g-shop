import { Product, ProductVariant, SelectedProductOption } from "./product";
import { ShippingInfo } from "./shipping";
import { Transaction } from "./transaction";
import { User } from "./user";

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
