// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Type helpers for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
