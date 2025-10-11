import * as React from "react";
import { cn } from "@components/lib/utils";

interface ToggleProps {
  checked: boolean;
  onToggle?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ checked, onToggle, className, children, disabled }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onToggle?.(!checked);
    };

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          `
            inline-flex items-center justify-center px-6 py-2 gap-2
            text-sm font-semibold rounded-md cursor-pointer
            transition-all duration-200
            hover:-translate-y-[0.1rem] hover:shadow-sm
            active:-translate-y-[0.2rem] active:shadow-md
            disabled:pointer-events-none disabled:opacity-50
            ${checked ? "bg-primary text-primary-foreground" : "bg-gray-200 text-gray-700"}
          `,
          className
        )}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = "Toggle";

export { Toggle };
