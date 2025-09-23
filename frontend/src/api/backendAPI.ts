import axios from "axios";
import type { User } from "@shared/types/User";
import type { Product, ProductOptionPreset } from "@shared/types/Product";
import type { Category } from "@shared/types/Catalog";
import type { PaymentRequest } from "@shared/types/PaymentRequest";
import type { Order } from "@shared/types/Order";
import type { QueryObject } from "@shared/types/QueryObject";

const API_BASE = import.meta.env.VITE_API_URL;

function authHeaders(token?: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ==========================
   AUTH APIs
========================== */
export const register = async (payload: any) =>
  axios.post(`${API_BASE}/auth/register`, payload).then((r) => r.data);
export const login = async (payload: any) =>
  axios.post(`${API_BASE}/auth/login`, payload).then((r) => r.data);
export const verifyToken = async (token: string) =>
  axios
    .get(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((r) => r.data);
export const logout = async (token: string) =>
  axios
    .post(
      `${API_BASE}/auth/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((r) => r.data);

/* ==========================
   USER APIs
========================== */
export const createUser = async (
  user: User,
  password?: string,
  token?: string | null
) =>
  axios
    .post(
      `${API_BASE}/user`,
      { user, password },
      { headers: authHeaders(token) }
    )
    .then((r) => r.data);
export const getUser = async (id: string, token?: string | null) =>
  axios
    .get(`${API_BASE}/user/${id}`, { headers: authHeaders(token) })
    .then((r) => r.data as User);
export const getUsers = async (
  options?: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  },
  token?: string | null
) =>
  axios
    .get(`${API_BASE}/user`, { params: options, headers: authHeaders(token) })
    .then((r) => r.data);
export const updateUser = async (
  id: string,
  user: User,
  token?: string | null
) =>
  axios
    .put(`${API_BASE}/user/${id}`, user, { headers: authHeaders(token) })
    .then((r) => r.data as User);
export const deleteUser = async (id: string, token?: string | null) =>
  axios
    .delete(`${API_BASE}/user/${id}`, { headers: authHeaders(token) })
    .then((r) => r.data);

/* ==========================
   PRODUCT APIs
========================== */
export const createProduct = async (product: Product, token?: string | null) =>
  axios
    .post(`${API_BASE}/products`, product, { headers: authHeaders(token) })
    .then((r) => r.data as Product);
export const getProduct = async (id: string, token?: string | null) =>
  axios
    .get(`${API_BASE}/products/${id}`, { headers: authHeaders(token) })
    .then((r) => r.data as Product);
export const getProducts = async (query?: QueryObject, token?: string | null) =>
  axios
    .get(`${API_BASE}/products`, { params: query, headers: authHeaders(token) })
    .then((r) => r.data as { data: Product[]; total: number });
export const updateProduct = async (product: Product, token?: string | null) =>
  axios
    .put(`${API_BASE}/products/${product.id}`, product, {
      headers: authHeaders(token),
    })
    .then((r) => r.data as Product);
export const deleteProduct = async (id: string, token?: string | null) =>
  axios
    .delete(`${API_BASE}/products/${id}`, { headers: authHeaders(token) })
    .then((r) => r.data);

/* ==========================
   PRODUCT OPTIONS PRESETS APIs
========================== */
export const createProductOptionsPreset = async (
  preset: ProductOptionPreset,
  token?: string | null
) =>
  axios
    .post(`${API_BASE}/products/options-presets`, preset, {
      headers: authHeaders(token),
    })
    .then((r) => r.data);
export const getProductOptionsPresets = async (token?: string | null) =>
  axios
    .get(`${API_BASE}/products/options-presets`, {
      headers: authHeaders(token),
    })
    .then((r) => r.data);
export const deleteProductOptionsPreset = async (
  id: string,
  token?: string | null
) =>
  axios
    .delete(`${API_BASE}/products/options-presets/${id}`, {
      headers: authHeaders(token),
    })
    .then((r) => r.data);

/* ==========================
   CATEGORY APIs
========================== */
export const createCategory = async (
  category: Category,
  token?: string | null
) => {
  const res = await axios.post(`${API_BASE}/catalog/categories`, category, {
    headers: authHeaders(token),
  });
  return res.data as Category;
};

export const getCategory = async (id: string, token?: string | null) => {
  const res = await axios.get(`${API_BASE}/catalog/categories/${id}`, {
    headers: authHeaders(token),
  });
  return res.data as Category;
};

export const getCategories = async (token?: string | null) => {
  const res = await axios.get(`${API_BASE}/catalog/categories`, {
    headers: authHeaders(token),
  });
  return res.data as Category[];
};

export const updateCategory = async (
  id: string,
  category: Partial<Category>,
  token?: string | null
) => {
  const res = await axios.put(
    `${API_BASE}/catalog/categories/${id}`,
    category,
    {
      headers: authHeaders(token),
    }
  );
  return res.data as Category;
};

export const deleteCategory = async (id: string, token?: string | null) => {
  const res = await axios.delete(`${API_BASE}/catalog/categories/${id}`, {
    headers: authHeaders(token),
  });
  return res.data;
};

/* ==========================
   ORDER APIs
========================== */
export const createOrder = async (order: Order, token?: string | null) =>
  axios
    .post(`${API_BASE}/Orders`, order, { headers: authHeaders(token) })
    .then((r) => r.data as Order);
export const getOrder = async (id: string, token?: string | null) =>
  axios
    .get(`${API_BASE}/Orders/${id}`, { headers: authHeaders(token) })
    .then((r) => r.data as Order);
export const getOrders = async (
  options?: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  },
  token?: string | null
) =>
  axios
    .get(`${API_BASE}/Orders`, { params: options, headers: authHeaders(token) })
    .then((r) => r.data as Order[]);
export const updateOrder = async (
  id: string,
  order: Order,
  token?: string | null
) =>
  axios
    .put(`${API_BASE}/Orders/${id}`, order, { headers: authHeaders(token) })
    .then((r) => r.data as Order);
export const deleteOrder = async (id: string, token?: string | null) =>
  axios
    .delete(`${API_BASE}/Orders/${id}`, { headers: authHeaders(token) })
    .then((r) => r.data);

/* ==========================
   PAYMENT APIs
========================== */
export const processPayment = async (
  payment: PaymentRequest,
  token?: string | null
) =>
  axios
    .post(`${API_BASE}/payments/process`, payment, {
      headers: authHeaders(token),
    })
    .then((r) => r.data);
export const refundPayment = async (paymentId: string, token?: string | null) =>
  axios
    .post(
      `${API_BASE}/payments/refund`,
      { paymentId },
      { headers: authHeaders(token) }
    )
    .then((r) => r.data);

/* ==========================
   STORAGE APIs
========================== */
export const uploadImage = async (
  file: Blob,
  filename: string,
  token?: string | null
) => {
  const formData = new FormData();
  formData.append("file", file, filename);
  const res = await axios.post(`${API_BASE}/storage/image`, formData, {
    headers: { ...authHeaders(token), "Content-Type": "multipart/form-data" },
  });
  return res.data as { url: string };
};

export const uploadFile = async (
  file: Blob,
  filename: string,
  token?: string | null
) => {
  const formData = new FormData();
  formData.append("file", file, filename);
  const res = await axios.post(`${API_BASE}/storage/file`, formData, {
    headers: { ...authHeaders(token), "Content-Type": "multipart/form-data" },
  });
  return res.data as { url: string };
};

export const deleteFile = async (url: string, token?: string | null) =>
  axios
    .delete(`${API_BASE}/storage`, {
      data: { url },
      headers: authHeaders(token),
    })
    .then((r) => r.data as { success: boolean });
