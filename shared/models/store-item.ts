import type { Product } from "./product";

export interface StoreItem extends Product {
  // Product already has: id, name, price, etc.
  selectedOptions: StoreItemOption[]; // Selected options for this item
  quantity: number; // How many of this item are in the cart
}

export interface StoreItemOption {
  optionId: string; // product_options.id
  optionValueId: string; // product_option_values.id
  value: string; // for display, e.g., "Red", "M"
}
