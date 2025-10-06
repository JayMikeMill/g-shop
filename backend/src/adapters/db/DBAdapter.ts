import {
  CrudInterface,
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTagPreset,
  Category,
  Collection,
  Order,
  User,
} from "@my-store/shared";

export interface DBAdapter {
  products: CrudInterface<Product>;
  productTagsPresets: CrudInterface<ProductTagPreset>;
  productOptionsPresets: CrudInterface<ProductOptionsPreset>;
  productReviews: CrudInterface<ProductReview>;

  categories: CrudInterface<Category>;
  collections: CrudInterface<Collection>;
  orders: CrudInterface<Order>;
  users: CrudInterface<User>;
}
