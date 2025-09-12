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


// Function to map custom ShippingAddress to Square.Address
export const mapToSquareAddress = (addr: ShippingAddress): Square.Address => ({
	addressLine1: addr.addressLine1,
	addressLine2: addr.addressLine2,
	locality: addr.city,
	administrativeDistrictLevel1: addr.state,
	postalCode: addr.postalCode,
	country: addr.country as Square.Country
})