import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@components/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap 
  text-sm shadow-sm border border-input
  font-semibold rounded-md cursor-pointer transition-all duration-200 px-6 py-2 
  hover:-translate-y-[0.1rem]  hover:shadow-md
  active:-translate-y-[0.2rem]   active:shadow-lg
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: "bg-background text-primaryForeground",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLElement>,
    VariantProps<typeof buttonVariants> {
  as?: React.ElementType;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant, size, as: Comp = "button", ...props }, ref) => {
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
