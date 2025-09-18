export interface Product {
  id: number | string;
  name: string;
  price: number;
  discount?: string;
  images: ProductImageSet[];
  description: string;
  tags?: string[];
  options?: ProductOption[];
  stock: number;
}

// Product images
export interface ProductImageSet {
  main: string;
  preview: string;
  thumbnail: string;
}

// Product option
export interface ProductOption {
  id: number;
  productId: number;
  name: string;
  type: "dropdown" | "radio" | "colorpicker";
  values: ProductOptionValue[];
}

// Product option value
export interface ProductOptionValue {
  id: number;
  optionId: string;
  value: string;
  stock: number;
}

// Preset option (for admin selection)
export interface PresetOption {
  id: number;
  name: string; // e.g., "Color"
  value: string; // e.g., "Red"
}

// check if two products have the same options selected
export const equalProductOptions = (
  product1: Product,
  product2: Product
): boolean => {
  if (!product1.options && !product2.options) return true;
  if (!product1.options || !product2.options) return false;
  if (product1.options.length !== product2.options.length) return false;

  // Check if all options are equal
  return product1.options.every((opt1) => {
    const opt2 = product2.options!.find((o) => o.id === opt1.id);
    return opt2 && opt2.values === opt1.values;
  });
};
