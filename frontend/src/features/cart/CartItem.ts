// frontend/src/types/CartItem.ts
import type { Product, ProductVariant } from "@my-store/shared/types";

// Represents an item in the shopping cart
export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  price: number;
}
