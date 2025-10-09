// src/services/ShippingService.ts

import { shipping } from "@adapters/services";
import {
  Address,
  Parcel,
  ShipmentRate,
  Shipment,
  AddressVerificationResult,
  ShipmentTrackingResult,
} from "@adapters/types/ShippingAdapter";

class ShippingService {
  // -------------------------------
  // Verify Address
  // -------------------------------
  async verifyAddress(address: Address): Promise<AddressVerificationResult> {
    return shipping.verifyAddress(address);
  }

  // -------------------------------
  // Get Shipping Rates
  // -------------------------------
  async getRates(
    from: Address,
    to: Address,
    parcel: Parcel
  ): Promise<ShipmentRate[]> {
    return shipping.getRates(from, to, parcel);
  }

  // -------------------------------
  // Create Shipment
  // -------------------------------
  async createShipment(
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
  async buyShipment(
    shipmentId: string,
    rate?: ShipmentRate
  ): Promise<Shipment> {
    return shipping.buyShipment(shipmentId, rate);
  }

  // -------------------------------
  // Track Shipment
  // -------------------------------
  async trackShipment(trackingNumber: string): Promise<ShipmentTrackingResult> {
    return shipping.trackShipment(trackingNumber);
  }

  // -------------------------------
  // Cancel Shipment
  // -------------------------------
  async cancelShipment(shipmentId: string): Promise<boolean> {
    return shipping.cancelShipment(shipmentId);
  }
}

export const ShippingServiceInstance = new ShippingService();
