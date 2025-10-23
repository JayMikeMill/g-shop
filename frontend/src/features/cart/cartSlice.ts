// src/features/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem, SafeType } from "shared/types";

// -------------------- Helpers --------------------

// Load cart from localStorage
const loadCart = (): Cart => {
  if (typeof window === "undefined")
    return { items: [], totalItems: 0, subtotal: 0, total: 0 };

  const stored = localStorage.getItem("cart");
  if (!stored) return { items: [], totalItems: 0, subtotal: 0, total: 0 };

  const parsed = JSON.parse(stored) as Cart;

  return {
    items: parsed.items ?? [],
    totalItems: parsed.totalItems ?? 0,
    subtotal: parsed.subtotal ?? 0,
    total: parsed.total ?? 0,
  };
};

// Save cart to localStorage
const saveCart = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Calculate subtotal & total
export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal; // add taxes/shipping/discounts here if needed

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, total, items: totalItems };
};

// -------------------- Slice --------------------

interface CartState {
  cart: Cart;
}

const initialState: CartState = {
  cart: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Partial<CartItem>>) => {
      const item = action.payload;

      // Work on a local items array (never null)
      const items: SafeType<CartItem[]> = state.cart.items
        ? [...state.cart.items]
        : ([] as any);

      // Check if item with same productId and variantId exists
      // If so, increment quantity instead of adding new item
      const existingIndex = items.findIndex(
        (cartItem) =>
          cartItem.productId === item.productId &&
          (cartItem.variantId ?? null) === (item.variantId ?? null)
      );

      if (existingIndex !== -1) {
        items[existingIndex].quantity += item.quantity ?? 1;
      } else {
        // Determine price: variant price if available, else product price minus discount
        const productPrice = item.variant?.price ?? item.product?.price ?? 0;
        const finalPrice = productPrice - (item.product?.discount ?? 0);

        items.push({
          id: item.id,
          productId: item.productId,
          variantId: item.variantId ?? null,
          product: item.product,
          variant: item.variant ?? null,
          quantity: 1,
          price: finalPrice,
        });
      }

      // Recalculate totals
      const totals = calculateCartTotals(items);
      state.cart.items = items;
      state.cart.totalItems = totals.items;
      state.cart.subtotal = totals.subtotal;
      state.cart.total = totals.total;

      saveCart(state.cart as SafeType<Cart>);
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const items: CartItem[] = state.cart.items
        ? [...state.cart.items]
        : ([] as any);
      const existingIndex = items.findIndex(
        (c) => c.productId === item.productId && c.variantId === item.variantId
      );
      if (existingIndex === -1) return;
      const quantityToRemove = item.quantity ?? 1;
      if (items[existingIndex].quantity > quantityToRemove) {
        items[existingIndex].quantity -= quantityToRemove;
      } else {
        items.splice(existingIndex, 1);
      }
      const totals = calculateCartTotals(items);
      state.cart.items = items as any;
      state.cart.totalItems = totals.items;
      state.cart.subtotal = totals.subtotal;
      state.cart.total = totals.total;
      saveCart(state.cart as SafeType<Cart>);
    },

    removeAllFromCart: (state, action: PayloadAction<CartItem>) => {
      console.log("removeCompletely action called");
      const item = action.payload;
      const items: SafeType<CartItem[]> = state.cart.items
        ? [...state.cart.items]
        : ([] as any);
      const filteredItems = items.filter(
        (c) =>
          !(c.productId === item.productId && c.variantId === item.variantId)
      );
      const totals = calculateCartTotals(filteredItems);
      state.cart.items = filteredItems;
      state.cart.totalItems = totals.items;
      state.cart.subtotal = totals.subtotal;
      state.cart.total = totals.total;
      saveCart(state.cart as SafeType<Cart>);
    },

    clearCart: (state) => {
      state.cart = { items: [], totalItems: 0, subtotal: 0, total: 0 };
      localStorage.removeItem("cart");
    },
  },
});

// -------------------- Selectors --------------------

export const selectCart = (state: { cart: CartState }) => state.cart.cart;
export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cart.items;

// -------------------- Exports --------------------

export const { addToCart, removeFromCart, removeAllFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
