import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@components/lib/utils";
import { useState } from "react";

export const inputBorder = `bg-background text-base shadow-sm
	transition-all placeholder:text-muted-foreground rounded-md border
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	disabled:cursor-not-allowed disabled:opacity-50 appearance-none`;

const inputVariants = cva(
  inputBorder +
    `flex h-9 w-full   px-3 py-2
	[&::-webkit-outer-spin-button]:appearance-none
	[&::-webkit-inner-spin-button]:appearance-none
	[moz-appearance:textfield]`,

  {
    variants: {
      variant: {
        default: "border-input text-foreground",
        error:
          "border-destructive text-destructive placeholder:text-destructive/50",
        ghost:
          "border-none bg-input text-foreground placeholder:text-muted-foreground",
      },
      height: {
        default: "h-9",
        sm: "h-8 text-sm px-3",
        lg: "h-11 text-lg px-4",
      },
      size: {
        default: "px-3",
        sm: "px-2",
        lg: "px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants({ size, variant }), className)}
        {...props}
      />
    );
  }
);

const NumberInput = React.forwardRef<
  HTMLInputElement,
  InputProps & { symbol?: string; decimals?: number }
>(({ className, variant, size, decimals, symbol = "$", ...props }, ref) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const { value, onBlur, onFocus, step, ...rest } = props;
  let rawValue = value;

  if (!isFocused || decimals === 0)
    rawValue = padDecimals(value?.toString() || "", decimals) ?? "";

  return (
    <div className="flex flex-1 relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base">
        {symbol}
      </span>
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
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        className={cn("w-full text-center", className)} // add padding-left for the $ sign
        {...rest}
      />
    </div>
  );
});

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

Input.displayName = "Input";

export { inputVariants, Input, NumberInput };
