import { useMemo } from "react";
import { useAuth } from "@contexts/auth/AuthContext";
import axios from "axios";

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

const API_BASE = import.meta.env.VITE_API_URL;

const get = <T>(url: string, token?: string | null, params?: any) =>
  axios
    .get<T>(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
    })
    .then((r) => r.data);

const post = <T>(url: string, data?: any, token?: string | null) =>
  axios
    .post<T>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((r) => r.data);

const put = <T>(url: string, data: any, token?: string | null) =>
  axios
    .put<T>(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((r) => r.data);

const del = <T>(url: string, token?: string | null, data?: any) =>
  axios
    .delete<T>(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data,
    })
    .then((r) => r.data);

export const verifyToken = async (token: string) =>
  axios
    .get(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data);

export function useApi() {
  const { token } = useAuth();

  return useMemo(() => {
    const createResource = <T extends { id?: string }, Q = any>(
      name: string
    ) => ({
      create: (data: Partial<T>) => post<T>(`${API_BASE}/${name}`, data, token),
      getAll: (query?: Q) =>
        get<{ data: T[]; total: number }>(`${API_BASE}/${name}`, token, query),
      get: (id: string | number) => get<T>(`${API_BASE}/${name}/${id}`, token),
      update: (data: T) =>
        put<T>(`${API_BASE}/${name}/${data.id}`, data, token),
      delete: (id: string | number, data?: any) =>
        del<T>(`${API_BASE}/${name}/${id}`, token, data),
    });

    return {
      auth: {
        register: (payload: any) => post(`${API_BASE}/auth/register`, payload),
        login: (payload: any) => post(`${API_BASE}/auth/login`, payload),
      },

      // CRUD resources
      users: createResource<User>("users"),
      products: createResource<Product>("products"),
      productOptionsPresets: createResource<ProductOptionsPreset>(
        "products/options-presets"
      ),
      productTagsPresets: createResource<ProductTagPreset>(
        "products/tags-presets"
      ),
      productVariants: createResource<ProductVariant>("products/variants"),
      productReviews: createResource<ProductReview>("products/reviews"),
      collections: createResource<Collection>("catalog/collections"),
      categories: createResource<Category>("catalog/categories"),
      orders: createResource<Order>("orders"),

      // file uploads
      uploadImage: (file: Blob, filename: string) => {
        const form = new FormData();
        form.append("file", file, filename);
        return post<{ url: string }>(`${API_BASE}/storage/image`, form, token);
      },
      uploadFile: (file: Blob, filename: string) => {
        const form = new FormData();
        form.append("file", file, filename);
        return post<{ url: string }>(`${API_BASE}/storage/file`, form, token);
      },
      deleteFile: (url: string) =>
        del<{ success: boolean }>(`${API_BASE}/storage`, token, { url }),
      // custom endpoints
      processPayment: (payment: any) =>
        post(`${API_BASE}/payments/process`, payment, token),
      refundPayment: (paymentId: string) =>
        post(`${API_BASE}/payments/refund`, { paymentId }, token),
    };
  }, [token]);
}
