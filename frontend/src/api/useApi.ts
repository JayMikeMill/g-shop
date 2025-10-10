// useApi.ts
import { post, del } from "./client";
import type {
  User,
  Order,
  Address,
  Parcel,
  ShipmentRate,
  AddressVerificationResult,
  ShipmentTrackingResult,
} from "@shared/types";
import type {
  AuthApi,
  OrderProcessingApi,
  ShippingApi,
  StorageApi,
} from "@shared/interfaces";

export function useApi(): {
  auth: AuthApi;
  orders: OrderProcessingApi;
  storage: StorageApi;
  shipping: ShippingApi;
} {
  return {
    // ===============================
    // Authentication
    // ===============================
    auth: {
      register: (user: User, password: string) =>
        post<User | null>(`/auth/register`, { user, password }),
      login: (email: string, password: string) =>
        post<User | null>(`/auth/login`, { email, password }),
      verify: (token: string) => post<User | null>(`/auth/verify`, { token }),
      logout: (userId: string) => post<void>(`/auth/logout`, { userId }),
    },

    // ===============================
    // Orders
    // ===============================
    orders: {
      placeOrder: (paymentMethod: any, order: Order) =>
        post<{ success: boolean; data?: any; error?: string }>(
          `/orders/place`,
          {
            paymentMethod,
            order,
          }
        ),
      refundOrder: (id: string) => post<void>(`/orders/refund`, { id }),
    },

    // ===============================
    // Shipping
    // ===============================
    shipping: {
      verifyAddress: (address: Address) =>
        post<AddressVerificationResult>(`/shipping/verify`, address),
      getRates: (from: Address, to: Address, parcel: Parcel) =>
        post<ShipmentRate[]>(`/shipping/rates`, { from, to, parcel }),
      trackShipment: (trackingNumber: string) =>
        post<ShipmentTrackingResult>(`/shipping/track`, { trackingNumber }),
    },

    // ===============================
    //  File Storage
    // ===============================
    storage: {
      uploadImage: (file: Blob, filename: string): Promise<string> => {
        const form = new FormData();
        form.append("file", new File([file], filename));
        return post<{ url: string }>(`/storage/image`, form).then(
          (res) => res.url
        );
      },

      uploadFile: (
        file: Blob,
        filename: string,
        contentType?: string
      ): Promise<string> => {
        const form = new FormData();
        const fileToSend = contentType
          ? new File([file], filename, { type: contentType })
          : new File([file], filename);
        form.append("file", fileToSend);

        return post<{ url: string }>(`/storage/file`, form).then(
          (res) => res.url
        );
      },

      deleteFile: (url: string): Promise<boolean> =>
        del<{ success: boolean }>(`/storage`, { url }).then(
          (res) => res.success
        ),
    },
  };
}
