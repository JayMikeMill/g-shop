import React, { useEffect, useState } from "react";

import {
  parseVariantOptions,
  type Product,
  type ProductOption,
  type ProductVariant,
} from "@shared/types/Product";

interface ProductVariantEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductVariantEditor: React.FC<ProductVariantEditorProps> = ({
  product,
  setProduct,
}) => {
  const hasVariants = !!product.options?.length;
  const [localVariants, setLocalVariants] = useState<ProductVariant[]>([]);

  // Generate variants when options change
  useEffect(() => {
    if (!product.options?.length) {
      setLocalVariants([]);
      return;
    }

    const newVariants = generateVariants(product.options) || [];

    // Merge with existing product.variants to keep stock values
    setLocalVariants(
      newVariants.map((v) => {
        const existing = product.variants?.find((ex) =>
          arraysEqual(ex.options, v.options)
        );
        return {
          ...v,
          stock: existing?.stock,
          price: existing?.price,
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
      stock: totalStock,
    }));
  }, [localVariants, hasVariants, setProduct]);

  // Update stock for a specific variant
  const updateVariantStock = (index: number, stock: string) => {
    setLocalVariants((prev) =>
      prev.map((v, i) =>
        i === index
          ? { ...v, stock: stock == "" ? undefined : parseInt(stock) }
          : v
      )
    );
  };

  if (!hasVariants) {
    return null; // No variants, no detailed stock editor
  }

  return (
    <div className="flex flex-col gap-4">
      {localVariants.map((variant, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center w-full border-b border-border pr-8 py-2"
        >
          <div className="flex flex-wrap gap-1 mt-1">
            {parseVariantOptions(variant).map((opt, optIdx) => (
              <span
                key={`variant-${idx}-opt-${optIdx}`}
                className="options-tag"
              >
                {opt.value}
              </span>
            ))}
          </div>

          <input
            type="number"
            min={0}
            step={1}
            value={variant.stock}
            placeholder="-"
            onChange={(e) => updateVariantStock(idx, e.target.value)}
            onFocus={(e) => e.target.select()}
            className="input-box w-24 text-center"
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
      stock: localStock,
    }));
  }, [localStock]);

  // Update stock for a specific variant
  const updateStock = (stock: string) => {
    setLocalStock(stock == "" ? undefined : parseInt(stock));
  };

  return (
    <div className="flex items-center justify-between w-full pr-4">
      <span className="text-lg font-semibold text-text">
        {hasVariants ? "Stock (Total)" : "Stock"}
      </span>
      <input
        type="number"
        min={0}
        step={1}
        value={localStock ?? ""}
        placeholder="-"
        onChange={(e) => {
          updateStock(e.target.value);
        }}
        disabled={hasVariants}
        onFocus={(e) => e.target.select()}
        className={`input-box w-24 text-center`}
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
export function generateVariants(
  options?: ProductOption[]
): ProductVariant[] | undefined {
  if (!options || options.length === 0) return;

  const valuesArrays = options.map((opt) => {
    if (!Array.isArray(opt.values)) return [];
    return opt.values.map((v) => v.trim()).filter(Boolean);
  });

  if (valuesArrays.some((arr) => arr.length === 0)) return;

  const cartesian = (arr: string[][]): string[][] =>
    arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [
      [],
    ] as string[][]);

  const combos = cartesian(valuesArrays);

  return combos.map((combo) => ({
    options: combo.map((val, i) => `${options[i].name}:${val}`),
    stock: 0,
    price: undefined,
  }));
}

export default ProductVariantEditor;
