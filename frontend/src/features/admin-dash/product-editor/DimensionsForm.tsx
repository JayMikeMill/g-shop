import React from "react";
import { useFormContext, type Control } from "react-hook-form";
import { Label, NumberInput } from "@components/ui";
import { useSiteSettings } from "@app/hooks";

interface DimensionsFormProps {
  controlProps?: { control: Control<any>; rootName?: string }; // RHF integration
  className?: string;
}

export const DimensionsForm: React.FC<DimensionsFormProps> = ({
  controlProps,
  className,
}) => {
  const formContext = useFormContext();
  const control = controlProps?.control || formContext?.control;
  const rootName = controlProps?.rootName || "dimensions";
  const { siteSettings } = useSiteSettings();

  if (!control) {
    console.error("DimensionsForm: No form control provided");
    return null;
  }

  const isImperial = siteSettings?.measurementSystem === "IMPERIAL";

  // Conversion configs for imperial units
  // Backend stores in metric: grams and centimeters
  const weightConversion = isImperial
    ? {
        displayUnit: "oz",
        storageMultiplier: 28.3495, // 1 oz = 28.3495 grams
        decimalScale: 2,
      }
    : undefined;

  const sizeConversion = isImperial
    ? {
        displayUnit: '"',
        storageMultiplier: 2.54, // 1 inch = 2.54 cm
        decimalScale: 0,
      }
    : undefined;

  return (
    <div
      className={`grid grid-cols-4 gap-xs w-full sm:gap-md ${className || ""}`}
    >
      {/* Weight */}
      <div className="flex flex-col w-full">
        <Label className="text-center whitespace-nowrap">Weight</Label>
        <NumberInput
          variant="weight"
          autoConversion={weightConversion}
          controlProps={{
            control,
            name: `${rootName}.weight`,
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
          autoConversion={sizeConversion}
          controlProps={{
            control,
            name: `${rootName}.length`,
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
          decimalScale={0}
          autoConversion={sizeConversion}
          controlProps={{
            control,
            name: `${rootName}.width`,
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
          autoConversion={sizeConversion}
          controlProps={{
            control,
            name: `${rootName}.height`,
            rules: { valueAsNumber: true },
          }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default DimensionsForm;
