import type { Product, ProductOption, ProductVariant } from "shared/types";

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

export function generateVariants(
  options?: ProductOption[],
  oldVariants?: ProductVariant[]
): ProductVariant[] {
  if (!options?.length) return [];

  // Filter out invalid options (empty name or empty values)
  const validOptions = options.filter(
    (opt) =>
      opt.name?.trim() && Array.isArray(opt.values) && opt.values.length > 0
  );

  if (!validOptions.length) return [];

  // Map to arrays of trimmed values
  const valuesArrays = validOptions.map((opt) =>
    opt.values.map((v) => v.trim()).filter(Boolean)
  );

  // Cartesian product
  const cartesian = (arr: string[][]): string[][] =>
    arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [
      [],
    ] as string[][]);

  const combos = cartesian(valuesArrays);

  // Map old variants for quick lookup
  const oldMap = new Map<
    string,
    { options: string[]; price: number | null; stock: number | null }
  >();
  if (oldVariants) {
    for (const v of oldVariants) {
      const key = v.options.join("|");
      oldMap.set(key, {
        options: v.options,
        price: v.price ?? null,
        stock: v.stock ?? null,
      });
    }
  }

  // Generate new variants
  return combos.map((combo) => {
    const key = combo
      .map((val, i) => `${validOptions[i].name}:${val}`)
      .join("|");
    const old = oldMap.get(key);

    return {
      options: combo.map((val, i) => `${validOptions[i].name}:${val}`),
      price: old?.price ?? null,
      stock: old?.stock ?? null,
    };
  });
}
