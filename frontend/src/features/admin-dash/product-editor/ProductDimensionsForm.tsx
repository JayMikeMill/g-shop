import React from "react";
import { useFormContext } from "react-hook-form";
import { Label, NumberInput } from "@components/ui";
import type { Product } from "@shared/types";

export const ProductDimensionsForm: React.FC = () => {
  const { control } = useFormContext<Product>();
  const system = "imperial";
  const weightPrefix = system === "imperial" ? "oz" : "gm";
  const sizePrefix = system === "imperial" ? "in" : "cm";

  return (
    <div className="grid grid-cols-4 gap-md w-full">
      {/* Weight */}
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-center text-sm">Weight ({weightPrefix})</Label>
        <NumberInput
          variant="wholeNumber"
          controlProps={{
            control,
            name: "dimensions.weight",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>

      {/* Length */}
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-center text-sm">Length ({sizePrefix})</Label>
        <NumberInput
          variant="wholeNumber"
          controlProps={{
            control,
            name: "dimensions.length",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>

      {/* Width */}
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-center text-sm">Width ({sizePrefix})</Label>
        <NumberInput
          variant="wholeNumber"
          controlProps={{
            control,
            name: "dimensions.width",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>

      {/* Height */}
      <div className="flex flex-col gap-1 w-full">
        <Label className="text-center text-sm">Height ({sizePrefix})</Label>
        <NumberInput
          variant="wholeNumber"
          controlProps={{
            control,
            name: "dimensions.height",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductDimensionsForm;
