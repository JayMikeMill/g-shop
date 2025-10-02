// src/features/auth/useAuth.ts
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  setUser,
  setToken,
  setLoading,
  logout as logoutAction,
} from "./authSlice";
import type { AuthProvider } from "./AuthProvider";
import FirebaseAuthProvider from "./FirebaseAuthProvider";

export function useAuth(provider: AuthProvider = FirebaseAuthProvider()) {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true));
    try {
      const user = await provider.login(email, password);
      dispatch(setUser(user));
      dispatch(setToken(provider.token)); // assume provider sets token internally
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

  return {
    ...auth,
    login,
    logout,
  };
}
