// FirebaseAuth.ts
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

// Singleton AuthProvider
class FirebaseAuth implements AuthProvider {
  user: User | null = null;
  token: string | null = null;
  loading: boolean = true;

  constructor() {
    this.init();
  }

  private async init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const decrypted = await decryptToken(stored);
        const verUser = await verifyToken(decrypted);
        this.user = verUser;
        this.token = decrypted;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Listen for Firebase state changes
    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        this.user = await verifyToken(idToken);
        this.token = idToken;
        localStorage.setItem(STORAGE_KEY, await encryptToken(idToken));
      } else {
        this.user = null;
        this.token = null;
        localStorage.removeItem(STORAGE_KEY);
      }
    });

    this.loading = false;
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await cred.user.getIdToken();
    const verUser = await verifyToken(idToken);
    this.user = verUser;
    this.token = idToken;
    localStorage.setItem(STORAGE_KEY, await encryptToken(idToken));
    return verUser;
  }

  async logout() {
    const auth = getAuth();
    await signOut(auth);
    this.user = null;
    this.token = null;
    localStorage.removeItem(STORAGE_KEY);
  }
}

export default new FirebaseAuth(); // singleton
