import { PrismaClient } from "@prisma/client";
import { DBAdapter } from "@adapters/types";
import { createAdapters } from "./PrismaCrudApapters";

import { DatabaseDomainKeys } from "shared/interfaces";

//==================================================
// PrismaDBAdapter
//==================================================

export class PrismaDBAdapter implements DBAdapter {
  private prisma: PrismaClient;
  public isTx?: boolean = false;

  // Explicitly declare CRUD properties for type safety and autocompletion
  products: any;
  productVariants: any;
  productTagsPresets: any;
  productOptionsPresets: any;
  productReviews: any;
  categories: any;
  collections: any;
  orders: any;
  users: any;
  systemSettings: any;

  constructor(prismaClient: PrismaClient = new PrismaClient(), isTx?: boolean) {
    this.prisma = prismaClient;
    this.isTx = isTx ?? false;
    const allAdapters = createAdapters(this.prisma, this.isTx);
    for (const domain of DatabaseDomainKeys) {
      (this as any)[domain] = allAdapters[domain];
    }
  }

  /**
   * Execute multiple DB operations atomically within a single transaction.
   */
  async transaction<T>(callback: (tx: DBAdapter) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(
      async (txClient: unknown) => {
        const txAdapter = new PrismaDBAdapter(
          txClient as unknown as PrismaClient,
          true
        );
        return await callback(txAdapter);
      },
      { timeout: 20000 }
    );
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Simple read operation to check connectivity
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error("Prisma health check failed:", error);
      return false;
    }
  }
}
