import React, { useEffect, useState } from "react";

import {
  parseVariantOptions,
  type Product,
  type ProductOption,
  type ProductVariant,
} from "@shared/types/Product";

interface ProductStockEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductStockEditor: React.FC<ProductStockEditorProps> = ({
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
          stock: existing?.stock ?? 0,
          price: existing?.price ?? 0,
        };
      })
    );
  }, [product.options]);

  function arraysEqual(a: string[], b: string[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, index) => val === b[index]);
  }

  // Compute total stock from localVariants
  const totalStock = localVariants.reduce((sum, v) => sum + (v.stock || 0), 0);

  // Push localVariants back into product whenever they change
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      variants: localVariants,
      stock: hasVariants ? totalStock : prev.stock,
    }));
  }, [localVariants, hasVariants, totalStock, setProduct]);

  // Update stock for a specific variant
  const updateVariantStock = (index: number, stock: number) => {
    setLocalVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, stock } : v))
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
            value={variant.stock}
            onChange={(e) =>
              updateVariantStock(idx, parseInt(e.target.value) || 0)
            }
            onFocus={(e) => e.target.select()}
            className="input-box w-24 text-center"
          />
        </div>
      ))}
    </div>
  );
};

interface ProductStockHeaderProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductStockHeader: React.FC<ProductStockHeaderProps> = ({
  product,
  setProduct,
}) => {
  const [localStock, setLocalStock] = useState(product.stock || 0);

  // Push localVariants back into product whenever they change
  useEffect(() => {
    setLocalStock(product.stock || 0);
  }, [product.id, product.variants]);

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      stock: localStock,
    }));
  }, [localStock]);

  const hasVariants = !!product.options?.length;
  const totalStock = product.variants?.reduce(
    (sum, v) => sum + (v.stock || 0),
    0
  );

  return (
    <div className="flex items-center justify-between w-full pr-4">
      <span className="text-lg font-semibold text-text">
        {hasVariants ? "Stock (Total)" : "Stock"}
      </span>
      <input
        type="number"
        min={0}
        value={hasVariants ? totalStock : product.stock || 0}
        onChange={(e) => {
          setLocalStock(parseInt(e.target.value) || 0);
        }}
        disabled={hasVariants}
        onFocus={(e) => e.target.select()}
        className={`input-box w-24 text-center`}
      />
    </div>
  );
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

export default ProductStockEditor;
