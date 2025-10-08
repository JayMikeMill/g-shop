import { Product, ProductVariant } from "../types";
import { toMajorUnit } from "./PriceUtils";

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
    `${toMajorUnit(product.discount).toFixed(isPercentage ? 0 : 2)}` +
    (isPercentage ? "%" : "")
  );
};
