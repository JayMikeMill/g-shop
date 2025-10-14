import { PrismaClient } from "@prisma/client";
import { PrismaCrudAdapter, PrismaCRUDAdapterProps } from "./PrismaCrudAdapter";

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

const CrudProps: CrudPropsType = {
  // ========================================
  // Product
  // ========================================
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

  // ========================================
  // PRoduct Variants, Tags & Options
  // ========================================
  productVariants: {
    model: "productVariant",
    nestedMeta: { options: { json: true } },
    searchFields: ["id"],
  },

  productTagsPresets: {
    model: "productTagPreset",
    searchFields: ["name"],
  },

  productOptionsPresets: {
    model: "productOptionsPreset",
    nestedMeta: { options: { json: true } },
    searchFields: ["name"],
  },

  // ========================================
  // Product Reviews
  // ========================================
  productReviews: {
    model: "productReview",
  },

  // ========================================
  // Categories & Collections
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

  // ========================================
  // Orders
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
  // Orders
  // ========================================
  users: {
    model: "user",
    nestedMeta: { settings: { json: true } },
    searchFields: ["email"],
  },

  // ========================================
  // System Settings
  // ========================================
  systemSettings: {
    model: "systemSettings",
    nestedMeta: { settings: { json: true } },
    searchFields: ["scope"],
  },
};

type CrudPropsType = {
  products: PrismaCRUDAdapterProps<Product>;
  productVariants: PrismaCRUDAdapterProps<ProductVariant>;
  productTagsPresets: PrismaCRUDAdapterProps<ProductTagPreset>;
  productOptionsPresets: PrismaCRUDAdapterProps<ProductOptionsPreset>;
  productReviews: PrismaCRUDAdapterProps<ProductReview>;
  categories: PrismaCRUDAdapterProps<Category>;
  collections: PrismaCRUDAdapterProps<Collection>;
  orders: PrismaCRUDAdapterProps<Order>;
  users: PrismaCRUDAdapterProps<User>;
  systemSettings: PrismaCRUDAdapterProps<SystemSettings>;
};

//==================================================
// ----------------- Crud Adapters -----------------
//==================================================

class UserCrud extends PrismaCrudAdapter<User> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.users, isTx });
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

class ProductTagPresetCrud extends PrismaCrudAdapter<ProductTagPreset> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productTagsPresets, isTx });
  }
}

class ProductOptionPresetCrud extends PrismaCrudAdapter<ProductOptionsPreset> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productOptionsPresets, isTx });
  }
}

class ProductReviewCrud extends PrismaCrudAdapter<ProductReview> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.productReviews, isTx });
  }
}

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

class OrderCrud extends PrismaCrudAdapter<Order> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.orders, isTx });
  }
}

class SystemSettingsCrud extends PrismaCrudAdapter<SystemSettings> {
  constructor(prismaClient: PrismaClient, isTx?: boolean) {
    super(prismaClient, { ...CrudProps.systemSettings, isTx });
  }
}

export {
  UserCrud,
  ProductCrud,
  ProductVariantCrud,
  ProductTagPresetCrud,
  ProductOptionPresetCrud,
  ProductReviewCrud,
  CategoryCrud,
  CollectionCrud,
  OrderCrud,
  SystemSettingsCrud,
};
