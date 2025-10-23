// Central configuration for the entire application
import dotenv from "dotenv";
import path from "path";

export const PRODUCTION = process.env.NODE_ENV?.trim() === "production";

if (PRODUCTION) {
  dotenv.config({
    path: path.resolve(__dirname, "../../.env.production"),
    quiet: true,
  });
} else {
  dotenv.config({
    path: path.resolve(__dirname, "../../.env.development"),
    quiet: true,
  });
}

export const VERBOSE_LOGGING =
  process.env.VERBOSE_LOGGING === "true" ? true : false;

// Import adapter types
import {
  AuthAdapterType,
  DBAdapterType,
  StorageAdapterType,
  PaymentAdapterType,
  ShippingAdapterType,
} from "@adapters/types";

interface Config {
  // --- Choose adapters here ---
  adapters: {
    auth: AuthAdapterType;
    db: DBAdapterType;
    storage: StorageAdapterType;
    payment: PaymentAdapterType;
    shipping: ShippingAdapterType;
  };
}

const config: Config = {
  adapters: {
    auth: "JWT",
    db: "PRISMA",
    storage: "SUPABASE",
    payment: "STRIPE",
    shipping: "EASYPOST",
  },
};

export { config };
