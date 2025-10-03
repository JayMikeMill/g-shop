// FirebaseAuth.ts
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import type { User } from "@my-store/shared/types";
import { verifyToken } from "@api/useApi";
import "@api/firebase/firebaseAPI";
import type { AuthProvider } from "./AuthProvider";
import CryptoJS from "crypto-js";

const STORAGE_KEY = "authToken";
const SECRET_KEY = "12345678901234567890123456789012"; // 32 chars

// AES encryption/decryption using crypto-js
function encryptToken(token: string) {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
}

function decryptToken(encryptedToken: string) {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
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
        const decrypted = decryptToken(stored);
        const verUser = await verifyToken(decrypted);
        this.user = verUser;
        this.token = decrypted;
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const auth = getAuth();
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        this.user = await verifyToken(idToken);
        this.token = idToken;
        localStorage.setItem(STORAGE_KEY, encryptToken(idToken));
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
    localStorage.setItem(STORAGE_KEY, encryptToken(idToken));
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
