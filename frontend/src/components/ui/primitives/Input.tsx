import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@components/lib/utils";

export const inputStyle = `bg-backgroundAlt text-base shadow-sm h-9
	transition-all placeholder:text-muted-foreground rounded-md border
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
	disabled:cursor-not-allowed disabled:opacity-50 appearance-none`;

const inputVariants = cva(
  inputStyle +
    `flex h-9 w-full px-3 py-2
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

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
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

Input.displayName = "Input";

export { inputVariants, Input };
