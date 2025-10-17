import { useAppDispatch, useAppSelector } from "@app/hooks";
import { setLoading, setUser, clearUser } from "./userSlice";
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
        const parsedUser = JSON.parse(storedUser) as User;
        dispatch(setUser(parsedUser));
      } catch {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, [dispatch]);

  const registerUser = useCallback(
    (user: User, password: string): Promise<User> => {
      dispatch(setLoading(true));
      return register(user, password)
        .then((newUser) => {
          const userData = newUser as User;
          dispatch(setUser(userData));
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
          return userData;
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          throw error;
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, register]
  );

  const loginUser = useCallback(
    (email: string, password: string): Promise<User> => {
      dispatch(setLoading(true));
      return login(email, password)
        .then((loggedInUser) => {
          if (!loggedInUser) throw new Error("Invalid login response");
          const userData = loggedInUser as User;
          dispatch(setUser(userData));
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
          console.log("Logged in successfully", userData);
          return userData;
        })
        .catch((error) => {
          console.error("Login failed:", error);
          throw error; // important: propagate error
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, login]
  );

  const logoutUser = useCallback((): Promise<void> => {
    return logout(user?.id || "")
      .then(() => {
        console.log("Logged out successfully");
        dispatch(clearUser());
        localStorage.removeItem(USER_STORAGE_KEY);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        throw error;
      });
  }, [dispatch, logout, user?.id]);

  return {
    user,
    loading,
    registerUser,
    loginUser,
    logoutUser,
  };
}
