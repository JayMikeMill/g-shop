// backend/src/adapters/db/FirebaseAdapter.ts
import { FirebaseCRUDAdapter } from "./CRUD/FireBaseCRUDAdapter";
import { CRUDAdapter } from "./CRUD/CRUDAdapter";

import { User } from "@shared/types/User";
import {
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTag,
  ProductTagPreset,
  ProductVariant,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import type { DBAdapter } from "./DBAdapter";

export class FirebaseDBAdapter implements DBAdapter {
  public users: CRUDAdapter<User>;
  public products: CRUDAdapter<Product>;
  public productTagsPresets: CRUDAdapter<ProductTagPreset>;
  public productReviews: CRUDAdapter<ProductReview>;
  public productVariants: CRUDAdapter<ProductVariant>;
  public productOptionsPresets: CRUDAdapter<ProductOptionsPreset>;
  public categories: CRUDAdapter<Category>;
  public collections: CRUDAdapter<Collection>;
  public orders: CRUDAdapter<Order>;

  constructor() {
    this.users = new FirebaseCRUDAdapter<User>("users");
    this.products = new FirebaseCRUDAdapter<Product>("products");
    this.productTagsPresets = new FirebaseCRUDAdapter<ProductTag>("tags");
    this.productReviews = new FirebaseCRUDAdapter<ProductReview>(
      "product_reviews"
    );
    this.productVariants = new FirebaseCRUDAdapter<ProductVariant>(
      "product_variants"
    );
    this.productOptionsPresets = new FirebaseCRUDAdapter<ProductOptionsPreset>(
      "product_options_presets"
    );
    this.categories = new FirebaseCRUDAdapter<Category>("categories");
    this.collections = new FirebaseCRUDAdapter<Collection>("collections");
    this.orders = new FirebaseCRUDAdapter<Order>("orders");
  }
}
