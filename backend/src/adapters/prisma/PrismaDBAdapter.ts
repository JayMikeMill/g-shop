// src/crud/ProductCrud.ts
import { PrismaClient } from "@prisma/client";

import {
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
} from "./PrismaCrudApapters";

import { DBAdapter } from "@adapters/types";

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

  constructor(prismaC: PrismaClient = new PrismaClient(), isTx?: boolean) {
    this.prisma = prismaC;
    this.isTx = isTx ?? false;

    // Initialize CRUD adapters
    this.products = new ProductCrud(prismaC, isTx);
    this.productVariants = new ProductVariantCrud(prismaC, isTx);
    this.productTagsPresets = new ProductTagPresetCrud(prismaC, isTx);
    this.productOptionsPresets = new ProductOptionPresetCrud(prismaC, isTx);
    this.productReviews = new ProductReviewCrud(prismaC, isTx);
    this.categories = new CategoryCrud(prismaC, isTx);
    this.collections = new CollectionCrud(prismaC, isTx);
    this.orders = new OrderCrud(prismaC, isTx);
    this.users = new UserCrud(prismaC, isTx);
    this.systemSettings = new SystemSettingsCrud(prismaC, isTx);
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
