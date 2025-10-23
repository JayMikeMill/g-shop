import { get } from "./../../api/client";
import { useAppDispatch, useAppSelector, useSiteSettings } from "@app/hooks";

import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
  selectCart,
} from "./cartSlice";
import type { CartItem } from "shared/types";
import { useMemo, useCallback } from "react";

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const { siteSettings } = useSiteSettings();

  // Memoize totals to avoid recalculating on every render
  const getTotals = () =>
    calculateFinalCartTotals(
      cart.items ?? [],
      siteSettings?.freeShippingThreshold ?? 0,
      siteSettings?.flatShippingRate ?? 0,
      siteSettings?.taxRate ?? 0
    );

  // Wrap dispatch calls with useCallback for stable references
  const addItem = useCallback(
    (item: Partial<CartItem>) => dispatch(addToCart(item)),
    [dispatch]
  );
  const removeItem = useCallback(
    (item: CartItem) => dispatch(removeFromCart(item)),
    [dispatch]
  );
  const removeCompletely = useCallback(
    (item: CartItem): any => dispatch(removeAllFromCart(item)),
    [dispatch]
  );
  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return { cart, getTotals, addItem, removeItem, removeCompletely, clear };
}

// Calculate subtotal & total
const calculateFinalCartTotals = (
  items: CartItem[],
  freeThreshold: number,
  flatRate: number,
  taxRate: number
) => {
  console.log("Calculating cart totals...", freeThreshold);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // How much more the customer needs to get free shipping
  const freeShippingDist = Math.max(freeThreshold - subtotal, 0);

  // Shipping cost
  const shipping = freeShippingDist > 0 ? flatRate : 0;

  // Cart total
  const tax = taxRate / 100;

  const total = (tax > 0 ? subtotal + subtotal * tax : subtotal) + shipping;

  return {
    items: totalItems,
    subtotal,
    shipping,
    freeShippingDist,
    tax,
    total,
  };
};
