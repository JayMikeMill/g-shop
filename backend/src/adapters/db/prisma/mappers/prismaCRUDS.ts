// src/crud/ProductCRUD.ts
import { PrismaClient } from "@prisma/client";
import { PrismaCRUD, FieldMetadata } from "./prismaCRUD";

import type {
  Product,
  ProductOption,
  ProductOptionsPreset,
  ProductReview,
  ProductTag,
  ProductVariant,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { User } from "@shared/types/User";

export class PrismaCRUDS {
  public products: ProductCRUD;
  public productTags: ProductTagPresetCRUD;
  public productReviews: ProductReviewCRUD;
  public productVariants: ProductVariantCRUD;
  public productOptionsPresets: ProductOptionPresetCRUD;
  public categories: CategoryCRUD;
  public collections: CollectionCRUD;
  public orders: OrderCRUD;
  public users: UserCRUD;

  constructor(prismaClient: PrismaClient) {
    this.products = new ProductCRUD(prismaClient);
    this.productTags = new ProductTagPresetCRUD(prismaClient);
    this.productReviews = new ProductReviewCRUD(prismaClient);
    this.productVariants = new ProductVariantCRUD(prismaClient);
    this.productOptionsPresets = new ProductOptionPresetCRUD(prismaClient);
    this.categories = new CategoryCRUD(prismaClient);
    this.collections = new CollectionCRUD(prismaClient);
    this.orders = new OrderCRUD(prismaClient);
    this.users = new UserCRUD(prismaClient);
  }
}

class ProductCRUD extends PrismaCRUD<Product> {
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

class ProductTagPresetCRUD extends PrismaCRUD<ProductTag> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "productTagPreset" });
  }
}

class ProductReviewCRUD extends PrismaCRUD<ProductReview> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "productReview" });
  }
}

class ProductVariantCRUD extends PrismaCRUD<ProductVariant> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "productVariant" });
  }
}

class ProductOptionPresetCRUD extends PrismaCRUD<ProductOptionsPreset> {
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

class CategoryCRUD extends PrismaCRUD<Category> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "category" });
  }
}

class CollectionCRUD extends PrismaCRUD<Collection> {
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

class OrderCRUD extends PrismaCRUD<Order> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "order" });
  }
}

class UserCRUD extends PrismaCRUD<User> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, { model: "user" });
  }
}
