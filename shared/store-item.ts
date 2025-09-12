import type { Product, ProductOptions } from "./product";

export interface StoreItem extends Product {
	// Product already has: id, name, price, etc.
	options: ProductOptions;
	quantity: number; // How many of this item are in the cart
}
