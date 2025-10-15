import * as React from "react";
import { Controller, type Control } from "react-hook-form";
import {
  NumericFormat,
  type NumberFormatValues,
  type NumericFormatProps,
} from "react-number-format";
import { inputBorder } from "../primitives/Input";

type Variant = "wholeNumber" | "currency" | "percent" | "weight" | "size";

interface NumberInputProps {
  variant?: Variant;
  controlProps?: { control: Control<any>; name: string; rules?: any }; // RHF integration
  unitConversion?: boolean; // multiply/divide by 100
  value?: number; // for standalone usage
  onChange?: (value: number | null) => void; // for standalone usage
  className?: string;
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
  value,
  onChange,
  className,
  ...props
}) => {
  const renderInput = (
    inputValue: number | null,
    inputOnChange: (v: number | null) => void
  ) => {
    if (variant === "currency" || variant === "percent") unitConversion = true;

    // Apply unit conversion for display and value
    const displayValue =
      unitConversion && inputValue != null ? inputValue / 100 : inputValue;

    return (
      <NumericFormat
        value={displayValue}
        onFocus={(e) => e.target.select()}
        onValueChange={(values: NumberFormatValues) => {
          const newValue =
            values.floatValue != null
              ? unitConversion
                ? values.floatValue * 100
                : values.floatValue
              : null;
          inputOnChange(newValue);
        }}
        placeholder="-"
        allowNegative={false}
        className={inputBorder + " " + className + " text-center "}
        {...formatProp[variant]}
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
