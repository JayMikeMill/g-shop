import { useAppDispatch, useAppSelector, useSiteSettings } from "@app/hooks";
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
  const { siteSettings } = useSiteSettings();

  const settingsPayload = {
    freeShippingThreshold: siteSettings?.freeShippingThreshold ?? 0,
    flatShippingRate: siteSettings?.flatShippingRate ?? 0,
    taxRate: siteSettings?.taxRate ?? 0,
  };

  const addItem = useCallback(
    (item: Partial<CartItem>) =>
      dispatch(addToCart({ item, siteSettings: settingsPayload })),
    [dispatch, settingsPayload]
  );

  const removeItem = useCallback(
    (item: CartItem) =>
      dispatch(removeFromCart({ item, siteSettings: settingsPayload })),
    [dispatch, settingsPayload]
  );

  const removeCompletely = useCallback(
    (item: CartItem) =>
      dispatch(removeAllFromCart({ item, siteSettings: settingsPayload })),
    [dispatch, settingsPayload]
  );

  const clear = useCallback(() => dispatch(clearCart()), [dispatch]);

  return { cart, totals, addItem, removeItem, removeCompletely, clear };
}
