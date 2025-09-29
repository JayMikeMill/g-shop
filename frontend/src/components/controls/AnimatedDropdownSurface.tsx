import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  className?: string;
  title?: string;
  customTitle?: React.ReactNode;
  children: React.ReactNode;
  openInitially?: boolean;
  open?: boolean;
  disabled?: boolean;
}

const AnimatedDropdownSurface: React.FC<DropdownProps> = ({
  className,
  title,
  customTitle,
  children,
  openInitially = false,
  open: externalOpen,
  disabled = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(openInitially);

  // Use external prop if provided, otherwise internal state
  const open = externalOpen !== undefined ? externalOpen : internalOpen;

  const [overflow, setOverflow] = useState(open);

  const rounding = open ? "rounded-t-md" : "rounded-md";

  useEffect(() => {
    setOverflow(open);
  }, [open]);

  return (
    <div className={`border border-border ${rounding} w-full max-w-full`}>
      <button
        type="button"
        className={`flex justify-between items-center ${rounding} w-full px-4 py-2 bg-surfaceAlt text-text font-semibold ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setInternalOpen((prev) => !prev)}
      >
        {customTitle ?? title}
        {!disabled && <span>{open ? "▲" : "▼"}</span>}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onAnimationStart={() => setOverflow(false)}
            onAnimationComplete={() => setOverflow(open)}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`${overflow ? "overflow-visible" : "overflow-hidden"}`}
          >
            <div className={`p-4 flex flex-col ${className}`}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedDropdownSurface;
