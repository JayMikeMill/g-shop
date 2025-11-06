import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../primitives/Button";

interface AnimatedDropdownBoxProps {
  className?: string;
  contentClassName?: string;
  title?: string;
  customTitle?: React.ReactNode;
  children: React.ReactNode;
  openInitially?: boolean;
  open?: boolean; // controlled
  disabled?: boolean;
  autoSyncOpen?: boolean;
}

export const AnimatedDropdownBox: React.FC<AnimatedDropdownBoxProps> = ({
  className,
  contentClassName,
  title,
  customTitle,
  children,
  openInitially = false,
  open: externalOpen,
  disabled = false,
  autoSyncOpen,
}) => {
  const [internalOpen, setInternalOpen] = useState(openInitially);

  // If external `open` is passed, respect it; otherwise, use internal
  const open = externalOpen ?? internalOpen;

  // Auto-sync effect
  useEffect(() => {
    if (autoSyncOpen !== undefined) setInternalOpen(autoSyncOpen);
  }, [autoSyncOpen]);

  // Fix: initialize clip based on starting open state
  const [clip, setClip] = useState(!openInitially);

  return (
    <div
      className={`border border-border rounded-md w-full max-w-full ${className}`}
    >
      <Button
        variant="blank"
        className={`flex justify-between items-center bg-primary-100
				rounded-md w-full px-md py-sm font-semibold 
				${disabled ? "cursor-not-allowed" : ""} ${open ? "rounded-b-none" : ""}`}
        onClick={() => !disabled && setInternalOpen((prev) => !prev)}
      >
        {customTitle ?? title}
        {!disabled && <span>{open ? "▲" : "▼"}</span>}
      </Button>

      {/* Animate height, clip children only while animating */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onAnimationStart={() => setClip(true)}
        onAnimationComplete={() => setClip(!open)}
        className={clip ? "overflow-hidden" : ""}
      >
        <div className={`p-4 flex flex-col ${contentClassName}`}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
