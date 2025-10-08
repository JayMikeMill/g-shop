import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCart,
  calculateCartTotals,
} from "./cartSlice";
import type { CartItem } from "@shared/types";
import { useMemo, useCallback } from "react";

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);

  // Memoize totals to avoid recalculating on every render
  const totals = useMemo(
    () => calculateCartTotals(cart.items ?? []),
    [cart.items]
  );

  // Wrap dispatch calls with useCallback for stable references
  const addItem = useCallback(
    (item: CartItem) => dispatch(addToCart(item)),
    [dispatch]
  );
  const removeItem = useCallback(
    (item: CartItem) => dispatch(removeFromCart(item)),
    [dispatch]
  );
  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return { cart, totals, addItem, removeItem, clear };
}
