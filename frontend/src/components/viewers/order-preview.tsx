// Import custom cart hook and helper function for totals

import { useCart, getCartTotals } from "@contexts/cart-context";

// The OrderPreview component displays a summary of the current cart items
export default function OrderPreview() {
  // Get cart state from the cart context
  const { cart } = useCart();

  // Calculate total items and total price in the cart
  const totals = getCartTotals(cart);

  // If the cart is empty, show a simple message
  if (cart.length === 0) {
    return (
      <div className="max-w-[700px] mx-auto p-6 bg-surface rounded-lg shadow text-gray-800">
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // Main order summary when cart has items
  return (
    <div className="surface-box max-w-[700px] mx-auto p-6 font-sans text-text">
      <h3 className="text-center mb-4 text-xl font-semibold">Order Summary</h3>

      {/* List of cart items */}
      <div className="flex flex-col gap-3">
        {cart.map((item, index) => (
          <div
            className="flex items-center gap-4 py-1 border-border border-gray-200"
            key={index}
          >
            {/* Product image */}
            <img
              src={item.images[0].thumbnail}
              alt={item.name}
              className="w-[60px] h-[60px] object-cover rounded"
            />

            {/* Product details */}
            <div>
              <h4 className="m-0 text-base font-medium">{item.name}</h4>
              {item.selectedOptions && item.selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-1">
                  {item.selectedOptions.map((opt) => (
                    <span
                      key={opt.name}
                      className="text-xs bg-gray-100 text-text px-2 py-0.5 rounded"
                    >
                      {opt.name}: {opt.value}
                    </span>
                  ))}
                </div>
              )}
              <p className="m-0 text-sm">Price: ${item.price.toFixed(2)}</p>
              <p className="m-0 text-sm">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals summary */}
      <div className="mt-4 text-right font-semibold text-base">
        <p>Total Items: {totals.totalItems}</p>
        <p>Subtotal: ${totals.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
