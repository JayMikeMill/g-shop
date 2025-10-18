// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import siteSettingsReducer from "@features/site-settings/siteSettingsSlice";
import userReducer from "@features/user/userSlice";
import cartReducer from "@features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    siteSettings: siteSettingsReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

// Type helpers for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
