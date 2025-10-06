import type { Product, ProductVariant } from "@my-store/shared";

// -------------------------
// Product utility functions
// -------------------------

export const priceToFloat = (cents: number) => {
  return cents / 100;
};

export const floatToPrice = (price: number) => {
  return Math.round(price * 100);
};

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
    `${priceToFloat(product.discount).toFixed(isPercentage ? 0 : 2)}` +
    (isPercentage ? "%" : "")
  );
};
