// src/store/userSlice.ts
import type { SafeType } from "shared/types";
import type { SiteSettings } from "shared/settings";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  siteSettings: SafeType<SiteSettings> | null;
  loading: boolean;
}

const initialState: AuthState = {
  siteSettings: null,
  loading: false,
};

const siteSettingsSlice = createSlice({
  name: "siteSettings",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSiteSettings: (state, action: PayloadAction<SiteSettings | null>) => {
      state.siteSettings = action.payload;
    },
  },
});

export const { setLoading, setSiteSettings } = siteSettingsSlice.actions;
export default siteSettingsSlice.reducer;
