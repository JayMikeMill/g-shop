// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@my-store/shared";

// Helper to load/save cart from localStorage
const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cart");
  return stored ? (JSON.parse(stored) as CartItem[]) : [];
};

const saveCart = (cart: readonly CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingIndex = state.cart.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          cartItem.variantId === item.variantId
      );

      if (existingIndex !== -1) {
        state.cart[existingIndex].quantity += item.quantity || 1;
      } else {
        state.cart.push({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity || 1,
          price: item.price,
        });
      }

      saveCart(state.cart as CartItem[]);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingIndex = state.cart.findIndex(
        (c) => c.productId === item.productId && c.variantId === item.variantId
      );

      if (existingIndex === -1) return;

      const quantityToRemove = item.quantity || 1;
      if (state.cart[existingIndex].quantity > quantityToRemove) {
        state.cart[existingIndex].quantity -= quantityToRemove;
      } else {
        state.cart.splice(existingIndex, 1);
      }

      saveCart(state.cart as CartItem[]);
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

// Selectors
export const selectCart = (state: { cart: CartState }) => state.cart.cart;

export const getCartTotals = (cart: CartItem[]) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
