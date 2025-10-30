import * as React from "react";
import { Controller, type Control } from "react-hook-form";
import {
  NumericFormat,
  type NumberFormatValues,
  type NumericFormatProps,
} from "react-number-format";
import { inputStyle } from "../primitives/Input";

type Variant = "wholeNumber" | "currency" | "percent" | "weight" | "size";

interface ConversionConfig {
  displayUnit: string; // Unit shown to user (e.g., "oz", "in")
  storageMultiplier: number; // Multiply display value by this to get storage value
  decimalScale?: number; // Override decimal places for this unit
}

interface NumberInputProps {
  variant?: Variant;
  controlProps?: { control: Control<any>; name: string; rules?: any }; // RHF integration
  unitConversion?: boolean; // multiply/divide by 100
  autoConversion?: ConversionConfig; // automatic unit conversion
  value?: number; // for standalone usage
  onChange?: (value: number | null) => void; // for standalone usage
  className?: string;
  nonNullable?: boolean;
}

const formatProp = {
  wholeNumber: {
    decimalScale: 0,
    fixedDecimalScale: true,
    thousandSeparator: true,
  },
  currency: {
    prefix: "$",
    decimalScale: 2,
    fixedDecimalScale: true,
    thousandSeparator: true,
  },
  percent: {
    suffix: "%",
    decimalScale: 2,
    fixedDecimalScale: true,
    thousandSeparator: false,
  },
  weight: {
    suffix: "gm",
    decimalScale: 0,
    fixedDecimalScale: true,
    thousandSeparator: false,
  },
  size: {
    suffix: "cm",
    decimalScale: 0,
    fixedDecimalScale: true,
    thousandSeparator: false,
  },
};

export const NumberInput: React.FC<NumberInputProps & NumericFormatProps> = ({
  variant = "currency",
  controlProps,
  unitConversion = false,
  autoConversion,
  value,
  onChange,
  className,
  nonNullable = false,
  ...props
}) => {
  const renderInput = (
    inputValue: number | null,
    inputOnChange: (v: number | null) => void
  ) => {
    if (variant === "currency" || variant === "percent") unitConversion = true;

    // Apply unit conversion for display and value
    let displayValue = inputValue;
    let formatProps = formatProp[variant];

    if (autoConversion && inputValue != null) {
      // Convert from storage units to display units
      displayValue = inputValue / autoConversion.storageMultiplier;
      // Override format props with conversion config
      formatProps = {
        ...formatProps,
        suffix: autoConversion.displayUnit,
        decimalScale: autoConversion.decimalScale ?? formatProps.decimalScale,
      };
    } else if (unitConversion) {
      displayValue = inputValue != null ? inputValue / 100 : inputValue;
    }

    return (
      <NumericFormat
        value={displayValue}
        onFocus={(e) => e.target.select()}
        onValueChange={(values: NumberFormatValues) => {
          let newValue = values.floatValue;

          if (newValue != null) {
            if (autoConversion) {
              // Convert from display units to storage units
              newValue = newValue * autoConversion.storageMultiplier;
            } else if (unitConversion) {
              newValue = newValue * 100;
            }
          }

          // If nonNullable is true, set empty to 0
          if (nonNullable && newValue == null) {
            inputOnChange(0);
          } else {
            inputOnChange(newValue ?? null);
          }
        }}
        placeholder="-"
        allowNegative={false}
        className={inputStyle + className + " text-center min-w-0"}
        {...formatProps}
        {...props}
      />
    );
  };

  // If controlProps provided, wrap in Controller
  if (controlProps) {
    const { control, name, rules } = controlProps;
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => renderInput(field.value, field.onChange)}
      />
    );
  }

  // Standalone usage
  return renderInput(value ?? null, onChange ?? (() => {}));
};
