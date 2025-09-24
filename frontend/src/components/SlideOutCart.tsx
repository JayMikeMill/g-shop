import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { useCart, getCartTotals } from "@contexts/CartContext";
import { parseVariantOptions } from "@shared/types/Product";

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SlideOutCart({ isOpen, onClose }: SlideOutCartProps) {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const totals = getCartTotals(cart);

  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      const timeout = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, handleKeyDown]);

  if (!mounted && !isOpen) return null;

  const handleProceedToCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart"
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-out container */}
      <div
        className={`fixed top-0 right-0 h-full transform transition-transform duration-300 ease-in-out
				w-full md:w-1/3 flex flex-col p-lg overflow-y-auto
				bg-backgroundAlt shadow-xl rounded-l-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="text-text absolute top-sm right-sm p-2 rounded hover:bg-surfaceAlt transition-colors"
          onClick={onClose}
          aria-label="Close cart"
          type="button"
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
            cart.map((item, i) => {
              // Fallback key
              const key = item?.variant?.id ?? item?.product?.id ?? i;

              // Fallback image
              const imgSrc =
                item?.product?.images?.[0]?.thumbnail ||
                item?.product?.images?.[0]?.preview ||
                item?.product?.images?.[0]?.main ||
                "";

              const name = item?.product?.name ?? "Unknown Product";
              const selectedOptions = parseVariantOptions(item.variant);

              return (
                <div
                  key={key}
                  className="flex items-center gap-md border-b border-divider pb-sm"
                >
                  <img
                    src={imgSrc}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-card bg-surface"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text truncate">{name}</p>

                    {selectedOptions.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedOptions.map((opt, idx) => (
                          <span
                            key={`${key}-opt-${idx}`}
                            className="options-tag"
                          >
                            {opt.name}: {opt.value}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-textSecondary">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-xs">
                    <button
                      className="px-2 py-1 bg-surfaceAlt rounded hover:bg-surface transition-colors"
                      onClick={() => removeFromCart({ ...item, quantity: 1 })}
                      aria-label={`Remove one ${name}`}
                      type="button"
                    >
                      -
                    </button>
                    <span className="text-text min-w-[2ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      className="px-2 py-1 bg-surfaceAlt rounded hover:bg-surface transition-colors"
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      aria-label={`Add one ${name}`}
                      type="button"
                    >
                      +
                    </button>
                  </div>

                  <p className="w-16 text-right text-text">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              );
            })
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
              onClick={handleProceedToCheckout}
              type="button"
            >
              Proceed to Checkout
            </button>

            <button
              className="btn-secondary w-full"
              onClick={clearCart}
              type="button"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
