import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

export const register = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/auth/register`, payload);
  return res.data;
};

export const login = async (payload: any) => {
  const res = await axios.post(`${API_BASE}/auth/login`, payload);
  return res.data;
};

export const verifyToken = async (token: string) => {
  const res = await axios.get(`${API_BASE}/auth/verify-token`, {
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