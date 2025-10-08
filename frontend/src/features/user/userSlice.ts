// src/store/userSlice.ts
import type { UserRole } from "@shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthState {
  user: UserData | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { setLoading, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
