import { Address } from "./";

export interface Parcel {
  length: number; // in inches or cm
  width: number;
  height: number;
  weight: number; // in ounces or grams
}

export interface ShipmentRate {
  carrier: string;
  service: string;
  rate: number; // in cents or smallest currency unit
  currency: string;
  deliveryDays?: number;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  labelUrl: string;
  rates?: ShipmentRate[];
  status?: string;
  fromAddress: Address;
  toAddress: Address;
  parcel: Parcel;
  carrier?: string;
  service?: string;
}

export interface AddressVerificationResult {
  valid: boolean;
  normalizedAddress?: Address;
  errors?: string[];
}

export interface ShipmentTrackingResult {
  status: string;
  events: unknown[];
  estimatedDelivery?: string;
}
