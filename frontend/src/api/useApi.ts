// useApi.ts
import { post, del, put, get } from "./client";
import type {
  User,
  Order,
  Address,
  Parcel,
  ShipmentRate,
  AddressVerificationResult,
  ShipmentTrackingResult,
} from "shared/types";

import type {
  AnySystemSettings,
  SiteSettings,
  SystemSettingsScope,
} from "shared/settings";

import type {
  AuthResponse,
  AuthApi,
  OrderProcessingApi,
  ShippingApi,
  SystemSettingsApi,
  StorageApi,
} from "shared/interfaces";

export function useApi(): {
  auth: AuthApi;
  orders: OrderProcessingApi;
  shipping: ShippingApi;
  storage: StorageApi;
  settings: SystemSettingsApi;
} {
  return {
    // ===============================
    // Authentication
    // ===============================
    auth: {
      register: (user: User, password: string) =>
        post<AuthResponse>(`/auth/register`, {
          user,
          password,
        }),
      login: (email: string, password: string) =>
        post<AuthResponse>(`/auth/login`, {
          email,
          password,
        }),
      logout: () => post<AuthResponse>(`/auth/logout`),
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
      buyOrderShipping: (orderId: string) =>
        post<Order | null>(`/orders/buy-shipping`, { orderId }),
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

    // ===============================
    //  System Settings
    // ===============================
    settings: {
      getSiteSettings: (): Promise<SiteSettings | null> =>
        get<SiteSettings | null>(`/settings/site`),

      getSettings: (
        scope: SystemSettingsScope
      ): Promise<AnySystemSettings | null> =>
        get<AnySystemSettings | null>(`/settings/admin/${scope}`),

      updateSettings: (
        scope: SystemSettingsScope,
        settings: AnySystemSettings
      ): Promise<AnySystemSettings | null> =>
        put<AnySystemSettings | null>(`/settings/admin/${scope}`, { settings }),
    },
  };
}
