import { motion } from "framer-motion";
import { Button } from "@components/ui";
import { useCart, useSiteSettings, useNavigate } from "@app/hooks";
import { toMajorUnit } from "shared/utils";

import CartItemView from "./CartItemView";
const animateDuraation = 0.7;

import type { Variants } from "framer-motion";
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 300 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      x: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
      opacity: { duration: 0.5 },
    },
  },
  exit: {
    opacity: 0,
    x: 300,
    transition: {
      x: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      },
      opacity: { duration: 0.5 },
    },
  },
};

export interface CartContentsProps {
  onProceedToCheckout?: () => void;
  isSummary?: boolean;
  className?: string;
}

export default function CartContents({
  onProceedToCheckout,
  isSummary = false,
  className,
}: CartContentsProps) {
  const navigate = useNavigate();
  const { cart, totals, addItem, removeItem, removeCompletely } = useCart();
  const { siteSettings } = useSiteSettings();

  const subTotal = totals.total;

  // Shipping calculation
  const freeThreshold = siteSettings?.freeShippingThreshold ?? 0;
  const flatRate = siteSettings?.flatShippingRate ?? 0;

  // How much more the customer needs to get free shipping
  const freeShippingDistance = Math.max(freeThreshold - subTotal, 0);

  // Shipping cost
  const shipping = freeShippingDistance > 0 ? flatRate : 0;
  const freeShipping = shipping === 0;

  // Cart total
  const taxRate =
    isSummary && siteSettings?.taxRate ? siteSettings?.taxRate / 100 : 0;

  const cartTotal = taxRate > 0 ? subTotal + subTotal * taxRate : subTotal;

  const cartItems = cart.items || [];

  const handleCheckout = () => {
    onProceedToCheckout?.();
    navigate("/checkout");
  };

  if (cartItems.length === 0)
    return (
      <div
        className={`flex flex-col flex-1 items-center 
          justify-center text-center ${className}`}
      >
        <p className="text-textSecondary text-lg">Your cart is empty.</p>
      </div>
    );

  const staggerDuration = animateDuraation / cartItems.length;
  return (
    <div className={`flex flex-col h-full ${className}`}>
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
                removeCompletely={removeCompletely}
                readOnly={isSummary}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Totals and checkout button */}
      <motion.div
        initial={!isSummary ? { y: 300, opacity: 0 } : {}}
        animate={!isSummary ? { y: 0, opacity: 1 } : {}}
        exit={!isSummary ? { y: 300, opacity: 0 } : {}}
        transition={{ duration: animateDuraation / 2, ease: "easeOut" }}
        className="flex flex-col border-t bg-surface p-md"
      >
        <div className="flex justify-between font-semibold text-text">
          <span>Subtotal</span>
          <span>${toMajorUnit(totals.subtotal).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-textSecondary">
          <span>Shipping</span>
          <span className={`${freeShipping ? "font-bold text-green-700" : ""}`}>
            {" "}
            {freeShipping ? "FREE!" : toMajorUnit(shipping).toFixed(2)}
          </span>
        </div>
        {taxRate > 0 && (
          <div className="flex justify-between font-semibold text-textSecondary">
            <span>Tax</span>
            <span>${toMajorUnit(totals.total * taxRate).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-xl text-text">
          <span>Total</span>
          <span>${toMajorUnit(cartTotal).toFixed(2)}</span>
        </div>
        {!isSummary && (
          <Button
            onClick={handleCheckout}
            className="h-12 w-64 self-center mt-md font-semibold text-xl"
          >
            Proceed to Checkout
          </Button>
        )}
      </motion.div>
    </div>
  );
}
