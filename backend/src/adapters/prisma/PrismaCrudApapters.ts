import { PrismaClient } from "@prisma/client";
import { PrismaCrudAdapter, PrismaCRUDAdapterProps } from "./PrismaCrudAdapter";

import type {
  User,
  Category,
  Collection,
  Product,
  ProductVariant,
  ProductOptionsPreset,
  ProductTagPreset,
  ProductReview,
  Order,
  SystemSettings,
} from "@shared/types";

//==================================================
// CRUD Configuration
//==================================================

const CrudProps: CrudPropsType = {
  // ========================================
  // Core user/auth
  // ========================================
  users: {
    model: "user",
    nestedMeta: { settings: { json: true } },
    searchFields: ["email"],
  },

  // ========================================
  // Catalog & Products
  // ========================================
  categories: {
    model: "category",
    includeFields: ["images"],
    nestedMeta: { images: { owned: true } },
    searchFields: ["name", "description"],
  },

  collections: {
    model: "collection",
    includeFields: ["images"],
    nestedMeta: { images: { owned: true } },
    searchFields: ["name", "description"],
  },

  products: {
    model: "product",
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
  },

  productVariants: {
    model: "productVariant",
    nestedMeta: { options: { json: true } },
    searchFields: ["id"],
  },

  productOptionsPresets: {
    model: "productOptionsPreset",
    nestedMeta: { options: { json: true } },
    searchFields: ["name"],
  },

  productTagsPresets: {
    model: "productTagPreset",
    searchFields: ["name"],
  },

  productReviews: {
    model: "productReview",
  },

  // ========================================
  // Commerce
  // ========================================
  orders: {
    model: "order",
    includeFields: [
      "transaction",
      "transaction.billingAddress",
      "shippingInfo",
      "shippingInfo.address",
      "items",
      "statusHistory",
      "invoices",
    ],
    nestedMeta: {
      shippingInfo: { owned: true },
      "shippingInfo.address": { owned: true },
      items: { owned: true },
      "items.product": { json: true },
      "items.variant": { json: true },
      transaction: { owned: true },
      "transaction.billingAddress": { owned: true },
      "transaction.gatewayResponse": { json: true },
      statusHistory: { owned: true },
      invoices: { owned: true },
    },
    searchFields: ["id", "userId"],
  },

  // ========================================
  // System / Configuration
  // ========================================
  systemSettings: {
    model: "systemSettings",
    nestedMeta: { settings: { json: true } },
    searchFields: ["scope"],
  },
};

//==================================================
// Types
//==================================================

type CrudPropsType = {
  users: PrismaCRUDAdapterProps<User>;
  categories: PrismaCRUDAdapterProps<Category>;
  collections: PrismaCRUDAdapterProps<Collection>;
  products: PrismaCRUDAdapterProps<Product>;
  productVariants: PrismaCRUDAdapterProps<ProductVariant>;
  productOptionsPresets: PrismaCRUDAdapterProps<ProductOptionsPreset>;
  productTagsPresets: PrismaCRUDAdapterProps<ProductTagPreset>;
  productReviews: PrismaCRUDAdapterProps<ProductReview>;
  orders: PrismaCRUDAdapterProps<Order>;
  systemSettings: PrismaCRUDAdapterProps<SystemSettings>;
};

//==================================================
// ----------------- Crud Adapters -----------------
//==================================================

// ---------- Core user/auth ----------
class UserCrud extends PrismaCrudAdapter<User> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.users, isTx });
  }
}

// ---------- Catalog & Products ----------
class CategoryCrud extends PrismaCrudAdapter<Category> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.categories, isTx });
  }
}

class CollectionCrud extends PrismaCrudAdapter<Collection> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.collections, isTx });
  }
}

class ProductCrud extends PrismaCrudAdapter<Product> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.products, isTx });
  }
}

class ProductVariantCrud extends PrismaCrudAdapter<ProductVariant> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productVariants, isTx });
  }
}

class ProductOptionPresetCrud extends PrismaCrudAdapter<ProductOptionsPreset> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productOptionsPresets, isTx });
  }
}

class ProductTagPresetCrud extends PrismaCrudAdapter<ProductTagPreset> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productTagsPresets, isTx });
  }
}

class ProductReviewCrud extends PrismaCrudAdapter<ProductReview> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productReviews, isTx });
  }
}

// ---------- Commerce ----------
class OrderCrud extends PrismaCrudAdapter<Order> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.orders, isTx });
  }
}

// ---------- System / Configuration ----------
class SystemSettingsCrud extends PrismaCrudAdapter<SystemSettings> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.systemSettings, isTx });
  }
}

//==================================================
// Exports
//==================================================

export {
  // Core user/auth
  UserCrud,

  // Catalog & Products
  CategoryCrud,
  CollectionCrud,
  ProductCrud,
  ProductVariantCrud,
  ProductOptionPresetCrud,
  ProductTagPresetCrud,
  ProductReviewCrud,

  // Commerce
  OrderCrud,

  // System / Configuration
  SystemSettingsCrud,
};
