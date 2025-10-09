// Central configuration for adapters

// Auth adapters
import { FirebaseAuthAdapter } from "@adapters/auth/FirebaseAuthAdapter";
import { JwtAuthAdapter } from "@adapters/auth/JwtAuthAdapter";

// DB adapters
import { FirebaseDBAdapter } from "@adapters/firebase/FirebaseDBAdapter";
import { PrismaDBAdapter } from "@adapters/prisma/PrismaDBAdapter";

// Payment adapters
import { StripePaymentAdapter } from "@adapters/payment/StripePaymentAdapter";

// Storage adapters
import { FirebaseStorageAdapter } from "@adapters/storage/FirebaseStorageAdapter";
import { ImgBBStorageAdapter } from "@adapters/storage/ImgBBStorageAdapter";

// Shipping adapters
import { EasyPostAdapter } from "@adapters/shipping/EasyPostAdapter";

// --- Enums for adapter types ---
export enum AuthAdapterType {
  Firebase = "firebase",
  JWT = "jwt",
}

export enum DBAdapterType {
  Firebase = "firebase",
  Prisma = "prisma",
}

export enum StorageAdapterType {
  Firebase = "firebase",
  ImgBB = "imgbb",
}

export enum PaymentAdapterType {
  Stripe = "stripe",
}

export enum ShippingAdapterType {
  EasyPost = "easypost",
}

// --- Choose adapters here ---
export const adapterConfig = {
  auth: AuthAdapterType.JWT,
  db: DBAdapterType.Prisma,
  storage: StorageAdapterType.ImgBB,
  payment: PaymentAdapterType.Stripe,
  shipping: ShippingAdapterType.EasyPost,
};

// --- Lazy factories ---
const authAdapters = {
  [AuthAdapterType.Firebase]: () => new FirebaseAuthAdapter(),
  [AuthAdapterType.JWT]: () => new JwtAuthAdapter(),
};

const dbAdapters = {
  [DBAdapterType.Firebase]: () => new FirebaseDBAdapter(),
  [DBAdapterType.Prisma]: () => new PrismaDBAdapter(),
};

const storageAdapters = {
  [StorageAdapterType.Firebase]: () => new FirebaseStorageAdapter(),
  [StorageAdapterType.ImgBB]: () => new ImgBBStorageAdapter(),
};

const paymentAdapters = {
  [PaymentAdapterType.Stripe]: () => new StripePaymentAdapter(),
};

const shippingAdapters = {
  [ShippingAdapterType.EasyPost]: () => new EasyPostAdapter(),
};

// --- Export selected adapters ---
export const auth = authAdapters[adapterConfig.auth]();
export const db = dbAdapters[adapterConfig.db]();
export const storage = storageAdapters[adapterConfig.storage]();
export const payment = paymentAdapters[adapterConfig.payment]();
export const shipping = shippingAdapters[adapterConfig.shipping]();
