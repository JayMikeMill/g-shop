import { ShippingInfo } from "@my-store/shared";

// -------------------- Payment Request --------------------
export interface PaymentRequest {
  token: string; // Payment method token / ID from frontend
  amount: number; // Amount in dollars
  currency?: string; // Optional currency, default could be 'USD'
  shippingInfo?: ShippingInfo; // Optional shipping info
  metadata?: Record<string, string>; // Arbitrary metadata (e.g., note, items count)
}

// -------------------- Payment Result --------------------
export interface PaymentResult {
  id: string; // Payment processor transaction ID
  status: PaymentStatus; // Generic status
  amount: number; // Amount in dollars
  currency: string; // Currency code
  captured?: boolean; // True if payment is captured
  metadata?: Record<string, string>; // Optional metadata returned by processor
}

// -------------------- Generic Payment Status --------------------
export type PaymentStatus =
  | "AUTHORIZED" // Payment is authorized but not captured
  | "CAPTURED" // Payment has been captured
  | "PENDING" // Payment is pending (e.g., awaiting confirmation)
  | "FAILED" // Payment failed
  | "REFUNDED" // Payment refunded
  | "CANCELED"; // Payment canceled
