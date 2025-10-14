//==================================================
// Imports
//==================================================

import { PrismaClient } from "@prisma/client";
import { DBAdapter } from "@adapters/types";

import {
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
} from "./PrismaCrudApapters";

//==================================================
// PrismaDBAdapter
//==================================================

export class PrismaDBAdapter implements DBAdapter {
  private prisma: PrismaClient;
  public isTx?: boolean = false;

  // ---------- Core user/auth ----------
  public users: UserCrud;

  // ---------- Catalog & Products ----------
  public categories: CategoryCrud;
  public collections: CollectionCrud;
  public products: ProductCrud;
  public productVariants: ProductVariantCrud;
  public productOptionsPresets: ProductOptionPresetCrud;
  public productTagsPresets: ProductTagPresetCrud;
  public productReviews: ProductReviewCrud;

  // ---------- Commerce ----------
  public orders: OrderCrud;

  // ---------- System / Configuration ----------
  public systemSettings: SystemSettingsCrud;

  constructor(prismaClient: PrismaClient = new PrismaClient(), isTx?: boolean) {
    this.prisma = prismaClient;
    this.isTx = isTx ?? false;

    // ---------- Core user/auth ----------
    this.users = new UserCrud(prismaClient, isTx);

    // ---------- Catalog & Products ----------
    this.categories = new CategoryCrud(prismaClient, isTx);
    this.collections = new CollectionCrud(prismaClient, isTx);
    this.products = new ProductCrud(prismaClient, isTx);
    this.productVariants = new ProductVariantCrud(prismaClient, isTx);
    this.productOptionsPresets = new ProductOptionPresetCrud(
      prismaClient,
      isTx
    );
    this.productTagsPresets = new ProductTagPresetCrud(prismaClient, isTx);
    this.productReviews = new ProductReviewCrud(prismaClient, isTx);

    // ---------- Commerce ----------
    this.orders = new OrderCrud(prismaClient, isTx);

    // ---------- System / Configuration ----------
    this.systemSettings = new SystemSettingsCrud(prismaClient, isTx);
  }

  /**
   * Execute multiple DB operations atomically within a single transaction.
   */
  async transaction<T>(
    callback: (tx: PrismaDBAdapter) => Promise<T>
  ): Promise<T> {
    return await this.prisma.$transaction(async (txClient: unknown) => {
      const txAdapter = new PrismaDBAdapter(
        txClient as unknown as PrismaClient,
        true
      );
      return await callback(txAdapter);
    });
  }
}
