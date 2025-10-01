import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@components/lib/utils";
import { TrashIcon, XIcon } from "lucide-react";

const buttonVariants = cva(
  `inline-flex items-center justify-center px-6 py-2 gap-2 whitespace-nowrap 
  text-sm font-semibold shadow-sm border border-input rounded-md 
  cursor-pointer transition-all duration-200 
  hover:-translate-y-[0.1rem]  hover:shadow-md 
  active:-translate-y-[0.2rem]   active:shadow-lg 
  disabled:pointer-events-none disabled:opacity-50`,
  //[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,

  {
    variants: {
      variant: {
        default: "bg-background text-primaryForeground",

        destructive: `bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90`,

        outline: `border border-input bg-background shadow-sm 
          hover:bg-accent hover:text-accent-foreground`,

        secondary: `bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`,
        ghost: `hover:bg-accent hover:text-accent-foreground`,

        link: `text-primary underline-offset-4 hover:underline`,

        xicon: `w-10 h-10 p-0 flex items-center justify-center rounded-full 
          text-foreground border-none shadow-none flex transition-colors 
          hover:bg-destructive hover:translate-none hover:shadow-none [&_svg]:shrink-0`,
        raised: `-translate-y-[0.1rem] shadow-md hover:shadow-lg 
          bg-primary text-primary-foreground`,
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
