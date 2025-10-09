export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  company?: string;
  phone?: string;
  email?: string;
}

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

export interface ShippingAdapter {
  /**
   * Verify an address
   */
  verifyAddress(address: Address): Promise<AddressVerificationResult>;

  /**
   * Get shipping rates for a given shipment
   */
  getRates(
    fromAddress: Address,
    toAddress: Address,
    parcel: Parcel
  ): Promise<ShipmentRate[]>;

  /**
   * Create a shipment and generate a label
   */
  createShipment(
    fromAddress: Address,
    toAddress: Address,
    parcel: Parcel,
    carrier?: string,
    service?: string
  ): Promise<Shipment>;

  /**
   * Buy a shipment (confirm and pay for the selected rate)
   */
  buyShipment(shipmentId: string, rate?: ShipmentRate): Promise<Shipment>;

  /**
   * Track a shipment by its tracking number
   */
  trackShipment(trackingNumber: string): Promise<ShipmentTrackingResult>;

  /**
   * Cancel a shipment
   */
  cancelShipment(shipmentId: string): Promise<boolean>;
}
