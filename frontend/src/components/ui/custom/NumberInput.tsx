import * as React from "react";
import { cn } from "@components/lib/utils";
import { useState } from "react";
import { Input, type InputProps } from "../primitives/Input";
import { toMajorUnit, toMinorUnit } from "@shared/utils";

const NumberInput = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    style?: "CURRENCY" | "PERCENT";
    decimals?: number;
    unitConversion?: boolean;
  }
>(
  (
    { className, variant, size, style, decimals, unitConversion, ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const { value, onBlur, onFocus, onChange, ...rest } = props;

    const isCurrency = style === "CURRENCY";
    let rawValue =
      unitConversion === true && value ? toMajorUnit(Number(value)) : value;

    decimals = style ? (isCurrency ? 2 : 1) : decimals;

    if (!isFocused || decimals === 0)
      rawValue = padDecimals(rawValue?.toString() || "", decimals) ?? "";

    return (
      <div className="flex flex-1 relative">
        {style && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base">
            {isCurrency ? "$" : "%"}
          </span>
        )}
        <Input
          ref={ref}
          type="number"
          value={rawValue}
          placeholder="-"
          onFocus={(e) => {
            e.target.select();
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onChange={(e) => {
            if (unitConversion === true) {
              const minor = toMinorUnit(parseFloat(e.target.value));
              e.target.value = minor.toString();
            }
            onChange && onChange(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          className={cn("w-full text-center", className)} // add padding-left for the $ sign
          {...rest}
        />
      </div>
    );
  }
);

const padDecimals = (value: string, decimals = 2) => {
  // Remove everything except digits and dot, keep only first valid number
  const cleaned = value
    .replace(/[^0-9.]/g, "")
    .replace(/^(\d*\.?\d*).*$/, "$1");

  // If empty or just ".", return empty string
  if (cleaned === "" || cleaned === ".") return "";

  if (decimals === 0) {
    // Only keep integer part
    return parseInt(cleaned).toString();
  }

  // Split integer and fractional part
  const [intPart, fracPart = ""] = cleaned.split(".");

  // Pad/truncate fractional part
  const paddedFrac = (fracPart + "0".repeat(decimals)).slice(0, decimals);

  return `${intPart}.${paddedFrac}`;
};

export { NumberInput };
