// src/shared/Product.ts

export interface Product {
	id: string; // Firestore document IDs are strings
	name: string;
	price: number;
	sizes: Size[];
	colors: Color[];
	images: string[];
	description: string;
	discount?: string; // Can be a percentage like "15%" or a fixed amount like "10"
	tags?: string[];
}

export interface ProductOptions {
	size?: Size;
	color?: Color;
}

export const equalsProductOptions = (a: ProductOptions, b: ProductOptions) =>
	a.size === b.size && a.color === b.color;

export const Size = {
	S: "S",
	M: "M",
	L: "L",
	XL: "XL",
} as const;
export type Size = typeof Size[keyof typeof Size];
export const allSizes: Size[] = Object.values(Size);

export const Color = {
	Red: "Red",
	Blue: "Blue",
	Green: "Green",
	Black: "Black",
} as const;

export type Color = typeof Color[keyof typeof Color];
export const allColors: Color[] = Object.values(Color);
