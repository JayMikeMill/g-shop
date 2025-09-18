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

import type { User } from "@models/user";
import { verifyToken } from "@api/backend-api";
import "@api/firebase/firebase-api";

import type { AuthProvider } from "./auth-provider";

export function useFirebaseAuth(): AuthProvider {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
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
    } finally {
      setLoading(false);
    }
  };

  return { user, token, loading, login, logout };
}
