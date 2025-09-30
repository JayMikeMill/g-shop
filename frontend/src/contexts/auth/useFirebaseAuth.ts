// firebase-auth-provider.ts
import { useState, useEffect } from "react";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import type { User } from "@shared/types/User";
import { verifyToken } from "@api/useApi";
import "@api/firebase/firebaseAPI";
import type { AuthProvider } from "./AuthProvider";

const STORAGE_KEY = "authToken";
const SECRET_KEY = "12345678901234567890123456789012"; // exactly 32 chars = 256 bits
// Simple encryption/decryption using Web Crypto API
async function encryptToken(token: string) {
  const enc = new TextEncoder();
  const data = enc.encode(token);
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET_KEY),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  return `${Array.from(iv).join(",")}:${Array.from(new Uint8Array(encrypted)).join(",")}`;
}

async function decryptToken(encryptedToken: string) {
  const [ivStr, dataStr] = encryptedToken.split(":");
  const iv = new Uint8Array(ivStr.split(",").map(Number));
  const data = new Uint8Array(dataStr.split(",").map(Number));
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET_KEY),
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );
  return new TextDecoder().decode(decrypted);
}

export function useFirebaseAuth(): AuthProvider {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on mount
  useEffect(() => {
    (async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const decrypted = await decryptToken(stored);
          setToken(decrypted);
          const verUser = await verifyToken(decrypted);
          setUser(verUser);
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
      setLoading(false);
    })();
  }, []);

  // Save token to localStorage securely
  useEffect(() => {
    (async () => {
      if (token) {
        const encrypted = await encryptToken(token);
        localStorage.setItem(STORAGE_KEY, encrypted);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    })();
  }, [token]);

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true);
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredential.user.getIdToken();
      const verUser = await verifyToken(idToken);
      setUser(verUser);
      setToken(idToken);
      return verUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
      setToken(null);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        const verUser = await verifyToken(idToken);
        setUser(verUser);
        setToken(idToken);
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, token, loading, login, logout };
}
