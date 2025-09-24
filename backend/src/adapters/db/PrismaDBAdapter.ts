// src/crud/ProductCRUD.ts
import { PrismaClient } from "@prisma/client";
import { PrismaCRUDAdapter } from "./CRUD/PrismaCRUDAdapter";

import type {
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTagPreset,
  ProductVariant,
} from "@shared/types/Product";

import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { User } from "@shared/types/User";
import { DBAdapter } from "./DBAdapter";

export class PrismaDBAdapter implements DBAdapter {
  public products: ProductCRUD;
  public productTagsPresets: ProductTagPresetCRUD;
  public productReviews: ProductReviewCRUD;
  public productVariants: ProductVariantCRUD;
  public productOptionsPresets: ProductOptionPresetCRUD;
  public categories: CategoryCRUD;
  public collections: CollectionCRUD;
  public orders: OrderCRUD;
  public users: UserCRUD;

  constructor(prismaClient: PrismaClient = new PrismaClient()) {
    this.products = new ProductCRUD(prismaClient);
    this.productTagsPresets = new ProductTagPresetCRUD(prismaClient);
    this.productReviews = new ProductReviewCRUD(prismaClient);
    this.productVariants = new ProductVariantCRUD(prismaClient);
    this.productOptionsPresets = new ProductOptionPresetCRUD(prismaClient);
    this.categories = new CategoryCRUD(prismaClient);
    this.collections = new CollectionCRUD(prismaClient);
    this.orders = new OrderCRUD(prismaClient);
    this.users = new UserCRUD(prismaClient);
  }
}

class ProductCRUD extends PrismaCRUDAdapter<Product> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "product",

      fields: {
        images: { type: "upsertNested" },
        tags: { type: "upsertNested" },
        options: { type: "upsertNested" },
        variants: { type: "upsertNested" },
        //dimensions: { type: "upsert" },
        categories: { type: "set" },
        collections: { type: "set" },
        reviews: { type: "createNested" },
      },

      include: {
        images: true,
        options: true,
        tags: true,
        //dimensions: true,
        categories: true,
        collections: true,
        variants: true,
        reviews: true,
      },
    });
  }
}

class ProductOptionPresetCRUD extends PrismaCRUDAdapter<ProductOptionsPreset> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productOptionsPreset",
      fields: {
        options: { type: "upsertNested" },
      },
      include: { options: true },
    });
  }
}

class ProductTagPresetCRUD extends PrismaCRUDAdapter<ProductTagPreset> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "productTagPreset" });
  }
}

class ProductVariantCRUD extends PrismaCRUDAdapter<ProductVariant> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "productVariant" });
  }
}

class ProductReviewCRUD extends PrismaCRUDAdapter<ProductReview> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "productReview" });
  }
}

class CategoryCRUD extends PrismaCRUDAdapter<Category> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "category" });
  }
}

class CollectionCRUD extends PrismaCRUDAdapter<Collection> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "collection",
      include: { images: true },
      fields: {
        images: { type: "upsertNested" }, // assuming collections have nested images
      },
    });
  }
}

class OrderCRUD extends PrismaCRUDAdapter<Order> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "order",
      include: {
        transaction: true,
        items: true,
        invoices: true,
        statusHistory: true,
      },
      fields: {
        items: { type: "upsertNested" },
        transaction: { type: "upsertNested" },
        invoices: { type: "upsertNested" },
        statusHistory: { type: "upsertNested" },
      },
    });
  }
}

class UserCRUD extends PrismaCRUDAdapter<User> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "user" });
  }
}
