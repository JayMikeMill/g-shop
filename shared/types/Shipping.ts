// shared/types/Shipping.ts
export type ShippingInfo = {
  name?: string;
  address: Address;
  email: string;
  phone?: string;
  method: ShippingMethod;
  carrier: ShippingCarrier;
  trackingNumber?: string | null;
  cost?: number; // in cents
  notes?: string;
};

export type Address = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export const ShippingCarriers = {
  UPS: "UPS",
  FedEx: "FEDEX",
  USPS: "USPS",
  DHL: "DHL",
  Amazon: "AMAZON",
} as const;

export type ShippingCarrier =
  (typeof ShippingCarriers)[keyof typeof ShippingCarriers];

export const ShippingMethods = {
  STANDARD: "STANDARD",
  EXPRESS: "EXPRESS",
  OVERNIGHT: "OVERNIGHT",
} as const;

export type ShippingMethod =
  (typeof ShippingMethods)[keyof typeof ShippingMethods];
