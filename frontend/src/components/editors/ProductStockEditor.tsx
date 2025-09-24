import React, { useEffect, useState } from "react";
import type {
  Product,
  ProductOption,
  ProductVariant,
} from "@shared/types/Product";
import Dropdown from "@components/controls/AnimatedDropdown";

interface ProductStockEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const ProductStockEditor: React.FC<ProductStockEditorProps> = ({
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
        const existing = product.variants?.find(
          (ex) => ex.options === v.options
        );
        return { ...v, stock: existing?.stock ?? 0 };
      })
    );
  }, [product.options]);

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

  const updateVariantStock = (index: number, stock: number) => {
    setLocalVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, stock } : v))
    );
  };

  return (
    <Dropdown
      label={
        <div className="flex items-center justify-between w-full pr-4">
          <span className="text-lg font-semibold text-text">
            {hasVariants ? "Total Stock" : "Product Stock"}
          </span>
          <input
            type="number"
            min={0}
            value={hasVariants ? totalStock : product.stock || 0}
            onChange={(e) => {
              if (!hasVariants) {
                setProduct((prev) => ({
                  ...prev,
                  stock: parseInt(e.target.value) || 0,
                }));
              }
            }}
            disabled={hasVariants}
            onFocus={(e) => e.target.select()}
            className={`input-box w-24 text-center ${
              hasVariants ? "bg-backgroundAlt cursor-not-allowed" : "bg-white"
            }`}
          />
        </div>
      }
      openInitially={hasVariants}
      disabled={!hasVariants}
    >
      {localVariants.map((variant, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center w-full border-b border-border pr-8 pb-2"
        >
          <span>{variant.options || "Variant"}</span>
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
    </Dropdown>
  );
};

/** Generate all possible variants */
export function generateVariants(
  options?: ProductOption[]
): ProductVariant[] | undefined {
  if (!options || options.length === 0) return;
  const valuesArrays = options.map((opt) =>
    opt.values
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
  );
  if (valuesArrays.some((arr) => arr.length === 0)) return;

  const cartesian = (arr: string[][]): string[][] =>
    arr.reduce((a, b) => a.flatMap((d) => b.map((e) => [...d, e])), [
      [],
    ] as string[][]);

  const combos = cartesian(valuesArrays);

  return combos.map((combo) => ({
    options: combo.map((val, i) => `${options[i].name}:${val}`).join("|"),
    stock: 0,
    priceOverride: undefined,
  }));
}

export default ProductStockEditor;
