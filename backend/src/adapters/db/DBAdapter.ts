import {
  CRUDInterface,
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
  products: CRUDInterface<Product>;
  productTagsPresets: CRUDInterface<ProductTagPreset>;
  productOptionsPresets: CRUDInterface<ProductOptionsPreset>;
  productReviews: CRUDInterface<ProductReview>;

  categories: CRUDInterface<Category>;
  collections: CRUDInterface<Collection>;
  orders: CRUDInterface<Order>;
  users: CRUDInterface<User>;
}
