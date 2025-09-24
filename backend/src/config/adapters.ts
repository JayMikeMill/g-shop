import { FirebaseAuthAdapter } from "@adapters/auth/FirebaseAuthAdapter";
import { FirebaseDBAdapter } from "@adapters/db/FirebaseDBAdapter";
import { PrismaDBAdapter } from "@adapters/db/PrismaDBAdapter";
import { SquarePaymentAdapter } from "@adapters/payment/SquarePaymentAdapter";
import { FirebaseStorageAdapter } from "@adapters/storage/FirebaseStorageAdapter";
import { ImgBBStorageAdapter } from "@adapters/storage/ImgBBStorageAdapter";

import { env } from "@config/envVars";

// Create the adapters based on environment variables
export const auth =
  env.ADAPTER_AUTH === "firebase"
    ? new FirebaseAuthAdapter()
    : new FirebaseAuthAdapter();

export const db =
  env.ADAPTER_DB === "firebase"
    ? new FirebaseDBAdapter()
    : new PrismaDBAdapter();

export const storage =
  env.ADAPTER_STORAGE === "firebase"
    ? new FirebaseStorageAdapter()
    : new ImgBBStorageAdapter();

export const payment =
  env.ADAPTER_PAYMENT === "square"
    ? new SquarePaymentAdapter()
    : new SquarePaymentAdapter();
