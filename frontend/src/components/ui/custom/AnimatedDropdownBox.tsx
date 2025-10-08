import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../primitives/Button";

interface AnimatedDropdownBoxProps {
  className?: string;
  title?: string;
  customTitle?: React.ReactNode;
  children: React.ReactNode;
  openInitially?: boolean;
  open?: boolean;
  disabled?: boolean;
}

export const AnimatedDropdownBox: React.FC<AnimatedDropdownBoxProps> = ({
  className,
  title,
  customTitle,
  children,
  openInitially = false,
  open: externalOpen,
  disabled = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(openInitially);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  const [overflow, setOverflow] = useState(open);

  useEffect(() => {
    setOverflow(open);
  }, [open]);

  return (
    <div className={`border border-border rounded-md w-full max-w-full`}>
      <Button
        variant="blank"
        className={`flex justify-between items-center bg-primary-100
          rounded-md w-full px-4 py-2 text-base font-semibold 
           ${disabled ? "cursor-not-allowed" : ""}`}
        onClick={() => !disabled && setInternalOpen((prev) => !prev)}
      >
        {customTitle ?? title}
        {!disabled && <span>{open ? "▲" : "▼"}</span>}
      </Button>

      {/* Always render the children, just animate height */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`overflow-hidden`}
      >
        <div className={`p-4 flex flex-col ${className}`}>{children}</div>
      </motion.div>
    </div>
  );
};
