import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as authService from "@services/auth-service";

// This is the user type returned by your backend
interface AuthUser {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // On mount, verify token if present
  useEffect(() => {
    if (token) {
      verify();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  // Login using backend API, store token and user in state/localStorage
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
    } finally {
      setLoading(false);
    }
  };

  // Register using backend API, store token and user in state/localStorage
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const res = await authService.register({ name, email, password });
      setToken(res.token);
      setUser(res.user);
      localStorage.setItem("token", res.token);
    } finally {
      setLoading(false);
    }
  };

  // Verify token with backend, update user if valid, otherwise clear auth state
  const verify = async () => {
    setLoading(true);
    try {
      if (!token) {
        setUser(null);
        return;
      }
      const res = await authService.verifyToken(token);
      setUser(res.user || null);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // Logout using backend API, clear state and localStorage
  const logout = async () => {
    setLoading(true);
    try {
      if (token) {
        await authService.logout(token);
      }
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
