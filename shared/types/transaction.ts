import { Order } from "./order";
import { type Address } from "./shipping";

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: TransactionStatus;
  billingAddress?: Address;

  // Related order
  order?: Order;
}

interface Invoice {
  id: string;
  orderId: string;
  invoiceNumber: string;
  pdfUrl?: string;
  createdAt: Date;

  // Related order
  order?: Order;
}

export const TransactionStatuses = {
  PENDING: "pending",
  PAID: "paid",
  REFUNDED: "refunded",
  FAILED: "failed",
} as const;

export type TransactionStatus =
  (typeof TransactionStatuses)[keyof typeof TransactionStatuses];

export const PaymentMethods = {
  CARD: "card",
  PAYPAL: "paypal",
  SQUARE: "square",
  CASH: "cash",
  APPLE_PAY: "apple_pay",
  GOOGLE_PAY: "google_pay",
  BANK_TRANSFER: "bank_transfer",
  AFTERPAY: "afterpay",
  KLARNA: "klarna",
  BITCOIN: "bitcoin",
  ETHEREUM: "ethereum",
  LITECOIN: "litecoin",
  OTHER_CRYPTO: "other_crypto",
  OTHER: "other",
} as const;

export type PaymentMethod =
  (typeof PaymentMethods)[keyof typeof PaymentMethods];
