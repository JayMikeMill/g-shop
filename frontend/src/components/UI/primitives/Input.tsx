import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@components/lib/utils";

const inputVariants = cva(
  `flex h-9 w-full rounded-md border bg-transparent text-base shadow-sm
	transition-all placeholder:text-muted-foreground 
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	disabled:cursor-not-allowed disabled:opacity-50 appearance-none
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
  InputProps & { symbol?: string }
>(({ className, variant, size, symbol = "$", ...props }, ref) => {
  return (
    <div className="flex flex-1 relative">
      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-base">
        {symbol}
      </span>
      <Input
        ref={ref}
        type="number"
        min={0}
        step={0.01}
        placeholder="-"
        onFocus={(e) => e.target.select()}
        className={cn("w-full text-center", className)} // add padding-left for the $ sign
        {...props}
      />
    </div>
  );
});

Input.displayName = "Input";

export { inputVariants, Input, NumberInput as NumberInput };
