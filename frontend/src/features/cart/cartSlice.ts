// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@models/CartItem";

// Helper to load/save cart from localStorage
const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (cart: CartItem[]) => {
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
          cartItem.product.id === item.product.id &&
          cartItem.variant?.id === item.variant?.id
      );

      if (existingIndex !== -1) {
        state.cart[existingIndex].quantity += item.quantity || 1;
      } else {
        state.cart.push({ ...item, quantity: item.quantity || 1 });
      }

      saveCart(state.cart);
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingIndex = state.cart.findIndex(
        (c) =>
          c.product.id === item.product.id && c.variant?.id === item.variant?.id
      );

      if (existingIndex === -1) return;

      const quantityToRemove = item.quantity || 1;
      if (state.cart[existingIndex].quantity > quantityToRemove) {
        state.cart[existingIndex].quantity -= quantityToRemove;
      } else {
        state.cart.splice(existingIndex, 1);
      }

      saveCart(state.cart);
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
