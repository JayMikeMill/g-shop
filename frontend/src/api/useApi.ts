// useApi.ts
import { post, del } from "./client";
import type { Order, User } from "@shared/types";

export function useApi() {
  return {
    auth: {
      register: (payload: any) => post(`/auth/register`, payload),
      login: (payload: any) => post(`/auth/login`, payload),
    },

    // file uploads
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
    deleteFile: (url: string) => del<{ success: boolean }>(`/storage`, { url }),

    // payments
    placeOrder: (
      paymentMethod: any,
      order: Order
    ): Promise<{ success: boolean; error?: string; data?: any }> =>
      post(`/orders/place`, { paymentMethod, order }),

    refundPayment: (paymentId: string) =>
      post(`/payments/refund`, { paymentId }),

    // ... add more as needed
    login: (email: string, password: string) =>
      post(`/auth/login`, { email, password }),
    logout: () => post(`/auth/logout`),
    register: (user: User, password: string): Promise<User | null> =>
      post(`/auth/register`, { user, password }),
  };
}
