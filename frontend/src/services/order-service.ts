import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

export const getAllOrders = async (limit: number, cursor?: string) => {
  const res = await axios.get(`${API_BASE}/orders`, { params: { limit, cursor } });
  return res.data;
};

export const createOrder = async (order: any) => {
  const res = await axios.post(`${API_BASE}/orders`, order);
  return res.data;
};

export const getOrder = async (id: string) => {
  const res = await axios.get(`${API_BASE}/orders/${id}`);
  return res.data;
};

export const updateOrder = async (id: string, order: any) => {
  const res = await axios.put(`${API_BASE}/orders/${id}`, order);
  return res.data;
};

export const deleteOrder = async (id: string) => {
  const res = await axios.delete(`${API_BASE}/orders/${id}`);
  return res.data;
};