import { CRUDAdapter } from "./CRUD/CRUDAdapter";

import {
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTagPreset,
  ProductVariant,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { User } from "@shared/types/User";

export interface DBAdapter {
  products: CRUDAdapter<Product>;
  productOptionsPresets: CRUDAdapter<ProductOptionsPreset>;
  productTagsPresets: CRUDAdapter<ProductTagPreset>;
  productVariants: CRUDAdapter<ProductVariant>;
  productReviews: CRUDAdapter<ProductReview>;

  categories: CRUDAdapter<Category>;
  collections: CRUDAdapter<Collection>;
  orders: CRUDAdapter<Order>;
  users: CRUDAdapter<User>;
}
