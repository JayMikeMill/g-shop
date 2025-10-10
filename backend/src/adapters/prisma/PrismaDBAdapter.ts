// src/crud/ProductCrud.ts
import { PrismaClient } from "@prisma/client";

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
  SystemSettings,
} from "@shared/types";

import { DBAdapter } from "@adapters/types";
import { PrismaCrudAdapter } from "./PrismaCrudAdapter";

export class PrismaDBAdapter implements DBAdapter {
  private prisma: PrismaClient;
  public isTx?: boolean = false;

  public products: ProductCrud;
  public productVariants: ProductVariantCrud;
  public productTagsPresets: ProductTagPresetCrud;
  public productOptionsPresets: ProductOptionPresetCrud;
  public productReviews: ProductReviewCrud;

  public categories: CategoryCrud;
  public collections: CollectionCrud;
  public orders: OrderCrud;
  public users: UserCrud;

  public systemSettings: SystemSettingsCrud;

  constructor(prismaClient: PrismaClient = new PrismaClient(), isTx?: boolean) {
    this.prisma = prismaClient;
    this.isTx = isTx ?? false;

    this.products = new ProductCrud(prismaClient, isTx);
    this.productVariants = new ProductVariantCrud(prismaClient, isTx);
    this.productTagsPresets = new ProductTagPresetCrud(prismaClient, isTx);
    this.productOptionsPresets = new ProductOptionPresetCrud(
      prismaClient,
      isTx
    );
    this.productReviews = new ProductReviewCrud(prismaClient, isTx);
    this.categories = new CategoryCrud(prismaClient, isTx);
    this.collections = new CollectionCrud(prismaClient, isTx);
    this.orders = new OrderCrud(prismaClient, isTx);
    this.users = new UserCrud(prismaClient, isTx);
    this.systemSettings = new SystemSettingsCrud(prismaClient, isTx);
  }

  /**
   * Execute multiple DB operations atomically within a single transaction.
   */
  async transaction<T>(
    callback: (tx: PrismaDBAdapter) => Promise<T>
  ): Promise<T> {
    return await this.prisma.$transaction(async (txClient: unknown) => {
      // Explicit cast: txClient behaves like PrismaClient for all query operations
      const txAdapter = new PrismaDBAdapter(
        txClient as unknown as PrismaClient,
        true
      );
      return await callback(txAdapter);
    });
  }
}

// ----------------- Crud Adapters -----------------

class UserCrud extends PrismaCrudAdapter<User> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "user",
      searchFields: ["email"],
      isTx,
    });
  }
}

class ProductCrud extends PrismaCrudAdapter<Product> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "product",

      // CHANGED: dot-notation array
      includeFields: [
        "images",
        "tags",
        "options",
        "variants",
        "dimensions",
        "categories",
        "collections",
        "reviews",
      ],

      // CHANGED: dot-notation keys
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
      isTx,
    });
  }
}

class ProductVariantCrud extends PrismaCrudAdapter<ProductVariant> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "productVariant",
      searchFields: ["id"],
      isTx,
    });
  }
}

class ProductTagPresetCrud extends PrismaCrudAdapter<ProductTagPreset> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "productTagPreset",
      searchFields: ["name"],
      isTx,
    });
  }
}

class ProductOptionPresetCrud extends PrismaCrudAdapter<ProductOptionsPreset> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "productOptionsPreset",
      searchFields: ["name"],
      isTx,
    });
  }
}

class ProductReviewCrud extends PrismaCrudAdapter<ProductReview> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "productReview",
      isTx,
    });
  }
}

class CategoryCrud extends PrismaCrudAdapter<Category> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "category",
      searchFields: ["name", "description"],
      isTx,
    });
  }
}

class CollectionCrud extends PrismaCrudAdapter<Collection> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "collection",
      searchFields: ["name", "description"],
      isTx,
    });
  }
}

class OrderCrud extends PrismaCrudAdapter<Order> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "order",

      // CHANGED: dot-notation array
      includeFields: [
        "transaction",
        "transaction.billingAddress",
        "shippingInfo",
        "shippingInfo.address",
        "items",
        "statusHistory",
        "invoices",
      ],

      // CHANGED: dot-notation keys
      nestedMeta: {
        transaction: { owned: true },
        "transaction.billingAddress": { owned: true },
        shippingInfo: { owned: true },
        "shippingInfo.address": { owned: true },
        items: { owned: true },
        statusHistory: { owned: true },
        invoices: { owned: true },
      },

      searchFields: ["id", "userId"],
      isTx,
    });
  }
}

class SystemSettingsCrud extends PrismaCrudAdapter<SystemSettings> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, {
      model: "systemSettings",
      searchFields: ["scope"],
      isTx,
    });
  }
}
