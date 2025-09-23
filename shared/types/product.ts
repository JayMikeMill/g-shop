// shared/models/Product.ts

import type { Category, Collection } from "./Catalog";

export interface Product {
  id?: string;
  name: string;
  price: number;
  discount?: string;
  description: string;
  stock: number;
  reviewCount?: number;
  averageRating?: number;
  images?: ProductImageSet[];
  tags?: ProductTag[];
  options?: ProductOption[];
  variants?: ProductVariant[];
  categories?: Category[];
  collections?: Collection[];
  dimensions?: ProductDimensions;
  reviews?: ProductReview[];
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

// Product option value
export interface ProductOptionValue {
  value: string;
}

// Product option preset
export interface ProductOptionPreset extends ProductOption {
  id?: string;
}

// Tag entity
export interface ProductTag {
  name: string;
  color?: string;
}

// Tag preset
export interface ProductTagPreset extends ProductTag {
  id?: string;
}

// Selected product option (for cart/store use)
export interface SelectedProductOption {
  name: string;
  value: string;
}

// Variant entity
export interface ProductVariant {
  id?: string;
  options: string[];
  priceOverride?: number;
  stock: number;
}

// Selected product option (for cart/store use)
export interface ProductDimensions {
  weight_grams?: number;
  length_cm?: number;
  width_cm?: number;
  height_cm?: number;
}

// Review entity
export interface ProductReview {
  id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}
