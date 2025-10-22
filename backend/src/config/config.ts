// Central configuration for the entire application
import dotenv from "dotenv";
import path from "path";

export const isProduction = process.env.NODE_ENV?.trim() === "production";

if (isProduction) {
  dotenv.config({
    quiet: true,
    path: path.resolve(__dirname, "../../.env.production"),
  });
} else {
  dotenv.config({
    quiet: true,
    path: path.resolve(__dirname, "../../.env.development"),
  });
}

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
