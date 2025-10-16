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
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Button, TagBox, XButton } from "@components/ui";
import { useCart } from "@features/cart/useCart";
import {
  getProductDiscount,
  getProductFinalPrice,
  parseVariantOptions,
  toMajorPriceString,
  toMajorUnit,
} from "@shared/utils";
import { Plus, Minus } from "lucide-react";
import type { CartItem as CartItemView } from "@shared/types";
import { Label } from "@radix-ui/react-label";

// Props for the slide-out cart component
interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const animateDuraation = 0.7;

export default function SlideOutCart({ isOpen, onClose }: SlideOutCartProps) {
  const [visible, setVisible] = useState(isOpen);

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
            className={`fixed top-0 right-0 h-full w-full sm:w-[600px] 
              flex flex-col bg-card shadow-xl rounded-none sm:rounded-l-lg`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: animateDuraation / 2, ease: "easeInOut" }}
          >
            <div className="flex flex-row justify-between items-center  border-b">
              <Label className="text-xl font-semibold px-md">
                Shopping Cart
              </Label>
              <XButton className="self-end p-lg" onClick={handleClose} />
            </div>
            <CartContents onProceedToCheckout={handleClose} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Animation variants for cart items
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 300 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      x: { duration: 0.2, ease: "easeOut" }, // slide fast
      opacity: { duration: 0.5 }, // fade slower
    },
  },
  exit: {
    opacity: 0,
    x: 300,
    transition: {
      x: { duration: 0.2, ease: "easeOut" },
      opacity: { duration: 0.5 },
    },
  },
};

//==============================================
// --- Cart Contents Component ---
//==============================================

interface CartContentsProps {
  onProceedToCheckout?: () => void;
}

function CartContents({ onProceedToCheckout }: CartContentsProps) {
  const navigate = useNavigate();
  const { cart, totals, addItem, removeItem } = useCart();
  const cartItems = cart.items || [];

  const handleCheckout = () => {
    onProceedToCheckout?.();
    navigate("/checkout");
  };

  // Empty cart state
  if (cartItems.length === 0)
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center">
        <p className="text-textSecondary text-lg">Your cart is empty.</p>
      </div>
    );

  const staggerDuration = animateDuraation / cartItems.length;
  return (
    <div className="flex flex-col h-full">
      <motion.div
        className="flex-1 overflow-y-auto overflow-x-hidden px-md"
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: staggerDuration } },
        }}
      >
        {/* Scrollable cart items */}
        <div>
          {cartItems.map((item, i) => (
            <motion.div
              key={item.variant?.id ?? item.product?.id ?? i}
              variants={itemVariants}
            >
              <CartItemView
                item={item}
                addToCart={addItem}
                removeFromCart={removeItem}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Sticky summary at bottom */}
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ duration: animateDuraation / 2, ease: "easeOut" }}
        className="flex flex-col  h-48 border-t bg-card p-md"
      >
        <div className="flex justify-between font-semibold text-text">
          <span>Subtotal</span>
          <span>${toMajorUnit(totals.subtotal).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-textSecondary">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="flex justify-between font-bold text-xl text-text mb-sm">
          <span>Total</span>
          <span>${toMajorUnit(totals.total).toFixed(2)}</span>
        </div>
        <Button onClick={handleCheckout} className="self-center">
          Proceed to Checkout
        </Button>
      </motion.div>
    </div>
  );
}

//==============================================
// --- Individual Cart Item Component ---
//==============================================

interface CartItemViewProps {
  item: CartItemView;
  addToCart: (item: CartItemView) => void;
  removeFromCart: (item: CartItemView) => void;
}

function CartItemView({ item, addToCart, removeFromCart }: CartItemViewProps) {
  const imgSrc =
    item.product?.images?.[0]?.thumbnail ??
    item.product?.images?.[0]?.preview ??
    item.product?.images?.[0]?.main ??
    "";

  const name = item.product?.name ?? "Unknown Product";
  const selectedOptions = item.variant ? parseVariantOptions(item.variant) : [];
  const ogPrice = item.product?.price! * item.quantity;
  const finalPrice = item.price * item.quantity;
  return (
    <div className="flex flex-row items-center border-b py-md">
      {/* Item image */}
      <img
        src={imgSrc}
        alt={name}
        className="w-20 h-20 rounded-md bg-transparent"
      />

      <div className="flex flex-1 flex-col justify-center items-center sm:flex-row sm:gap-md sm:px-md ">
        {/* Item name and variant options */}
        <div className="flex flex-1 flex-col">
          <p className="font-semibold text-center">{name}</p>
          {selectedOptions.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {selectedOptions.map((opt, idx) => (
                <Label key={idx}>{`${opt.name}: ${opt.value}`}</Label>
              ))}
            </div>
          )}
        </div>

        {/* Quantity controls */}
        <div className="flex flex-row items-center border h-9">
          <Button
            variant="bare"
            className="flex items-center justify-center rounded-none border-none trasnsition-colors"
            onClick={() => removeFromCart({ ...item, quantity: 1 })}
            aria-label={`Remove one ${name}`}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="flex-none justify-center text-center">
            {item.quantity}
          </span>
          <Button
            variant="bare"
            className="flex items-center justify-center rounded-none border-none trasnsition-colors"
            onClick={() => addToCart({ ...item, quantity: 1 })}
            aria-label={`Add one ${name}`}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Item total price */}
      <div className="flex  flex-col items-center sm:flex-1">
        <div className="flex flex-col sm:flex-row items-center">
          <p className="text-md text-muted w-16 text-center line-through">
            ${toMajorUnit(ogPrice).toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-center w-16">
            ${toMajorUnit(finalPrice).toFixed(2)}
          </p>
        </div>

        <TagBox
          className="h-6 text-sm bg-accent text-primary-foreground"
          text={`SAVE $${toMajorUnit(ogPrice - finalPrice).toFixed(2)}`}
        />
      </div>
    </div>
  );
}
