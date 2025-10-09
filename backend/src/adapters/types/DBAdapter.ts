import { CrudInterface } from "@shared/interfaces";
import {
  Product,
  ProductVariant,
  ProductOptionsPreset,
  ProductReview,
  ProductTagPreset,
  Category,
  Collection,
  Order,
  User,
} from "@shared/types";

export interface DBAdapter {
  products: CrudInterface<Product>;
  productVariants: CrudInterface<ProductVariant>;
  productTagsPresets: CrudInterface<ProductTagPreset>;
  productOptionsPresets: CrudInterface<ProductOptionsPreset>;
  productReviews: CrudInterface<ProductReview>;

  categories: CrudInterface<Category>;
  collections: CrudInterface<Collection>;
  orders: CrudInterface<Order>;
  users: CrudInterface<User>;

  isTx?: boolean;
  transaction<T>(callback: (tx: DBAdapter) => Promise<T>): Promise<T>;
}
