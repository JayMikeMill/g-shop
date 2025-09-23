import { useMemo } from "react";
import { useAuth } from "@contexts/auth/AuthContext";
import axios from "axios";

import type { User } from "@shared/types/User";
import type {
  Product,
  ProductOption,
  ProductOptionsPreset,
} from "@shared/types/Product";
import type { Category } from "@shared/types/Catalog";
import type { Order } from "@shared/types/Order";
import type { PaymentRequest } from "@shared/types/PaymentRequest";
import type { QueryObject } from "@shared/types/QueryObject";

const API_BASE = import.meta.env.VITE_API_URL;

// ----------------------
// Generic request helpers
// ----------------------
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

// ----------------------
// useApi hook
// ----------------------
export function useApi() {
  const { token } = useAuth();

  return useMemo(
    () => ({
      // ---------- AUTH ----------
      register: (payload: any) => post(`${API_BASE}/auth/register`, payload),
      login: (payload: any) => post(`${API_BASE}/auth/login`, payload),

      // ---------- USERS ----------
      createUser: (user: User, password?: string) =>
        post<User>(`${API_BASE}/user`, { user, password }, token),
      getUser: (id: string) => get<User>(`${API_BASE}/user/${id}`, token),
      getUsers: (query?: QueryObject) =>
        get<{ data: User[]; total: number }>(`${API_BASE}/user`, token, query),
      updateUser: (id: string, user: User) =>
        put<User>(`${API_BASE}/user/${id}`, user, token),
      deleteUser: (id: string) => del<User>(`${API_BASE}/user/${id}`, token),

      // ---------- PRODUCTS ----------
      createProduct: (product: Product) =>
        post<Product>(`${API_BASE}/products`, product, token),
      getProduct: (id: string) =>
        get<Product>(`${API_BASE}/products/${id}`, token),
      getProducts: (query?: QueryObject) =>
        get<{ data: Product[]; total: number }>(
          `${API_BASE}/products`,
          token,
          query
        ),
      updateProduct: (product: Product) =>
        put<Product>(`${API_BASE}/products/${product.id}`, product, token),
      deleteProduct: (id: string) =>
        del<Product>(`${API_BASE}/products/${id}`, token),

      // ---------- PRODUCT OPTIONS ----------
      createProductOptionsPreset: (preset: ProductOptionsPreset) =>
        post(`${API_BASE}/products/options-presets`, preset, token),
      getProductOptionsPresets: () =>
        get<{ data: ProductOptionsPreset[]; total: number }>(
          `${API_BASE}/products/options-presets`,
          token
        ),
      deleteProductOptionsPreset: (id: string) =>
        del(`${API_BASE}/products/options-presets/${id}`, token),

      // ---------- CATEGORIES ----------
      createCategory: (cat: Category) =>
        post<Category>(`${API_BASE}/catalog/categories`, cat, token),
      getCategory: (id: string) =>
        get<Category>(`${API_BASE}/catalog/categories/${id}`, token),
      getCategories: () =>
        get<{ data: Category[]; total: number }>(
          `${API_BASE}/catalog/categories`,
          token
        ),
      updateCategory: (id: string, cat: Partial<Category>) =>
        put<Category>(`${API_BASE}/catalog/categories/${id}`, cat, token),
      deleteCategory: (id: string) =>
        del(`${API_BASE}/catalog/categories/${id}`, token),

      // ---------- ORDERS ----------
      createOrder: (order: Order) =>
        post<Order>(`${API_BASE}/orders`, order, token),
      getOrder: (id: string) => get<Order>(`${API_BASE}/orders/${id}`, token),
      getOrders: (query?: QueryObject) =>
        get<{ data: Order[]; total: number }>(
          `${API_BASE}/orders`,
          token,
          query
        ),
      updateOrder: (id: string, order: Order) =>
        put<Order>(`${API_BASE}/orders/${id}`, order, token),
      deleteOrder: (id: string) =>
        del<Order>(`${API_BASE}/orders/${id}`, token),

      // ---------- PAYMENTS ----------
      processPayment: (payment: PaymentRequest) =>
        post(`${API_BASE}/payments/process`, payment, token),
      refundPayment: (paymentId: string) =>
        post(`${API_BASE}/payments/refund`, { paymentId }, token),

      // ---------- STORAGE ----------
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
    }),
    [token]
  );
}
