import { useNavigate } from "react-router-dom";
import { useCart } from "@features/cart/useCart";

import ShoppingCartItem from "./ShoppingCartItem";
import { Button } from "@components/ui";

interface ShoppingCartProps {
  // optional callback if you want SlideOutCart to close when checkout is clicked
  onProceedToCheckout?: () => void;
}

export default function ShoppingCart({
  onProceedToCheckout,
}: ShoppingCartProps) {
  const navigate = useNavigate();

  const { cart, totals, addItem, removeItem } = useCart();
  const cartItems = cart.items || [];

  const handleProceedToCheckout = () => {
    if (onProceedToCheckout) onProceedToCheckout();
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col flex-1">
        <div className="flex flex-1 items-center justify-center text-center">
          <p className="text-textSecondary text-lg">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Items */}
      <div className="flex flex-col gap-sm mb-lg flex-1">
        {cartItems.map((item, i) => (
          <ShoppingCartItem
            key={item.variant?.id ?? item?.product?.id ?? i}
            item={item}
            addToCart={addItem}
            removeFromCart={removeItem}
          />
        ))}
      </div>

      {/* Totals & Checkout */}
      <div className="mt-auto border-t border-divider pt-md flex flex-col gap-sm">
        <div className="flex justify-between font-semibold text-text">
          <span>Subtotal</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-textSecondary">
          <span>Shipping</span>
          <span>FREE</span>
        </div>
        <div className="flex justify-between font-bold text-lg text-text">
          <span>Total</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>

        {/* Checkout button */}
        <Button onClick={handleProceedToCheckout} type="button">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
