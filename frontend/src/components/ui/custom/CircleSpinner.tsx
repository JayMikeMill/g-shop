// CircleSpinner.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CircleSpinnerProps {
  text?: string;
  open?: boolean; // optional prop to control visibility
}

export const CircleSpinner: React.FC<CircleSpinnerProps> = ({
  text,
  open = true,
}) => {
  const size = 64; // default size

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div
              className="border-8 border-gray-200 border-t-primary rounded-full animate-spin z-50"
              style={{ width: size, height: size }}
            />
            {text && (
              <span
                className="text-3xl text-white pointer-events-none font-semibold"
                style={{ textShadow: "0 0 5px rgba(0,0,0,1)" }}
              >
                {text}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
