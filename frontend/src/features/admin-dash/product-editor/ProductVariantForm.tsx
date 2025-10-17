import React, { useEffect } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { NumberInput } from "@components/ui";
import type { Product } from "shared/types";
import { parseVariantOptions } from "shared/utils";
import { generateVariants } from "@utils/productUtils";

export const ProductVariantForm: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<Product>();

  const { fields: variants } = useFieldArray({
    control,
    name: "variants",
  });

  const options = useWatch({
    control,
    name: "options",
    defaultValue: [],
  });

  useEffect(() => {
    if (!options || options.length === 0) {
      setValue("variants", []);
      return;
    }

    setValue("variants", generateVariants(options, getValues("variants")));
  }, [options, setValue, getValues]);

  if (!variants?.length) return null;

  return (
    <div className="flex flex-col w-full">
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
      {variants.map((variant, idx) => (
        <div
          key={variant.id || idx}
          className="flex justify-between gap-2 items-center w-full border-b border-border py-2"
        >
          <div className="flex flex-wrap gap-1 mt-1 justify-center w-[40%]">
            {parseVariantOptions(variant).map((opt, optIdx) => (
              <span
                key={`variant-${idx}-opt-${optIdx}`}
                className="options-tag"
              >
                {`${opt.name}:${opt.value} `}
              </span>
            ))}
          </div>

          {/* Stock  Input */}
          <NumberInput
            variant="wholeNumber"
            className="flex-1 w-[30%] text-center"
            controlProps={{
              control,
              name: `variants.${idx}.stock`,
              rules: { valueAsNumber: true },
            }}
          />

          {/* Price Input */}
          <NumberInput
            variant="currency"
            className="flex-1 w-[30%] text-center"
            controlProps={{
              control,
              name: `variants.${idx}.price`,
              rules: { valueAsNumber: true },
            }}
          />
        </div>
      ))}
    </div>
  );
};

//==========================================================
// Product Stock Header
//==========================================================

export const ProductVariantHeader: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<Product>();

  // Watch product state directly from form
  const variants = useWatch({ control, name: "variants" });

  const hasVariants = variants && variants.length > 0;

  // Update total stock whenever variants change
  useEffect(() => {
    if (hasVariants) {
      const totalStock = getProductStock(getValues());
      setValue("stock", totalStock, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [variants, setValue, hasVariants, getValues]);

  return (
    <div className="flex flex-row items-center justify-between w-full pr-md py-2">
      <span className="font-semibold whitespace-nowrap">
        {hasVariants ? "Variants" : "Product Stock"}
      </span>

      <NumberInput
        variant="wholeNumber"
        className="flex-none w-24 h-[28px] disabled:opacity-100"
        disabled={hasVariants}
        controlProps={{
          control,
          name: "stock",
          rules: { valueAsNumber: true },
        }}
      />
    </div>
  );
};

// ---------------- Utility functions ----------------
const getProductStock = (product: Pick<Product, "variants" | "stock">) => {
  if (!product.variants || product.variants.length === 0) return product.stock;
  if (product.variants.every((v) => v.stock === undefined)) return undefined;
  return product.variants.reduce((sum, v) => sum + (v.stock ?? 0), 0);
};
