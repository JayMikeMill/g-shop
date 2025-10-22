// --- Types for adapter choices ---
export type AuthAdapterType = "FIREBASE" | "JWT";
export type DBAdapterType = "FIREBASE" | "PRISMA";
export type StorageAdapterType = "SUPABASE" | "IMGBB" | "FIREBASE";
export type PaymentAdapterType = "STRIPE";
export type ShippingAdapterType = "EASYPOST";

export * from "./types/AuthAdapter";
export * from "./types/DBAdapter";
export * from "./types/PaymentAdapter";
export * from "./types/StorageAdapter";
export * from "./types/ShippingAdapter";
