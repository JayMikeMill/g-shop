// src/services/ShippingService.ts

import { shipping } from "@adapters/services";
import { Address } from "@shared/types";

import {
  Parcel,
  ShipmentRate,
  Shipment,
  AddressVerificationResult,
  ShipmentTrackingResult,
} from "@shared/types";

export class ShippingService {
  // -------------------------------
  // Verify Address
  // -------------------------------
  static async verifyAddress(
    address: Address
  ): Promise<AddressVerificationResult> {
    return shipping.verifyAddress(address);
  }

  // -------------------------------
  // Get Shipping Rates
  // -------------------------------
  static async getRates(
    from: Address,
    to: Address,
    parcel: Parcel
  ): Promise<ShipmentRate[]> {
    return shipping.getRates(from, to, parcel);
  }

  // -------------------------------
  // Create Shipment
  // -------------------------------
  static async createShipment(
    from: Address,
    to: Address,
    parcel: Parcel,
    carrier?: string,
    service?: string
  ): Promise<Shipment> {
    return shipping.createShipment(from, to, parcel, carrier, service);
  }

  // -------------------------------
  // Buy Shipment
  // -------------------------------
  static async buyShipment(
    shipmentId: string,
    rate?: ShipmentRate
  ): Promise<Shipment> {
    return shipping.buyShipment(shipmentId, rate);
  }

  // -------------------------------
  // Track Shipment
  // -------------------------------
  static async trackShipment(
    trackingNumber: string
  ): Promise<ShipmentTrackingResult> {
    return shipping.trackShipment(trackingNumber);
  }

  // -------------------------------
  // Cancel Shipment
  // -------------------------------
  static async cancelShipment(shipmentId: string): Promise<boolean> {
    return shipping.cancelShipment(shipmentId);
  }
}
