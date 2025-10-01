import * as React from "react";

import { cn } from "@components/lib/utils";
import { inputVariants } from "./Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        inputVariants({ variant: "default" }),
        `flex min-h-[60px] w-full px-3 py-2`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
