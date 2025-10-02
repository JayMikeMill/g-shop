// frontend/src/api/client.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: API_BASE,
});

// attach token dynamically
export function setAuthToken(token?: string | null) {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
}

// Generic helpers
export const get = async <T>(url: string, params?: any): Promise<T> => {
  const r = await apiClient.get<T>(url, { params });
  return r.data;
};

export const post = async <T>(url: string, data?: any): Promise<T> => {
  const r = await apiClient.post<T>(url, data);
  return r.data;
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  const r = await apiClient.put<T>(url, data);
  return r.data;
};

export const del = async <T>(url: string, data?: any): Promise<T> => {
  const r = await apiClient.delete<T>(url, { data });
  return r.data;
};
