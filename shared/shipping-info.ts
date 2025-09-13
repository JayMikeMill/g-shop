import { Square } from "square"

export type ShippingInfo = {
	address: ShippingAddress;
	method: ShippingMethod;
	carrier: ShippingCarrier;
	trackingNumber?: string | null;
	cost?: number; // in cents
	notes?: string;
};

export type ShippingAddress = {
	firstName: string
	lastName: string
	email: string
	phone?: string
	addressLine1: string
	addressLine2?: string
	city: string
	state: string
	postalCode: string
	country: string
}

export const ShippingCarriers = {
	UPS: "UPS",
	FedEx: "FedEx",
	USPS: "USPS",
	DHL: "DHL",
	Amazon: "Amazon",
} as const;

export type ShippingCarrier = typeof ShippingCarriers[keyof typeof ShippingCarriers];

export const ShippingMethods = {
	STANDARD: "standard",
	EXPRESS: "express",
	OVERNIGHT: "overnight",
} as const;

export type ShippingMethod = typeof ShippingMethods[keyof typeof ShippingMethods];