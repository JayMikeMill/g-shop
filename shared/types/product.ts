// shared/models/product.ts

import { Category, Collection } from "./catalog";

export interface Product {
  id?: string;
  name: string;
  price: number;
  discount?: string;
  description: string;
  stock: number;
  review_count?: number;
  average_rating?: number;
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
  id?: string;
  main: string;
  preview: string;
  thumbnail: string;
}

// Product option
export interface ProductOption {
  id?: string;
  name: string;
  values: ProductOptionValue[];
}

// Product option value
export interface ProductOptionValue {
  id?: string;
  value: string;
}

// Product option preset
export interface ProductOptionPreset extends ProductOption {}

// Tag entity
export interface ProductTag {
  id?: string;
  name: string;
  color?: string;
}

// Tag preset
export interface ProductTagPreset extends ProductTag {}

// Selected product option (for cart/store use)
export interface SelectedProductOption {
  name: string;
  value: string;
}

// Variant entity
export interface ProductVariant {
  id?: string;
  productId: string;
  sku?: string;
  priceOverride?: number;
  stock: number;
}

// Selected product option (for cart/store use)
export interface ProductDimensions {
  id?: string;
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
