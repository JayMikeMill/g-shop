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
export const getDiscountString = (product: Product) => {
  if (!product.discount) return "";
  const isPercentage = product.discountType === "PERCENTAGE";
  return (
    (isPercentage ? "" : "$") +
    toMajorUnit(product.discount).toFixed(2) +
    (isPercentage ? "%" : "")
  );
};

export const getFinalPrice = (product: Product) => {
  if (!product.discount) return 0;
  const discount = product.discount || 0;
  if (discount <= 0) return product.price;
  const isPercentage = product.discountType === "PERCENTAGE";

  return isPercentage
    ? product.price - product.price * (discount / 10000)
    : product.price - discount;
};

export const getFinalPriceString = (product: Product) => {
  return toMajorPriceString(getFinalPrice(product));
};
