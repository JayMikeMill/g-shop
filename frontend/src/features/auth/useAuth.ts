import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  setUser,
  setToken,
  setLoading,
  logout as logoutAction,
} from "./authSlice";
import type { AuthProvider } from "./AuthProvider";
import FirebaseAuth from "./FirebaseAuth";

export function useAuth(provider: AuthProvider = FirebaseAuth) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  // Initialize Redux with provider's current state
  useEffect(() => {
    if (provider.user) dispatch(setUser(provider.user));
    if (provider.token) dispatch(setToken(provider.token));
    dispatch(setLoading(provider.loading));
  }, []);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const user = await provider.login(email, password);
      dispatch(setUser(user));
      dispatch(setToken(provider.token));
      return user;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    dispatch(setLoading(true));
    try {
      await provider.logout();
      dispatch(logoutAction());
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { ...auth, login, logout };
}
