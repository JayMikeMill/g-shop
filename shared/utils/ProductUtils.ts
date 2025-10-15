import type { Product, ProductVariant } from "../types";
import { toMajorPriceString, toMajorUnit } from "./PriceUtils";

// Parse serialized variant options like "Color:Red|Size:M" into objects
export const parseVariantOptions = (variant?: ProductVariant) => {
  if (!variant?.options) return [];
  return variant.options.map((opt) => {
    const [name, value] = opt.split(":");
    return { name, value };
  });
};

// Parse serialized variant options like "Color:Red|Size:M" into objects
export const getProductDiscountLabel = (product: Product) => {
  if (!product.discount) return "";
  return "$" + toMajorUnit(getProductDiscount(product)).toFixed(2);
};

export const getProductFinalPrice = (product: Product) => {
  if (!product.discount || !product.price) return 0;

  const discount = product.discount || 0;
  if (discount <= 0) return product.price;
  const isPercentage = product.discountType === "PERCENTAGE";

  return isPercentage
    ? product.price - product.price * (discount / 10000)
    : product.price - discount;
};

export const getProductDiscount = (product: Product) => {
  return product.price - getProductFinalPrice(product);
};
export const getProductDiscountPercent = (product: Product) => {
  return (getProductDiscount(product) / product.price) * 100;
};

export const getFinalPriceString = (product: Product) => {
  return toMajorPriceString(getProductFinalPrice(product));
};
