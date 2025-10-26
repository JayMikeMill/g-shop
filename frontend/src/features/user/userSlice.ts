// src/store/userSlice.ts
import type { SafeType, User } from "shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: SafeType<User> | null;
  loading: boolean;
  isDemoUser: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  isDemoUser: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (state.user?.email === "demosite@gmail.com") {
        state.isDemoUser = true;
      } else {
        state.isDemoUser = false;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.isDemoUser = false;
    },
    setIsDemoUser: (state, action: PayloadAction<boolean>) => {
      state.isDemoUser = action.payload;
    },
  },
});

export const { setLoading, setUser, clearUser, setIsDemoUser } =
  userSlice.actions;
export default userSlice.reducer;
