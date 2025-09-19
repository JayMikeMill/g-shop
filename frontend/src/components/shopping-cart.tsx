import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCart, getCartTotals } from "@contexts/cart-context";
import { useNavigate } from "react-router-dom";

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideOutCart({ isOpen, onClose }: SlideOutCartProps) {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const totals = getCartTotals(cart);

  // State to control mounting for smooth animation
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      // Delay unmount to let slide-out animation finish
      const timeout = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex`}>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out
		${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      ></div>

      {/* Slide-out container */}
      <div
        className={`fixed top-0 right-0 h-full transform transition-transform duration-300 ease-in-out
		w-full md:w-1/3 flex flex-col p-lg overflow-y-auto
		bg-surface shadow-xl rounded-l-lg
		${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close button */}
        <button
          className="text-text absolute top-sm right-sm p-2 rounded hover:bg-surfaceAlt transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-title font-bold mb-md text-text">Shopping Cart</h2>

        {/* Items */}
        <div className="flex flex-col gap-sm mb-lg flex-1">
          {cart.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-center">
              <p className="text-textSecondary text-lg">Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-md border-b border-divider pb-sm"
              >
                <img
                  src={item.images[0].thumbnail}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-card"
                />
                <div className="flex-1">
                  <p className="font-semibold text-text">{item.name}</p>
                  <p className="text-textSecondary">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-xs">
                  <button
                    className="px-2 py-1 bg-surfaceAlt rounded hover:bg-surface transition-colors"
                    onClick={() => removeFromCart(item)}
                  >
                    -
                  </button>
                  <span className="text-text">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-surfaceAlt rounded hover:bg-surface transition-colors"
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                  >
                    +
                  </button>
                </div>
                <p className="w-16 text-right text-text">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Totals & Checkout */}
        {cart.length > 0 && (
          <div className="mt-auto border-t border-divider pt-md flex flex-col gap-sm">
            <div className="flex justify-between font-semibold text-text">
              <span>Subtotal</span>
              <span>${totals.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-textSecondary">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-text">
              <span>Total</span>
              <span>${totals.totalPrice.toFixed(2)}</span>
            </div>

            <button
              className="btn-primary w-full mt-sm"
              onClick={() => {
                onClose();
                navigate("/checkout");
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
