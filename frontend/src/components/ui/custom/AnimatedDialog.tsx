import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XButton } from "@components/ui";

interface AnimatedDialogProps {
  title?: string;
  titleClassName?: string;
  showHeader?: boolean;
  showXButton?: boolean;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  onEnter?: () => void;
  className?: string;
}

export const AnimatedDialog: React.FC<AnimatedDialogProps> = ({
  title = "Dialog",
  titleClassName,
  showHeader = true,
  showXButton = true,
  open,
  onClose,
  children,
  onEnter,
  className,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Disable background scroll
  useEffect(() => {
    if (open) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  // Escape & Enter key handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Enter" && onEnter) {
        e.preventDefault();
        onEnter();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose, onEnter]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose} // clicking here closes
          />

          {/* Dialog content */}
          <motion.div
            ref={dialogRef}
            className={`rounded-lg shadow-xl border border-border 
              bg-surface relative z-10 ${className ?? ""}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showHeader && (
              <div className="flex items-center justify-between border-b mx-2 pt-4 pb-2 flex-shrink-0 pl-4">
                <h2
                  className={`text-2xl font-bold text-text flex-1 ${titleClassName}`}
                >
                  {title}
                </h2>
                {showXButton && (
                  <XButton
                    className="w-8 h-8"
                    onClick={onClose}
                    aria-label="Close dialog"
                  />
                )}
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
