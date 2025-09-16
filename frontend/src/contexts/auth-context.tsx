import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import "@api/firebase/firebase-api"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { verifyToken } from "@api/backend-api";

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

  // Login using Firebase client SDK, then verify with backend
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      setToken(idToken);
      
      // Now verify with backend to get user info
      const verUser = await verifyToken(idToken);
      setUser(verUser);
    } finally {
      setLoading(false);
    }
  };

  // Register using Firebase client SDK, then verify with backend
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Optionally update displayName here if needed
      const idToken = await userCredential.user.getIdToken();
      localStorage.setItem("token", idToken);
      setToken(idToken);

      // Now verify with backend to get user info
      const res = await verifyToken(idToken);
      setUser(res.user);
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
      const res = await verifyToken(token);
      setUser(res.user || null);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  // Logout using Firebase client SDK, clear state and localStorage
  const logout = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await signOut(auth);
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
