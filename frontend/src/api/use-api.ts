import { useAuth } from "@contexts/auth-context";
import type { User } from "@models/user";
import * as api from "@api/backend-api";
import type { Product } from "@models/product";
import type { PaymentData } from "@models/payment-data"; // Add this import, adjust the path if needed


export function useApi() {
  const { token } = useAuth();

  return {
    // Auth
    register: (payload: any) => api.register(payload),
    login: (payload: any) => api.login(payload),
    verifyToken: () => token ? api.verifyToken(token) : Promise.reject("No token"),
    logout: () => token ? api.logout(token) : Promise.reject("No token"),

    // Payment
    processPayment: (payment: PaymentData) => api.processPayment(payment, token),
    refundPayment: (paymentId: string) => api.refundPayment(paymentId, token),

    // Storage
    uploadImage: (file: string | Buffer, filename: string) => api.uploadImage(file, filename, token),
    uploadFile: (file: string | Buffer, filename: string, contentType?: string) => api.uploadFile(file, filename, contentType, token),
    deleteFile: (url: string) => api.deleteFile(url, token),

    // User
    createUser: (user: User, password?: string) => api.createUser(user, password, token),
    getUser: (id: string) => api.getUser(id, token),
    getUsers: (options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }) => api.getUsers(options, token),
    updateUser: (id: string, user: User) => api.updateUser(id, user, token),
    deleteUser: (id: string) => api.deleteUser(id, token),

    // Product
    createProduct: (product: Product) => api.createProduct(product, token),
    getProduct: (id: string) => api.getProduct(id, token),
    getProducts: (options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }) => api.getProducts(options, token),
    updateProduct: (id: string, product: Product) => api.updateProduct(id, product, token),
    deleteProduct: (id: string) => api.deleteProduct(id, token),

    // Order
    createOrder: (order: any) => api.createOrder(order, token),
    getOrder: (id: string) => api.getOrder(id, token),
    getOrders: (options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }) => api.getOrders(options, token),
    updateOrder: (id: string, order: any) => api.updateOrder(id, order, token),
    deleteOrder: (id: string) => api.deleteOrder(id, token),
  };
}
