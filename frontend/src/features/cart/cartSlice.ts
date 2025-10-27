// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem, SafeType } from "shared/types";
import { emptyCart } from "shared/types/Empties";

export interface CartTotals {
  items: number;
  subtotal: number;
  shipping: number;
  freeShippingDist: number;
  tax: number;
  total: number;
}

interface CartState {
  cart: SafeType<Cart>;
  totals: CartTotals;
}

const emptyCartState: CartState = {
  cart: emptyCart,
  totals: {
    items: 0,
    subtotal: 0,
    shipping: 0,
    freeShippingDist: 0,
    tax: 0,
    total: 0,
  },
};

const loadCartState = (): CartState => {
  if (typeof window === "undefined") return emptyCartState;
  const stored = localStorage.getItem("cart_state");
  if (!stored) return emptyCartState;
  try {
    return JSON.parse(stored) as CartState;
  } catch {
    return emptyCartState;
  }
};

const saveCartState = (state: CartState) => {
  localStorage.setItem("cart_state", JSON.stringify(state));
};

const calculateFinalCartTotals = (
  items: CartItem[],
  freeThreshold: number,
  flatRate: number,
  taxRate: number
): CartTotals => {
  if (process.env.NODE_ENV === "development")
    console.log("Calculating cart totals with:", {
      items,
      freeThreshold,
      flatRate,
      taxRate,
    });

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const freeShippingDist = Math.max(freeThreshold - subtotal, 0);
  const shipping = freeShippingDist > 0 ? flatRate : 0;
  const tax = (taxRate / 10000) * subtotal;
  const total = subtotal + tax + shipping;

  return {
    items: totalItems,
    subtotal,
    shipping,
    freeShippingDist,
    tax,
    total,
  };
};

// Generic helper to update cart items + totals
const updateCart = (
  state: CartState,
  items: CartItem[],
  siteSettings: {
    freeShippingThreshold: number;
    flatShippingRate: number;
    taxRate: number;
  }
) => {
  const cartTotals = calculateFinalCartTotals(
    items,
    siteSettings.freeShippingThreshold,
    siteSettings.flatShippingRate,
    siteSettings.taxRate
  );

  state.cart.items = items;
  state.cart.totalItems = cartTotals.items;
  state.cart.subtotal = cartTotals.subtotal;
  state.cart.total = cartTotals.total;
  state.totals = cartTotals;

  saveCartState(state);
};

// ---------------- Slice ----------------
const initialState: CartState =
  typeof window !== "undefined" ? loadCartState() : emptyCartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ item: Partial<CartItem>; siteSettings: any }>
    ) => {
      const { item, siteSettings } = action.payload;
      const items = [...(state.cart.items ?? [])];
      const index = items.findIndex(
        (i) =>
          i.productId === item.productId &&
          (i.variantId ?? null) === (item.variantId ?? null)
      );
      if (index !== -1) items[index].quantity += item.quantity ?? 1;
      else {
        const price = item.variant?.price ?? item.product?.price ?? 0;
        items.push({
          id: item.id ?? undefined,
          productId: item.productId!,
          variantId: item.variantId ?? null,
          product: item.product!,
          variant: item.variant ?? null,
          quantity: item.quantity ?? 1,
          price: price - (item.product?.discount ?? 0),
        });
      }
      updateCart(state, items, siteSettings);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ item: CartItem; siteSettings: any }>
    ) => {
      const { item, siteSettings } = action.payload;
      let items = [...(state.cart.items ?? [])];
      const index = items.findIndex(
        (i) => i.productId === item.productId && i.variantId === item.variantId
      );
      if (index === -1) return;
      if (items[index].quantity > (item.quantity ?? 1))
        items[index].quantity -= item.quantity ?? 1;
      else items.splice(index, 1);
      updateCart(state, items, siteSettings);
    },

    removeAllFromCart: (
      state,
      action: PayloadAction<{ item: CartItem; siteSettings: any }>
    ) => {
      const { item, siteSettings } = action.payload;
      const items = (state.cart.items ?? []).filter(
        (i) =>
          !(i.productId === item.productId && i.variantId === item.variantId)
      );
      updateCart(state, items, siteSettings);
    },

    clearCart: (state) => {
      state.cart = { items: [], totalItems: 0, subtotal: 0, total: 0 };
      state.totals = {
        items: 0,
        subtotal: 0,
        shipping: 0,
        freeShippingDist: 0,
        tax: 0,
        total: 0,
      };
      if (typeof window !== "undefined") localStorage.removeItem("cart_state");
    },
    refreshCart: (state, action: PayloadAction<{ siteSettings: any }>) => {
      const { siteSettings } = action.payload;
      updateCart(state, state.cart.items as CartItem[], siteSettings);
    },
  },
});

// ---------------- Selectors ----------------
export const selectCart = (state: { cart: CartState }) => state.cart.cart;
export const selectCartTotals = (state: { cart: CartState }) =>
  state.cart.totals;

// ---------------- Exports ----------------
export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  refreshCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
