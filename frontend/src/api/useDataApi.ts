import { useCrudApi } from "./useCrudApi";

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
} from "shared/types";

export function useDataApi() {
  return {
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
  };
}
