import React from "react";
import { useFormContext } from "react-hook-form";
import { Label, NumberInput } from "@components/ui";
import type { Product } from "shared/types";

export const ProductDimensionsForm: React.FC = () => {
  const { control } = useFormContext<Product>();
  // const system = "imperial";
  // const weightPrefix = system === "imperial" ? "oz" : "gm";
  // const sizePrefix = system === "imperial" ? "in" : "cm";

  return (
    <div className="grid grid-cols-4 gap-xs w-full sm:gap-md">
      {/* Weight */}
      <div className="flex flex-col w-full">
        <Label className="text-center whitespace-nowrap">Weight</Label>
        <NumberInput
          variant="weight"
          controlProps={{
            control,
            name: "dimensions.weight",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>

      {/* Length */}
      <div className="flex flex-col w-full">
        <Label className="text-center whitespace-nowrap">Length</Label>
        <NumberInput
          variant="size"
          controlProps={{
            control,
            name: "dimensions.length",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>

      {/* Width */}
      <div className="flex flex-col w-full">
        <Label className="text-center whitespace-nowrap">Width</Label>
        <NumberInput
          variant="size"
          controlProps={{
            control,
            name: "dimensions.width",
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>

      {/* Height */}
      <div className="flex flex-col w-full">
        <Label className="text-center whitespace-nowrap">Height</Label>
        <NumberInput
          variant="size"
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
