import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@components/lib/utils";
import { TrashIcon, XIcon } from "lucide-react";

const baseButton = `
  inline-flex items-center justify-center px-6 py-2 gap-2 whitespace-nowrap 
  text-sm font-semibold rounded-md 
  cursor-pointer transition-all duration-200 
  hover:-translate-y-[0.1rem] hover:shadow-sm 
  active:-translate-y-[0.2rem] active:shadow-md
  disabled:pointer-events-none disabled:opacity-50
`; //[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,

const buttonVariants = cva(
  "",

  {
    variants: {
      variant: {
        default:
          baseButton +
          `bg-primary text-primary-foreground 
          active:bg-primary-600`,

        destructive:
          baseButton +
          `bg-destructive text-destructive-foreground 
          active:bg-destructive-600`,

        outline:
          baseButton +
          `border border-input bg-background shadow-sm 
          hover:bg-accent hover:text-accent-foreground`,

        secondary:
          baseButton +
          `bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`,
        ghost: baseButton + `hover:bg-accent hover:text-accent-foreground`,

        flat:
          baseButton +
          `bg-transparent text-base shadow-none
        border border-input
        hover:bg-primary-100 hover:text-base
        active:bg-primary-400`,

        flatLink:
          baseButton +
          `underline-offset-4 shadow-none
        hover:underline hover:translate-none hover:shadow-none 
        active:translate-none active:shadow-none`,

        xicon:
          baseButton +
          `w-10 h-10 p-0 flex items-center justify-center rounded-full
          text-foreground border-none shadow-none flex transition-colors
          hover:bg-background hover:translate-none hover:shadow-none [&_svg]:shrink-0
          active:translate-none active:shadow-none`,

        raised:
          baseButton +
          `bg-accent text-primary-foreground
        -translate-y-[0.1rem] scale-110
        hover: shadow-md hover:-translate-y-[0.2rem]
        active:bg-accent-600 active:-translate-y-[0.3rem]`,

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
  }
);

const defaultIcons: Record<string, React.ReactNode> = {
  default: null,
  xicon: <XIcon />,
  destructive: <TrashIcon />,
  // add more variants here as needed
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // removed `as?` because it's always a button
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const classNames = cn(buttonVariants({ variant, size, className }));

    // use map to provide default content if children not passed
    const safeVariant = (variant ?? "default") as keyof typeof defaultIcons;
    const content = children ?? defaultIcons[safeVariant];

    return (
      <button className={classNames} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
