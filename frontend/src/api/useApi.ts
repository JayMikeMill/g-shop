import { useMemo } from "react";
import { useAuth } from "@features/auth/useAuth";
import { apiClient, setAuthToken } from "./client";

import type { CRUDInterface } from "@shared/types/crud-interface";
import type { QueryObject } from "@shared/types/QueryObject";
import type {
  Product,
  ProductTagPreset,
  ProductVariant,
  ProductReview,
  ProductOptionsPreset,
} from "@shared/types/Product";
import type { User } from "@shared/types/User";
import type { Collection, Category } from "@shared/types/Catalog";
import type { Order } from "@shared/types/Order";

// Generic helpers
const get = async <T>(url: string, params?: any): Promise<T> => {
  const r = await apiClient.get<T>(url, { params });
  return r.data;
};

const post = async <T>(url: string, data?: any): Promise<T> => {
  const r = await apiClient.post<T>(url, data);
  return r.data;
};

const put = async <T>(url: string, data: any): Promise<T> => {
  const r = await apiClient.put<T>(url, data);
  return r.data;
};

const del = async <T>(url: string, data?: any): Promise<T> => {
  const r = await apiClient.delete<T>(url, { data });
  return r.data;
};

// CRUD factory
function CRUD<T extends { id?: string }>(name: string): CRUDInterface<T> {
  return {
    create: (data: Partial<T>) => post<T>(`/${name}`, data),
    get: (id: string) => get<T | null>(`/${name}/${id}`),
    getAll: (query?: QueryObject) =>
      get<{ data: T[]; total: number }>(`/${name}`, query),
    update: (updates: Partial<T> & { id: string }) =>
      put<T>(`/${name}/${updates.id}`, updates),
    delete: (id: string) => del<T>(`/${name}/${id}`),
  };
}

// Standalone function (outside the hook)
export async function verifyToken(token: string) {
  const r = await apiClient.get("/auth/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return r.data;
}

// Hook
export function useApi() {
  const { token } = useAuth();

  return useMemo(() => {
    setAuthToken(token);

    return {
      auth: {
        register: (payload: any) => post(`/auth/register`, payload),
        login: (payload: any) => post(`/auth/login`, payload),
      },

      // CRUD resources
      users: CRUD<User>("users"),
      products: CRUD<Product>("products"),
      productOptionsPresets: CRUD<ProductOptionsPreset>(
        "products/options-presets"
      ),
      productTagsPresets: CRUD<ProductTagPreset>("products/tags-presets"),
      productVariants: CRUD<ProductVariant>("products/variants"),
      productReviews: CRUD<ProductReview>("products/reviews"),
      collections: CRUD<Collection>("catalog/collections"),
      categories: CRUD<Category>("catalog/categories"),
      orders: CRUD<Order>("orders"),

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
      deleteFile: (url: string) =>
        del<{ success: boolean }>(`/storage`, { url }),

      // custom endpoints
      processPayment: (payment: any) => post(`/payments/process`, payment),
      refundPayment: (paymentId: string) =>
        post(`/payments/refund`, { paymentId }),
    };
  }, [token]);
}
