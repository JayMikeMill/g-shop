// src/crud/ProductCRUD.ts
import { PrismaClient } from "@prisma/client";
import { PrismaCRUDAdapter } from "./CRUD/PrismaCRUDAdapter";

import type {
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTagPreset,
  Category,
  Collection,
  Order,
  User,
} from "@my-store/shared";

import { DBAdapter } from "./DBAdapter";

export class PrismaDBAdapter implements DBAdapter {
  public products: ProductCRUD;
  public productTagsPresets: ProductTagPresetCRUD;
  public productOptionsPresets: ProductOptionPresetCRUD;
  public productReviews: ProductReviewCRUD;

  public categories: CategoryCRUD;
  public collections: CollectionCRUD;
  public orders: OrderCRUD;
  public users: UserCRUD;

  constructor(prismaClient: PrismaClient = new PrismaClient()) {
    this.products = new ProductCRUD(prismaClient);
    this.productTagsPresets = new ProductTagPresetCRUD(prismaClient);
    this.productOptionsPresets = new ProductOptionPresetCRUD(prismaClient);
    this.productReviews = new ProductReviewCRUD(prismaClient);

    this.categories = new CategoryCRUD(prismaClient);
    this.collections = new CollectionCRUD(prismaClient);
    this.orders = new OrderCRUD(prismaClient);
    this.users = new UserCRUD(prismaClient);
  }
}

// ----------------- CRUD Adapters -----------------

class ProductCRUD extends PrismaCRUDAdapter<Product> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "product",

      includeFields: {
        images: true,
        tags: true,
        options: true,
        variants: true,
        dimensions: true,
        categories: true,
        collections: true,
        reviews: true,
      },

      nestedMeta: {
        images: { owned: true },
        tags: { owned: true },
        options: { owned: true },
        variants: { owned: true },
        dimensions: { owned: true },
        categories: { manyToMany: true },
        collections: { manyToMany: true },
        reviews: { owned: true },
      },

      searchFields: ["id", "name", "description"],
    });
  }
}

class ProductTagPresetCRUD extends PrismaCRUDAdapter<ProductTagPreset> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productTagPreset",
      searchFields: ["name"],
    });
  }
}

class ProductOptionPresetCRUD extends PrismaCRUDAdapter<ProductOptionsPreset> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productOptionsPreset",
      searchFields: ["name"],
    });
  }
}

class ProductReviewCRUD extends PrismaCRUDAdapter<ProductReview> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productReview",
    });
  }
}

class CategoryCRUD extends PrismaCRUDAdapter<Category> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "category",
      searchFields: ["name", "description"],
    });
  }
}

class CollectionCRUD extends PrismaCRUDAdapter<Collection> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "collection",
      searchFields: ["name", "description"],
    });
  }
}

class OrderCRUD extends PrismaCRUDAdapter<Order> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "order",
      includeFields: {
        items: true,
        invoices: true,
        statusHistory: true,
      },
      nestedMeta: {
        items: { owned: true },
        invoices: { owned: true },
        statusHistory: { owned: true },
      },
      searchFields: ["id", "userId"],
    });
  }
}

class UserCRUD extends PrismaCRUDAdapter<User> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "user",
      searchFields: ["email"],
    });
  }
}
