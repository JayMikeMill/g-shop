// Central configuration for adapters

import { config } from "@config";

// Import adapter types
import {
  AuthAdapterType,
  DBAdapterType,
  StorageAdapterType,
  PaymentAdapterType,
  ShippingAdapterType,
} from "@adapters/types";

// Auth adapters
import { AuthAdapter } from "./types/AuthAdapter";
import { FirebaseAuthAdapter } from "./firebase/FirebaseAuthAdapter";
import { JwtAuthAdapter } from "./auth/JwtAuthAdapter";

// DB adapters
import { DBAdapter } from "./types/DBAdapter";
import { FirebaseDBAdapter } from "./firebase/FirebaseDBAdapter";
import { PrismaDBAdapter } from "./prisma/PrismaDBAdapter";

// Payment adapters
import { PaymentAdapter } from "./types/PaymentAdapter";
import { StripePaymentAdapter } from "./payment/StripePaymentAdapter";

// Storage adapters
import { StorageAdapter } from "./types/StorageAdapter";
import { FirebaseStorageAdapter } from "./firebase/FirebaseStorageAdapter";
import { ImgBBStorageAdapter } from "./storage/ImgBBStorageAdapter";

// Shipping adapters
import { ShippingAdapter } from "./types/ShippingAdapter";
import { EasyPostAdapter } from "./shipping/EasyPostAdapter";

// --- Lazy factories ---
export const authAdapters: Record<AuthAdapterType, () => AuthAdapter> = {
  FIREBASE: () => new FirebaseAuthAdapter(),
  JWT: () => new JwtAuthAdapter(),
};

export const dbAdapters: Record<DBAdapterType, () => DBAdapter> = {
  FIREBASE: () => new FirebaseDBAdapter(),
  PRISMA: () => new PrismaDBAdapter(),
};

export const storageAdapters: Record<StorageAdapterType, () => StorageAdapter> =
  {
    FIREBASE: () => new FirebaseStorageAdapter(),
    IMGBB: () => new ImgBBStorageAdapter(),
  };

export const paymentAdapters: Record<PaymentAdapterType, () => PaymentAdapter> =
  {
    STRIPE: () => new StripePaymentAdapter(),
  };

export const shippingAdapters: Record<
  ShippingAdapterType,
  () => ShippingAdapter
> = {
  EASYPOST: () => new EasyPostAdapter(),
};

// --- Export selected adapters ---
const auth = authAdapters[config.adapters.auth]();
const db = dbAdapters[config.adapters.db]();
const storage = storageAdapters[config.adapters.storage]();
const payment = paymentAdapters[config.adapters.payment]();
const shipping = shippingAdapters[config.adapters.shipping]();

export { auth, db, storage, payment, shipping };
