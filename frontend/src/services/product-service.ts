import axios from "axios";
const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api/v1";

// Fetch products with pagination support
export const getAllProducts = async (limit: number, cursor?: string) => {
  // cursor is used for pagination (e.g., last product's id)
  const res = await axios.get(`${API_BASE}/products`, {
    params: { limit, cursor }
  });
  return res.data;
};

export const createProduct = async (product: any) => {
  const res = await axios.post(`${API_BASE}/products`, product);
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};

export const updateProduct = async (id: string, product: any) => {
  const res = await axios.put(`${API_BASE}/products/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/products/${id}`);
  return res.data;
};