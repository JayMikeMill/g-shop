import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  clearCart,
  selectCart,
  selectCartTotals,
} from "./cartSlice";
import type { CartItem } from "shared/types";
import { useCallback } from "react";

export function useCart() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const totals = useAppSelector(selectCartTotals);

  // Get site settings directly from Redux store
  const siteSettings = useAppSelector(
    (state) => state.siteSettings?.siteSettings
  );

  const addItem = useCallback(
    (item: Partial<CartItem>) => {
      dispatch(addToCart({ item, siteSettings }));
    },
    [dispatch, siteSettings]
  );

  const removeItem = useCallback(
    (item: CartItem) => {
      dispatch(removeFromCart({ item, siteSettings }));
    },
    [dispatch, siteSettings]
  );

  const removeCompletely = useCallback(
    (item: CartItem) => {
      dispatch(removeAllFromCart({ item, siteSettings }));
    },
    [dispatch, siteSettings]
  );

  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return {
    cart,
    cartTotals: totals,
    addCartItem: addItem,
    removeCartItem: removeItem,
    removeAllCartItem: removeCompletely,
    clearCart: clear,
  };
}
