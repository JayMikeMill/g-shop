import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XButton } from "@components/ui";
import CartContents from "./CartContents";
import { useNavigate } from "@app/hooks";

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const animateDuraation = 0.7;

export default function SlideOutCart({ isOpen, onClose }: SlideOutCartProps) {
  const [visible, setVisible] = useState(isOpen);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setVisible(true);
  }, [isOpen]);

  const handleClose = useCallback(() => setVisible(false), []);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    },
    [handleClose]
  );

  // Body scroll lock + Escape key
  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, handleKeyDown]);

  // Mobile back button (popstate) handling
  useEffect(() => {
    if (!visible) return;

    // Push a dummy history state so back button triggers popstate
    history.pushState(null, document.title);

    const handlePopState = () => {
      handleClose(); // Close the cart instead of going back
      history.pushState(null, document.title); // Keep history state
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [visible, handleClose]);

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
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0, filter: "blur(0px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={handleClose}
          />

          {/* Slide-out cart panel */}
          <motion.div
            className="fixed top-0 right-0 flex flex-col h-full sm:w-1/2 bg-surface shadow-xl rounded-none sm:rounded-l-lg"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: animateDuraation / 2, ease: "easeInOut" }}
          >
            <div className="flex flex-row justify-between items-center border-b">
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
