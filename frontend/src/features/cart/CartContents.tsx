import { motion } from "framer-motion";
import { Button, Label } from "@components/ui";
import { useCart, useNavigate } from "@app/hooks";
import { toMajorUnit } from "shared/utils";

import CartItemView from "./CartItemView";
const animateDuraation = 0.7;

import type { Variants } from "framer-motion";
import CartTotalsView from "./CartTotalsView";
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
  onProductClick?: (productId?: string) => void;
}

export default function CartContents({
  onProceedToCheckout,
  isSummary = false,
  onProductClick,
  className,
}: CartContentsProps) {
  const navigate = useNavigate();

  const { cart, cartTotals, addCartItem, removeCartItem, removeAllCartItem } =
    useCart();

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
        {cartTotals.freeShippingDist > 0 && (
          <div className="sticky flex top-md z-10  items-center justify-center">
            <div className="font-semibold p-md w-full max-w-md mb-lg text-lg border bg-surface border-accent text-foreground text-center rounded-md">
              <p>
                Add{" "}
                <Label className="font-bold text-xl">
                  ${toMajorUnit(cartTotals.freeShippingDist).toFixed(2)}
                </Label>{" "}
                for free shipping!
              </p>
            </div>
          </div>
        )}
        <div>
          {cartItems.map((item, i) => (
            <motion.div
              key={item.variant?.id ?? item.product?.id ?? i}
              variants={itemVariants}
            >
              <CartItemView
                item={item}
                addToCart={addCartItem}
                removeFromCart={removeCartItem}
                removeCompletely={removeAllCartItem}
                readOnly={isSummary}
                onProductClick={onProductClick}
                className={i < cartItems.length - 1 ? "border-b" : ""}
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
        <CartTotalsView showTax={isSummary} />
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
