import { FirebaseAuthAdapter } from "@adapters/auth/FirebaseAuthAdapter";
import { JwtAuthAdapter } from "@adapters/auth/JwtAuthAdapter";
import { FirebaseDBAdapter } from "@adapters/db/FirebaseDBAdapter";
import { PrismaDBAdapter } from "@adapters/db/PrismaDBAdapter";
import { SquarePaymentAdapter } from "@adapters/payment/SquarePaymentAdapter";
import { StripePaymentAdapter } from "@adapters/payment/StripePaymentAdapter";
import { FirebaseStorageAdapter } from "@adapters/storage/FirebaseStorageAdapter";
import { ImgBBStorageAdapter } from "@adapters/storage/ImgBBStorageAdapter";

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
  Square = "square",
}

// --- Choose adapters here ---
export const adapterConfig = {
  auth: AuthAdapterType.JWT,
  db: DBAdapterType.Prisma,
  storage: StorageAdapterType.ImgBB,
  payment: PaymentAdapterType.Stripe,
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
  [PaymentAdapterType.Square]: () => new SquarePaymentAdapter(),
};

// --- Export selected adapters ---
export const auth = authAdapters[adapterConfig.auth]();
export const db = dbAdapters[adapterConfig.db]();
export const storage = storageAdapters[adapterConfig.storage]();
export const payment = paymentAdapters[adapterConfig.payment]();
