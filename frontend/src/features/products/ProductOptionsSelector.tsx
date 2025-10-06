import React, { useState, useEffect } from "react";
import type { Product, ProductVariant } from "@my-store/shared";
import { Button } from "@components/ui";

interface SelectedProductOption {
  name: string;
  value: string;
}

interface ProductOptionSelectorProps {
  product: Product;
  onVariantChange: (variant: ProductVariant | null) => void;
}

const parseVariantOptions = (variant: ProductVariant) => {
  const obj: Record<string, string> = {};
  if (Array.isArray(variant.options)) {
    variant.options.forEach((opt) => {
      const [name, value] = typeof opt === "string" ? opt.split(":") : ["", ""];
      if (name && value) obj[name] = value;
    });
  }
  return obj;
};

// Check if option value is enabled given the selections above it
const isOptionEnabled = (
  product: Product,
  optionIndex: number,
  optionName: string,
  value: string,
  selected: SelectedProductOption[]
) => {
  if (!product.variants) return false;

  return product.variants.some((variant) => {
    if (variant.stock && variant.stock <= 0) return false;

    const opts = parseVariantOptions(variant);

    // top-level option: only needs to exist in stock
    if (optionIndex === 0) return opts[optionName] === value;

    // must match all previous selections
    const prevSelected = selected.slice(0, optionIndex);
    return (
      prevSelected.every((sel) => opts[sel.name] === sel.value) &&
      opts[optionName] === value
    );
  });
};

const findMatchingVariant = (
  product: Product,
  selected: SelectedProductOption[]
): ProductVariant | null => {
  if (!product.variants) return null;

  return (
    product.variants.find((variant) => {
      const opts = parseVariantOptions(variant);
      return selected.every((o) => opts[o.name] === o.value);
    }) ?? null
  );
};

const ProductOptionSelector: React.FC<ProductOptionSelectorProps> = ({
  product,
  onVariantChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedProductOption[]
  >([]);

  // Initialize default selection
  useEffect(() => {
    if (!product.options) return;

    const initial: SelectedProductOption[] = [];

    product.options.forEach((opt, index) => {
      const values = Array.isArray(opt.values)
        ? opt.values.map((v) => (typeof v === "string" ? v.trim() : String(v)))
        : [];
      let selectedValue = values[0];

      for (const val of values) {
        if (isOptionEnabled(product, index, opt.name, val, initial)) {
          selectedValue = val;
          break;
        }
      }

      initial.push({ name: opt.name, value: selectedValue });
    });

    setSelectedOptions(initial);
    onVariantChange(findMatchingVariant(product, initial));
  }, [product]);

  const handleOptionClick = (optionName: string, value: string) => {
    const current = selectedOptions.find((o) => o.name === optionName);

    // Do nothing if clicking the already selected option (no deselect)
    if (current?.value === value) return;

    const optionIndex =
      product.options?.findIndex((o) => o.name === optionName) ?? -1;

    const updated: SelectedProductOption[] = selectedOptions
      .slice(0, optionIndex) // keep previous selections
      .concat({ name: optionName, value });

    // For subsequent options, select first valid value
    if (product.options) {
      for (let i = optionIndex + 1; i < product.options.length; i++) {
        const opt = product.options[i];
        const values = Array.isArray(opt.values)
          ? opt.values.map((v) =>
              typeof v === "string" ? v.trim() : String(v)
            )
          : [];
        let validValue = values.find((v) =>
          isOptionEnabled(product, i, opt.name, v, updated)
        );
        if (!validValue) validValue = values[0];
        updated.push({ name: opt.name, value: validValue });
      }
    }

    setSelectedOptions(updated);
    onVariantChange(findMatchingVariant(product, updated));
  };

  return (
    <>
      {product.options?.map((opt, index) => {
        const values = Array.isArray(opt.values)
          ? opt.values.map((v) =>
              typeof v === "string" ? v.trim() : String(v)
            )
          : [];

        return (
          <div
            key={opt.id ?? opt.name}
            className="flex flex-col min-w-[120px] mb-3"
          >
            <span className="text-xl font-medium text-text mb-1">
              {opt.name}
            </span>
            <div className="flex gap-2 flex-wrap">
              {values.map((val) => {
                const selected = selectedOptions.find(
                  (o) => o.name === opt.name && o.value === val
                );
                const enabled = isOptionEnabled(
                  product,
                  index,
                  opt.name,
                  val,
                  selectedOptions
                );

                return (
                  <Button
                    key={val}
                    disabled={!enabled}
                    onClick={() => handleOptionClick(opt.name, val)}
                    className={`${selected ? "bg-primary text-text border-primary" : !enabled ? "opacity-50 cursor-not-allowed bg-surface text-text border-border" : "bg-surface text-text border-border hover:bg-primaryDark"}`}
                  >
                    {val}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductOptionSelector;
