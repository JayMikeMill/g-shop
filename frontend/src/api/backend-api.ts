import axios from "axios";
import type { User } from "@models/user";
import type { Product } from "@models/product";
import type { PaymentData } from "@models/payment-data";

const API_BASE = import.meta.env.VITE_API_URL;

function authHeaders(token?: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// AUTH APIs
export const register = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/auth/register`, payload);
  return res.data;
};

export const login = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/auth/login`, payload);
  return res.data;
};

export const verifyToken = async (token: string) => {
  const res = await axios.get(`${API_BASE}/auth/verify`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logout = async (token: string) => {
  const res = await axios.post(
    `${API_BASE}/auth/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// PAYMENT APIs
export const processPayment = async (payment: PaymentData, token?: string | null) => {
  const res = await axios.post(`${API_BASE}/payments/process`, payment, { headers: authHeaders(token) });
  return res.data as any;
};

export const refundPayment = async (paymentId: string, token?: string | null) => {
  const res = await axios.post(`${API_BASE}/payments/refund`, { paymentId }, { headers: authHeaders(token) });
  return res.data as any;
};

// STORAGE APIs

export const uploadImage = async (file: Blob, filename: string, token?: string | null) => {
  const formData = new FormData();
  formData.append("file", file, filename);
  const res = await axios.post(
    `${API_BASE}/storage/image`,
    formData,
    {
      headers: {
        ...authHeaders(token),
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res.data as { url: string };
};


export const uploadFile = async (file: Blob, filename: string, token?: string | null) => {
  const formData = new FormData();
  formData.append("file", file, filename);
  const res = await axios.post(
    `${API_BASE}/storage/file`,
    formData,
    {
      headers: {
        ...authHeaders(token),
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return res.data as { url: string };
};

export const deleteFile = async (url: string, token?: string | null) => {
  const res = await axios.delete(
    `${API_BASE}/storage`,
    { data: { url }, headers: authHeaders(token) }
  );
  return res.data as { success: boolean };
};

// User APIs
export const createUser = async (user: User, password?: string, token?: string | null) => {
  const res = await axios.post(`${API_BASE}/users`, { user, password }, { headers: authHeaders(token) });
  return res.data;
};

export const getUser = async (id: string, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/users/${id}`, { headers: authHeaders(token) });
  return res.data as User;
};

export const getUsers = async (options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/users`, { params: options, headers: authHeaders(token) });
  return res.data;
};

export const updateUser = async (id: string, user: User, token?: string | null) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, user, { headers: authHeaders(token) });
  return res.data as User;
};

export const deleteUser = async (id: string, token?: string | null) => {
  const res = await axios.delete(`${API_BASE}/users/${id}`, { headers: authHeaders(token) });
  return res.data;
};

// Product APIs
export const createProduct = async (product: Product, token?: string | null) => {
  const res = await axios.post(`${API_BASE}/products`, product, { headers: authHeaders(token) });
  return res.data as Product;
};

export const getProduct = async (id: string, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/products/${id}`, { headers: authHeaders(token) });
  return res.data as Product;
};

export const getProducts = async (options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/products`, { params: options, headers: authHeaders(token) });
  return res.data as Product[];
};

export const updateProduct = async (id: string, product: Product, token?: string | null) => {
  const res = await axios.put(`${API_BASE}/products/${id}`, product, { headers: authHeaders(token) });
  return res.data as Product;
};

export const deleteProduct = async (id: string, token?: string | null) => {
  const res = await axios.delete(`${API_BASE}/products/${id}`, { headers: authHeaders(token) });
  return res.data;
};

// Order APIs
export const createOrder = async (order: any, token?: string | null) => {
  const res = await axios.post(`${API_BASE}/orders`, order, { headers: authHeaders(token) });
  return res.data;
};

export const getOrder = async (id: string, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/orders/${id}`, { headers: authHeaders(token) });
  return res.data;
};

export const getOrders = async (options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/orders`, { params: options, headers: authHeaders(token) });
  return res.data;
};

export const updateOrder = async (id: string, order: any, token?: string | null) => {
  const res = await axios.put(`${API_BASE}/orders/${id}`, order, { headers: authHeaders(token) });
  return res.data;
};

export const deleteOrder = async (id: string, token?: string | null) => {
  const res = await axios.delete(`${API_BASE}/orders/${id}`, { headers: authHeaders(token) });
  return res.data;
};
