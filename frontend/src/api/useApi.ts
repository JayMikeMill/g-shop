// useApi.ts
import { post, del } from "./client";
import { useCrudApi } from "./useCrudApi"; // <- generic wrapper

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
} from "@my-store/shared";

// Hook
export function useApi() {
  return {
    auth: {
      register: (payload: any) => post(`/auth/register`, payload),
      login: (payload: any) => post(`/auth/login`, payload),
    },

    // CRUD resources
    users: useCrudApi<User>("users"),
    products: useCrudApi<Product>("products"),
    productOptionsPresets: useCrudApi<ProductOptionsPreset>(
      "products/options-presets"
    ),
    productTagsPresets: useCrudApi<ProductTagPreset>("products/tags-presets"),
    productVariants: useCrudApi<ProductVariant>("products/variants"),
    productReviews: useCrudApi<ProductReview>("products/reviews"),
    collections: useCrudApi<Collection>("catalog/collections"),
    categories: useCrudApi<Category>("catalog/categories"),
    orders: useCrudApi<Order>("orders"),

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

    // ... add more as needed
    login: (email: string, password: string) =>
      post(`/auth/login`, { email, password }),
    logout: () => post(`/auth/logout`),
    register: (user: User, password: string): Promise<User | null> =>
      post(`/auth/register`, { user, password }),
  };
}
