import { CrudInterface } from "./CrudInterface";

// shared/databaseDomains.ts
export const DatabaseDomainKeys = [
  "products",
  "productVariants",
  "productTagsPresets",
  "productOptionsPresets",
  "productReviews",
  "categories",
  "collections",
  "orders",
  "users",
  "systemSettings",
] as const;

export type DatabaseDomain = (typeof DatabaseDomainKeys)[number];

export type DatabaseCrudMap = {
  [K in (typeof DatabaseDomainKeys)[number]]: CrudInterface<any>;
};
