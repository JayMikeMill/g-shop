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
} from "shared/types";
import { FieldConfigDefaults } from "./ModelMetadata";
import { features } from "process";

//==================================================
// CRUD Configuration
//==================================================
const { owned, manyToMany, json, include, search } = FieldConfigDefaults;

export const CrudProps = {
  // Core user/auth
  users: {
    model: "user",
    fieldMeta: { email: { search }, settings: { json } },
  },
  // Catalog & Products
  categories: {
    model: "category",
    fieldMeta: {
      name: { search },
      description: { search },
      images: { owned, include },
      products: { manyToMany },
    },
  },
  collections: {
    model: "collection",
    fieldMeta: {
      name: { search },
      description: { search },
      images: { owned, include },
      products: { manyToMany },
    },
  },
  products: {
    model: "product",
    fieldMeta: {
      id: { search },
      name: { search },
      materials: { json },
      features: { json },
      description: { search },
      images: { owned, include },
      tags: { owned, include },
      options: { owned, include },
      variants: { owned, include },
      dimensions: { owned, include },
      shipDimensions: { owned, include },
      categories: { manyToMany, include },
      collections: { manyToMany, include },
      reviews: { owned, include },
    },
  },
  productVariants: {
    model: "productVariant",
    fieldMeta: { id: { search }, options: { json } },
  },
  productOptionsPresets: {
    model: "productOptionsPreset",
    fieldMeta: { name: { search }, options: { json } },
  },
  productTagsPresets: {
    model: "productTagPreset",
    fieldMeta: { name: { search } },
  },
  productReviews: { model: "productReview" },
  // Commerce
  orders: {
    model: "order",
    fieldMeta: {
      id: { search },
      userId: { search },
      statusHistory: { json },
      shippingInfo: { owned, include },
      "shippingInfo.address": { owned, include },
      items: { owned, include },
      "items.product": { json },
      "items.variant": { json },
      transaction: { owned, include },
      "transaction.billingAddress": { owned, include },
      "transaction.gatewayResponse": { json },
      invoices: { owned, include },
    },
  },
  // System / Configuration
  systemSettings: {
    model: "systemSettings",
    fieldMeta: { scope: { search }, settings: { json } },
  },
} as const;

//==================================================
// Types
//==================================================
type CrudPropsType = typeof CrudProps;

type AdapterMap = {
  users: PrismaCrudAdapter<User>;
  categories: PrismaCrudAdapter<Category>;
  collections: PrismaCrudAdapter<Collection>;
  products: PrismaCrudAdapter<Product>;
  productVariants: PrismaCrudAdapter<ProductVariant>;
  productOptionsPresets: PrismaCrudAdapter<ProductOptionsPreset>;
  productTagsPresets: PrismaCrudAdapter<ProductTagPreset>;
  productReviews: PrismaCrudAdapter<ProductReview>;
  orders: PrismaCrudAdapter<Order>;
  systemSettings: PrismaCrudAdapter<SystemSettings>;
};

//==================================================
// Adapters Factory
//==================================================
export const createAdapters = (
  prismaClient: PrismaClient,
  isTx?: boolean
): AdapterMap => {
  const result = {} as AdapterMap;

  for (const key of Object.keys(CrudProps) as Array<keyof CrudPropsType>) {
    result[key] = new PrismaCrudAdapter(prismaClient, {
      ...CrudProps[key],
      isTx,
    }) as any;
  }

  return result;
};
