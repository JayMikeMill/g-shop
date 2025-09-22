import { FirebaseAuthAdapter } from "@adapters/auth/firebase-auth-adapter";
import { FirebaseDBAdapter } from "@adapters/db/firebase-db-adapter";
import { PrismaAdapter } from "@adapters/db/prisma-adapter";
import { SquarePaymentAdapter } from "@adapters/payment/square-payment-adapter";
import { FirebaseStorageAdapter } from "@adapters/storage/firebase-storage-adapter";
import { ImgBBStorageAdapter } from "@adapters/storage/imgbb-storage-adapter";

import { env } from "@config/env-vars";

// Create the adapters based on environment variables
export const auth =
  env.ADAPTER_AUTH === "firebase"
    ? new FirebaseAuthAdapter()
    : new FirebaseAuthAdapter();

export const db =
  env.ADAPTER_DATABASE === "firestore"
    ? new FirebaseDBAdapter()
    : env.ADAPTER_DATABASE === "sqlite"
      ? new PrismaAdapter()
      : new FirebaseDBAdapter();

export const storage =
  env.ADAPTER_STORAGE === "firebase"
    ? new FirebaseStorageAdapter()
    : new ImgBBStorageAdapter();

export const payment =
  env.ADAPTER_PAYMENT === "square"
    ? new SquarePaymentAdapter()
    : new SquarePaymentAdapter();
