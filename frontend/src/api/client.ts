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
