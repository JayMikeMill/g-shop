// shared/models/product.ts

// Product model
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
  name: string;
  values: ProductOptionValue[];
}

// Product option
export interface ProductOptionPreset extends ProductOption {
  id: number | string;
}

// Product option value
export interface ProductOptionValue {
  value: string;
  stock: number;
}

// check if two products have the same options selected
export const equalProductOptions = (p1: Product, p2: Product): boolean => {
  if (!p1.options && !p2.options) return true;
  if (!p1.options || !p2.options) return false;
  if (p1.options.length !== p2.options.length) return false;

  return p1.options.every((opt1) => {
    const opt2 = p2.options!.find((o) => o.name === opt1.name);
    if (!opt2) return false;
    if (opt2.values.length !== opt1.values.length) return false;
    return opt1.values.every((v, i) => v.value === opt2.values[i].value);
  });
};
