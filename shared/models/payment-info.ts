import { type ShippingAddress } from "./shipping-info";

export type PaymentInfo = {
    amount: number;
	currency: string;
	method: PaymentMethod;
	status: PaymentStatus;
}

export type PaymentInfoSquare = {
    nonce: string;
    amount: number;
    orderItems: { name: string; price: number; quantity: number }[];
    shipping: ShippingAddress;
}

const PaymentStatuses = {
	PENDING: "pending",
	PAID: "paid",
	REFUNDED: "refunded",
	FAILED: "failed",
} as const;

export type PaymentStatus = typeof PaymentStatuses[keyof typeof PaymentStatuses];

const PaymentMethods = {
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

export type PaymentMethod = typeof PaymentMethods[keyof typeof PaymentMethods];
