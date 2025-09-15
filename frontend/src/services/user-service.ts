import axios from "axios";
const API_BASE = import.meta.env.VITE_APP_API_URL || "http://localhost:5000/api/v1";

export const getAllUsers = async (limit: number, cursor?: string) => {
  const res = await axios.get(`${API_BASE}/users`, { params: { limit, cursor } });
  return res.data;
};

export const createUser = async (user: any) => {
  const res = await axios.post(`${API_BASE}/users`, user);
  return res.data;
};

export const getUser = async (id: string) => {
  const res = await axios.get(`${API_BASE}/users/${id}`);
  return res.data;
};

export const updateUser = async (id: string, user: any) => {
  const res = await axios.put(`${API_BASE}/users/${id}`, user);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/users/${id}`);
  return res.data;
};