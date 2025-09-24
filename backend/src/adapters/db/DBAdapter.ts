import { CRUDAdapter } from "./CRUD/CRUDAdapter";

import {
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTag,
  ProductVariant,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { User } from "@shared/types/User";

export interface DBAdapter {
  products: CRUDAdapter<Product>;
  productTags: CRUDAdapter<ProductTag>;
  productReviews: CRUDAdapter<ProductReview>;
  productVariants: CRUDAdapter<ProductVariant>;
  productOptionsPresets: CRUDAdapter<ProductOptionsPreset>;
  categories: CRUDAdapter<Category>;
  collections: CRUDAdapter<Collection>;
  orders: CRUDAdapter<Order>;
  users: CRUDAdapter<User>;
}
