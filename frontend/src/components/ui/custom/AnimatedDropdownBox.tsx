import React, { useState, useEffect, useRef } from "react";
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
  const open = externalOpen ?? internalOpen;

  // Clip content while animating
  const [clip, setClip] = useState(!openInitially);

  // Ref + height measurement
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Auto-sync controlled prop
  useEffect(() => {
    if (autoSyncOpen !== undefined) setInternalOpen(autoSyncOpen);
  }, [autoSyncOpen]);

  // Recompute height whenever content changes
  useEffect(() => {
    if (!contentRef.current) return;

    const measure = () => {
      setHeight(contentRef.current!.scrollHeight);
    };

    // Initial measure
    measure();

    // Observe content size changes
    const observer = new ResizeObserver(measure);
    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [children]);

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

      <motion.div
        initial={false}
        animate={{ maxHeight: open ? height : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onAnimationStart={() => setClip(true)}
        onAnimationComplete={() => setClip(!open)}
        className={clip ? "overflow-hidden" : ""}
      >
        <div
          ref={contentRef}
          className={`flex flex-col p-4 ${contentClassName}`}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};
