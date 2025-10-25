import * as React from "react";

import { cn } from "@components/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  `flex h-9 w-full rounded-md border bg-backgroundAlt text-base shadow-sm
  transition-all placeholder:text-muted-foreground flex min-h-[60px] w-full px-3 py-2
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
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

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
