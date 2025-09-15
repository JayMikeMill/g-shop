import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

export const processPayment = async (payment: any) => {
  const res = await axios.post(`${API_BASE}/payments`, payment);
  return res.data;
};

export const refundPayment = async (paymentId: string) => {
  const res = await axios.post(`${API_BASE}/payments/refund`, { paymentId });
  return res.data;
};