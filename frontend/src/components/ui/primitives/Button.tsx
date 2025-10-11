import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@components/lib/utils";
import { XIcon } from "lucide-react";

// ----------------------
// Generic Button
// ----------------------
const baseButton = `
  inline-flex items-center justify-center px-6 py-2 gap-2 whitespace-nowrap 
  text-sm font-semibold rounded-md 
  cursor-pointer transition-all duration-200 
  hover:-translate-y-[0.1rem] hover:shadow-sm 
  active:-translate-y-[0.2rem] active:shadow-md
  disabled:pointer-events-none disabled:opacity-50
`;

const buttonVariants = cva("", {
  variants: {
    variant: {
      default:
        baseButton +
        `
        bg-primary text-primary-foreground 
        active:bg-primary-600`,
      destructive:
        baseButton +
        `
        bg-destructive text-destructive-foreground 
        active:bg-destructive-600`,
      outline:
        baseButton +
        `
        border border-input bg-background shadow-sm 
        hover:bg-card`,
      secondary:
        baseButton +
        `
        bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`,
      ghost:
        baseButton +
        `
        hover:bg-accent hover:text-accent-foreground`,
      flat:
        baseButton +
        `
        bg-transparent text-base shadow-none
        border border-input
        hover:bg-primary-100 hover:text-base
        active:bg-primary-400`,
      flatLink:
        baseButton +
        `
        underline-offset-4 shadow-none
        hover:underline hover:translate-none hover:shadow-none 
        active:translate-none active:shadow-none`,
      raised:
        baseButton +
        `
        bg-accent text-primary-foreground
        -translate-y-[0.2rem]
        hover:shadow-md hover:-translate-y-[0.3rem]
        active:bg-accent-600 active:-translate-y-[0.4rem]`,
      blank: "",
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
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loadingIcon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, loadingIcon, ...props }, ref) => {
    const classNames = cn(buttonVariants({ variant, size, className }));

    return (
      <button className={classNames} ref={ref} {...props}>
        {children}
        {loadingIcon && (
          <span
            className={`w-5 h-5 border-4 border-current border-t-transparent 
            rounded-full animate-spin`}
          ></span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// ----------------------
// Specialized XButton
// ----------------------
export interface XButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const XButton = React.forwardRef<HTMLButtonElement, XButtonProps>(
  ({ className, ...props }, ref) => {
    const classes = cn(
      `inline-flex items-center justify-center w-10 h-10 p-0 rounded-full
       text-foreground transition-colors duration-200 hover:bg-red-500/70`,
      className
    );

    return (
      <button type="button" className={classes} ref={ref} {...props}>
        <XIcon className="shrink-0" />
      </button>
    );
  }
);

XButton.displayName = "XButton";

export { buttonVariants, Button, XButton };
