// useApi.ts
import { useAuth } from "@features/auth/useAuth";
import { apiClient, setAuthToken, post, del } from "./client";
import { useCRUD } from "./useCRUD"; // <- generic wrapper

import type {
  Product,
  ProductOptionsPreset,
  ProductTagPreset,
  ProductVariant,
  ProductReview,
  Collection,
  Category,
  Order,
  User,
} from "@shared/types";

// Standalone function (outside the hook)
export async function verifyToken(token: string) {
  const r = await apiClient.get("/auth/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return r.data;
}

// Hook
export function useApi() {
  const { token } = useAuth();

  setAuthToken(token);

  return {
    auth: {
      register: (payload: any) => post(`/auth/register`, payload),
      login: (payload: any) => post(`/auth/login`, payload),
    },

    // CRUD resources
    users: useCRUD<User>("users"),
    products: useCRUD<Product>("products"),
    productOptionsPresets: useCRUD<ProductOptionsPreset>(
      "products/options-presets"
    ),
    productTagsPresets: useCRUD<ProductTagPreset>("products/tags-presets"),
    productVariants: useCRUD<ProductVariant>("products/variants"),
    productReviews: useCRUD<ProductReview>("products/reviews"),
    collections: useCRUD<Collection>("catalog/collections"),
    categories: useCRUD<Category>("catalog/categories"),
    orders: useCRUD<Order>("orders"),

    // file uploads
    uploadImage: (file: Blob, filename: string) => {
      const form = new FormData();
      form.append("file", file, filename);
      return post<{ url: string }>(`/storage/image`, form);
    },
    uploadFile: (file: Blob, filename: string) => {
      const form = new FormData();
      form.append("file", file, filename);
      return post<{ url: string }>(`/storage/file`, form);
    },
    deleteFile: (url: string) => del<{ success: boolean }>(`/storage`, { url }),

    // custom endpoints
    processPayment: (payment: any) => post(`/payments/process`, payment),
    refundPayment: (paymentId: string) =>
      post(`/payments/refund`, { paymentId }),
  };
}
