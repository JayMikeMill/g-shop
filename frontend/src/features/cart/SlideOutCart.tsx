/**
 * SlideOutCart Component
 * ----------------------
 * A slide-out shopping cart panel for e-commerce applications.
 *
 * Features:
 * - Animated overlay and slide-in/out cart using Framer Motion.
 * - Keyboard accessibility: closes on Escape key.
 * - Displays cart items with quantity controls.
 * - Shows subtotal, shipping, and total.
 * - Integrates with react-router for checkout navigation.
 */

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XButton } from "@components/ui";
import CartContents from "./CartContents";
import { useNavigate } from "@app/hooks";

// Props for the slide-out cart component
interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const animateDuraation = 0.7;

export default function SlideOutCart({ isOpen, onClose }: SlideOutCartProps) {
  const [visible, setVisible] = useState(isOpen);

  const navigate = useNavigate();

  // Keep local visibility state in sync with parent prop
  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = () => setVisible(false);

  // Handle Escape key to close cart
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  }, []);

  // Lock body scroll and add keyboard listener when visible
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [visible, handleKeyDown]);

  // Notify parent when exit animation is complete
  const handleExitComplete = () => {
    if (!visible) onClose();
  };

  const handleProductClick = (productId?: string) => {
    navigate(`/product/${productId}`);
    handleClose();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <div
          className="fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={handleClose}
          />

          {/* Slide-out cart panel */}
          <motion.div
            className={`fixed top-0 right-0 flex flex-col h-full sm:w-1/2 
              flex flex-col bg-surface shadow-xl rounded-none sm:rounded-l-lg`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: animateDuraation / 2, ease: "easeInOut" }}
          >
            <div className="flex flex-row justify-between items-center  border-b">
              <span className="text-xl font-semibold px-md">Shopping Cart</span>
              <XButton className="self-end p-lg" onClick={handleClose} />
            </div>
            <div className="flex-1 flex flex-col overflow-hidden">
              <CartContents
                onProceedToCheckout={handleClose}
                isSummary={false}
                onProductClick={handleProductClick}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ...existing code...
