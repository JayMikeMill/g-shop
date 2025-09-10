
export interface Product {
  id: number,
  name: string,
  price: number,
  sizes: Size[],
  colors: Color[],
  image: string,
}

export interface ProductOptions {
  size: Size,
  color: Color,
}

// Helper function to compare
export const equalsProductOptions = (a: ProductOptions, b: ProductOptions) =>
	a.size === b.size && a.color === b.color

export const Size = {
	S: "S",
	M: "M",
	L: "L",
	XL: "XL",
} as const

export type Size = typeof Size[keyof typeof Size]
export const allSizes: Size[] = Object.values(Size)


export const Color = {
	S: "S",
	M: "M",
	L: "L",
	XL: "XL",
} as const

export type Color = typeof Color[keyof typeof Color]
export const allColors: Color[] = Object.values(Color)