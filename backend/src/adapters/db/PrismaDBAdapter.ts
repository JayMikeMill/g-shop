// src/crud/ProductCrud.ts
import { PrismaClient } from "@prisma/client";
import { PrismaCrudAdapter } from "./PrismaCrudAdapter";

import type {
  Product,
  ProductOptionsPreset,
  ProductReview,
  ProductTagPreset,
  Category,
  Collection,
  Order,
  User,
  ProductVariant,
} from "@my-store/shared";

import { DBAdapter } from "./DBAdapter";

export class PrismaDBAdapter implements DBAdapter {
  private prisma: PrismaClient;

  public products: ProductCrud;
  public productVariants: ProductVariantCrud;
  public productTagsPresets: ProductTagPresetCrud;
  public productOptionsPresets: ProductOptionPresetCrud;
  public productReviews: ProductReviewCrud;

  public categories: CategoryCrud;
  public collections: CollectionCrud;
  public orders: OrderCrud;
  public users: UserCrud;

  constructor(prismaClient: PrismaClient = new PrismaClient()) {
    this.prisma = prismaClient;

    this.products = new ProductCrud(prismaClient);
    this.productVariants = new ProductVariantCrud(prismaClient);
    this.productTagsPresets = new ProductTagPresetCrud(prismaClient);
    this.productOptionsPresets = new ProductOptionPresetCrud(prismaClient);
    this.productReviews = new ProductReviewCrud(prismaClient);

    this.categories = new CategoryCrud(prismaClient);
    this.collections = new CollectionCrud(prismaClient);
    this.orders = new OrderCrud(prismaClient);
    this.users = new UserCrud(prismaClient);
  }

  /**
   * Execute multiple DB operations atomically within a single transaction.
   */
  async transaction<T>(
    callback: (tx: PrismaDBAdapter) => Promise<T>
  ): Promise<T> {
    return await this.prisma.$transaction(async (txClient) => {
      // Explicit cast: txClient behaves like PrismaClient for all query operations
      const txAdapter = new PrismaDBAdapter(
        txClient as unknown as PrismaClient
      );
      return await callback(txAdapter);
    });
  }
}

// ----------------- Crud Adapters -----------------

class UserCrud extends PrismaCrudAdapter<User> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "user",
      searchFields: ["email"],
    });
  }
}

class ProductCrud extends PrismaCrudAdapter<Product> {
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

class ProductVariantCrud extends PrismaCrudAdapter<ProductVariant> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productVariant",
      searchFields: ["id"],
    });
  }
}

class ProductTagPresetCrud extends PrismaCrudAdapter<ProductTagPreset> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productTagPreset",
      searchFields: ["name"],
    });
  }
}

class ProductOptionPresetCrud extends PrismaCrudAdapter<ProductOptionsPreset> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productOptionsPreset",
      searchFields: ["name"],
    });
  }
}

class ProductReviewCrud extends PrismaCrudAdapter<ProductReview> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "productReview",
    });
  }
}

class CategoryCrud extends PrismaCrudAdapter<Category> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "category",
      searchFields: ["name", "description"],
    });
  }
}

class CollectionCrud extends PrismaCrudAdapter<Collection> {
  constructor(prismaClient: PrismaClient) {
    super(prismaClient, {
      model: "collection",
      searchFields: ["name", "description"],
    });
  }
}

class OrderCrud extends PrismaCrudAdapter<Order> {
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
