import type {
  Address,
  AddressVerificationResult,
  Order,
  Parcel,
  ShipmentRate,
  ShipmentTrackingResult,
  User,
} from "../types";

// Authentication interface
export interface AuthApi {
  register(user: User, password: string): Promise<User | null>;
  login(email: string, password: string): Promise<User | null>;
  verify(token: string): Promise<User | null>;
  logout(userId: string): Promise<void>;
}

//  File Storage interface
export type FileData = Blob | Buffer | string;
export interface StorageApi {
  uploadImage(file: FileData, filename: string): Promise<string>;
  uploadFile(
    file: FileData,
    filename: string,
    contentType?: string
  ): Promise<string>;
  deleteFile(url: string): Promise<boolean>;
}

//  Order Processing interface
export interface OrderProcessingApi {
  placeOrder(
    paymentMethod: any,
    order: Order
  ): Promise<{
    success: boolean;
    data?: { newOrder: Order; payment: any };
    error?: string;
  }>;
  refundOrder(id: string): Promise<void>;
}

//  Shipping interface
export interface ShippingApi {
  verifyAddress(address: Address): Promise<AddressVerificationResult>;
  getRates(from: Address, to: Address, parcel: Parcel): Promise<ShipmentRate[]>;
  trackShipment(trackingNumber: string): Promise<ShipmentTrackingResult>;
}
