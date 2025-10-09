// useApi.ts
import { post, del } from "./client";
import type { Order, User } from "@shared/types";

export function useApi() {
  return {
    //////////////////////////////////
    //  Authentication
    //////////////////////////////////
    auth: {
      register: (user: User, password: string): Promise<User | null> =>
        post(`/auth/register`, { user, password }),
      login: (email: string, password: string) =>
        post(`/auth/login`, { email, password }),
      logout: () => post(`/auth/logout`),
    },

    //////////////////////////////////
    //  File Storage
    //////////////////////////////////
    storage: {
      uploadImage: (file: Blob, filename: string) => {
        const form = new FormData();
        form.append("file", file, filename);
        return post<{ url: string }>(`/storage/image`, form);
      },
      uploadFile: (file: Blob, filename: string) => {
        const form = new FormData();
        form.append("file", file, filename);
        return post<{ url: string }>(`/storage/file`, form);
      },
      deleteFile: (url: string) =>
        del<{ success: boolean }>(`/storage`, { url }),
    },

    //////////////////////////////////
    // Orders
    //////////////////////////////////
    orders: {
      placeOrder: (
        paymentMethod: any,
        order: Order
      ): Promise<{ success: boolean; error?: string; data?: any }> =>
        post(`/orders/place`, { paymentMethod, order }),
    },

    //////////////////////////////////
    // Shipping
    //////////////////////////////////
    shipping: {
      verifyAddress: (address: any) => post(`/shipping/verify`, { address }),
      getRates: (shipmentDetails: any) =>
        post(`/shipping/rates`, { shipmentDetails }),
      trackShipment: (trackingNumber: string, carrier: string) =>
        post(`/shipping/track`, { trackingNumber, carrier }),
    },
  };
}
