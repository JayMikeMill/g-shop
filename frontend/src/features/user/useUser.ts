import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setLoading, setUser, clearUser, type UserData } from "./userSlice";
import { useCallback, useEffect } from "react";
import { useApi } from "@api";
import type { User } from "@shared/types";

const USER_STORAGE_KEY = "userData";

export function useUser() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const { register, login, logout } = useApi().auth;

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as UserData;
        dispatch(setUser(parsedUser));
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, [dispatch]);

  const registerUser = useCallback(
    (user: User, password: string) => {
      dispatch(setLoading(true));
      register(user, password)
        .then((newUser) => {
          dispatch(setUser(newUser as UserData));
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, register]
  );

  const loginUser = useCallback(
    (email: string, password: string) => {
      dispatch(setLoading(true));
      login(email, password)
        .then(({ user }) => {
          dispatch(setUser(user as UserData));
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
          console.log("Logged in successfully", user);
        })
        .catch((error) => {
          console.error("Login failed:", error);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, login]
  );

  const logoutUser = useCallback(() => {
    logout(user?.id || "")
      .then(() => {
        console.log("Logged out successfully");
        dispatch(clearUser());
        localStorage.removeItem(USER_STORAGE_KEY);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }, [dispatch, logout]);

  return {
    user,
    loading,
    registerUser,
    loginUser,
    logoutUser,
  };
}
