// Central configuration for the entire application

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
    storage: "IMGBB",
    payment: "STRIPE",
    shipping: "EASYPOST",
  },
};

export { config };
