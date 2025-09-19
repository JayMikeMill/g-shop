import { useAuth } from "@contexts/auth/auth-context";
import type { User } from "@models/user";
import * as api from "@api/backend-api";
import type { Product, Category } from "@models/product";
import type { PaymentData } from "@models/payment-data"; // Add this import, adjust the path if needed
import type { Order } from "@models/order";
import type { QueryOptions } from "@models/query-options";

export function useApi() {
  const { token } = useAuth();

  return {
    // Auth
    register: (payload: any) => api.register(payload),
    login: (payload: any) => api.login(payload),
    verifyToken: () =>
      token ? api.verifyToken(token) : Promise.reject("No token"),
    logout: () => (token ? api.logout(token) : Promise.reject("No token")),

    // Payment
    processPayment: (payment: PaymentData) =>
      api.processPayment(payment, token),
    refundPayment: (paymentId: string) => api.refundPayment(paymentId, token),

    // Storage
    uploadImage: (file: Blob, filename: string) =>
      api.uploadImage(file, filename, token),
    // Optionally update uploadFile to use FormData as well if you want to support generic files
    uploadFile: (file: Blob, filename: string) =>
      api.uploadFile(file, filename, token),
    deleteFile: (url: string) => api.deleteFile(url, token),

    // User
    createUser: (user: User, password?: string) =>
      api.createUser(user, password, token),
    getUser: (id: string) => api.getUser(id, token),
    getUsers: (options?: {
      limit?: number;
      page?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }) => api.getUsers(options, token),
    updateUser: (id: string, user: User) => api.updateUser(id, user, token),
    deleteUser: (id: string) => api.deleteUser(id, token),

    // Product
    createProduct: (product: Product) => api.createProduct(product, token),
    getProduct: (id: number | string) => api.getProduct(id, token),
    getProducts: (query?: QueryOptions) => api.getProducts(query, token),
    updateProduct: (product: Product) => api.updateProduct(product, token),
    deleteProduct: (id: number | string) => api.deleteProduct(id, token),

    // Product Options Presets
    createProductOptionsPreset: (preset: any) =>
      api.createProductOptionsPreset(preset, token),
    getProductOptionsPresets: () => api.getProductOptionsPresets(token),
    deleteProductOptionsPreset: (id: number | string) =>
      api.deleteProductOptionsPreset(id, token),

    // Categories
    createCategory: (category: Category) => api.createCategory(category, token),
    getCategory: (id: string) => api.getCategory(id, token),
    getCategories: () => api.getCategories(token),
    updateCategory: (id: string, category: Partial<Category>) =>
      api.updateCategory(id, category, token),
    deleteCategory: (id: string) => api.deleteCategory(id, token),

    // Order
    createOrder: (order: Order) => api.createOrder(order, token),
    getOrder: (id: string) => api.getOrder(id, token),
    getOrders: (options?: {
      limit?: number;
      page?: number;
      sortBy?: string;
      sortOrder?: "asc" | "desc";
    }) => api.getOrders(options, token),
    updateOrder: (id: string, order: Order) =>
      api.updateOrder(id, order, token),
    deleteOrder: (id: string) => api.deleteOrder(id, token),
  };
}
