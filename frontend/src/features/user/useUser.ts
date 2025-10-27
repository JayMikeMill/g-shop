import { useAppDispatch, useAppSelector } from "@app/useApp";
import { setLoading, setUser, clearUser } from "./userSlice";
import { useCallback, useEffect } from "react";
import { useApi } from "@app/hooks";
import type { User } from "shared/types";
import type { AuthApi, AuthResponse } from "shared/interfaces";

const USER_STORAGE_KEY = "userData";

export function useUser(): AuthApi & {
  user: User | null;
  loading: boolean;
  isDemoUser: boolean;
} {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const {
    register: apiRegister,
    login: apiLogin,
    logout: apiLogout,
  } = useApi().auth;

  const isDemoUser = user?.email === "demouser@gmail.com";

  //==================================================
  // Load user from localStorage on mount
  //==================================================
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        dispatch(setUser(JSON.parse(storedUser) as User));
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, [dispatch]);

  //==================================================
  // Register
  //==================================================
  const register = useCallback(
    async (newUser: User, password: string): Promise<AuthResponse> => {
      dispatch(setLoading(true));
      try {
        const response = await apiRegister(newUser, password);
        return response;
      } catch (err) {
        console.error("Registration failed:", err);
        return {
          user: null,
          success: false,
          status: "ERROR",
          message: (err as Error).message,
        };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, apiRegister]
  );

  //==================================================
  // Login
  //==================================================
  const login = useCallback(
    async (email: string, password: string): Promise<AuthResponse> => {
      dispatch(setLoading(true));
      try {
        const response = await apiLogin(email, password);
        if (response.success && response.user) {
          dispatch(setUser(response.user));
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
        }
        return response;
      } catch (err) {
        console.error("Login failed:", err);
        return {
          user: null,
          success: false,
          status: "ERROR",
          message: (err as Error).message,
        };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, apiLogin]
  );

  //==================================================
  // Logout
  //==================================================
  const logout = useCallback(async (): Promise<AuthResponse> => {
    if (!user)
      return {
        user: null,
        success: false,
        status: "ERROR",
        message: "No user to logout",
      };

    dispatch(setLoading(true));
    try {
      const response = await apiLogout();
      dispatch(clearUser());
      localStorage.removeItem(USER_STORAGE_KEY);
      return response;
    } catch (err) {
      console.error("Logout failed:", err);
      return {
        user: null,
        success: false,
        status: "ERROR",
        message: (err as Error).message,
      };
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, apiLogout]);

  return { user, loading, isDemoUser, register, login, logout };
}
