import React, { useEffect, useState } from "react";

import type { Product, ProductOption, ProductVariant } from "@shared/types";

import { parseVariantOptions } from "@shared/types/Product";

import { priceToFloat, floatToPrice } from "@utils/priceUtils";
import { Input, NumberInput } from "@components/ui";

interface ProductVariantEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductVariantEditor: React.FC<ProductVariantEditorProps> = ({
  product,
  setProduct,
}) => {
  const hasVariants = !!product.options?.length;
  const [localVariants, setLocalVariants] = useState<ProductVariant[]>(
    product.variants
  );

  // Generate variants when options change
  useEffect(() => {
    if (!product.options?.length) {
      setLocalVariants([]);
      return;
    }

    const newVariants = generateVariants(product.options);

    // Merge with existing product.variants to keep stock values
    setLocalVariants(
      newVariants.map((v) => {
        const existing = product.variants?.find((ex) =>
          arraysEqual(ex.options, v.options)
        );
        return {
          ...v,
          stock: existing?.stock || null,
          price: existing?.price || null,
        };
      })
    );
  }, [product.options]);

  function arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  // Push localVariants back into product whenever they change
  useEffect(() => {
    const totalStock = getProductStock({ ...product, variants: localVariants });

    setProduct((prev) => ({
      ...prev,
      variants: localVariants,
      stock: totalStock ?? null,
    }));
  }, [localVariants, hasVariants, setProduct]);

  // Update stock for a specific variant
  const updateVariantStock = (index: number, stock: string) => {
    setLocalVariants((prev) =>
      prev.map((v, i) =>
        i === index ? { ...v, stock: stock == "" ? null : parseInt(stock) } : v
      )
    );
  };

  // Update stock for a specific variant
  const updateVariantPrice = (index: number, price: string) => {
    setLocalVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? {
              ...v,
              price: price == "" ? null : floatToPrice(parseFloat(price)),
            }
          : v
      )
    );
  };

  if (!hasVariants) {
    return null; // No variants, no detailed stock editor
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-2 items-center w-full border-b border-border">
        <span className="text-lg font-semibold text-text w-[40%] text-center">
          Variant
        </span>
        <span className="text-lg font-semibold text-text w-[30%] text-center">
          Stock
        </span>
        <span className="text-lg font-semibold text-text w-[30%] text-center">
          Price
        </span>
      </div>
      {localVariants.map((variant, idx) => (
        <div
          key={idx}
          className="flex justify-between gap-2 items-center w-full border-b border-border py-2"
        >
          <div className="flex flex-wrap gap-1 mt-1 justify-center w-[40%]">
            {parseVariantOptions(variant).map((opt, optIdx) => (
              <span
                key={`variant-${idx}-opt-${optIdx}`}
                className="options-tag"
              >
                {opt.value}
              </span>
            ))}
          </div>

          {/* Stock count */}
          <Input
            type="number"
            min={0}
            step={1}
            value={variant.stock ?? ""}
            placeholder="-"
            onChange={(e) => updateVariantStock(idx, e.target.value)}
            onFocus={(e) => e.target.select()}
            className="w-[30%] text-center"
          />

          {/* Price in dollars */}

          <NumberInput
            symbol="$"
            value={variant.price ? priceToFloat(variant.price) : ""}
            placeholder="-"
            onChange={(e) => updateVariantPrice(idx, e.target.value)}
            className="w-full text-center" // add padding-left for the $ sign
          />
        </div>
      ))}
    </div>
  );
};

interface ProductVariantHeaderProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductVariantHeader: React.FC<ProductVariantHeaderProps> = ({
  product,
  setProduct,
}) => {
  const hasVariants = !!product.options?.length;
  const totalStock = getProductStock(product);

  const [localStock, setLocalStock] = useState(totalStock);

  // Push localVariants back into product whenever they change
  useEffect(() => {
    setLocalStock(product.stock);
  }, [product.id, product.variants]);

  // Push localStock back into product whenever it changes
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      stock: localStock ?? null,
    }));
  }, [localStock]);

  // Update stock for a specific variant
  const updateStock = (stock: string) => {
    setLocalStock(stock == "" ? undefined : parseInt(stock));
  };

  return (
    <div className="flex items-center gap-8 w-full pr-4">
      <span className="text-lg font-semibold text-text">
        {hasVariants ? "Total Stock" : "Product Stock"}
      </span>
      <Input
        min={0}
        step={1}
        value={localStock ?? ""}
        placeholder="-"
        onChange={(e) => {
          updateStock(e.target.value);
        }}
        disabled={hasVariants}
        onFocus={(e) => e.target.select()}
        className={`w-24 text-center h-6 bg-background disabled:opacity-100`}
      />
    </div>
  );
};

const getProductStock = (product: Product) => {
  if (!product.variants || product.variants.length === 0) return product.stock;
  if (product.variants.every((v) => v.stock === undefined)) return undefined;
  return product.variants.reduce((sum, v) => sum + (v.stock || 0), 0);
};

/** Generate all possible variants */
function generateVariants(options?: ProductOption[]): ProductVariant[] {
  if (!options || options.length === 0) return [];

  const valuesArrays = options.map((opt) => {
    if (!Array.isArray(opt.values)) return [];
    return opt.values.map((v) => v.trim()).filter(Boolean);
  });

  if (valuesArrays.some((arr) => arr.length === 0)) return [];

  const cartesian = (arr: string[][]): string[][] =>
    arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [
      [],
    ] as string[][]);

  const combos = cartesian(valuesArrays);

  return combos.map((combo) => ({
    options: combo.map((val, i) => `${options[i].name}:${val}`),
    stock: null,
    price: null,
  }));
}

export default ProductVariantEditor;
