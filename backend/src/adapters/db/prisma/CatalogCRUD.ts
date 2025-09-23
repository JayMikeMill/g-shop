import { PrismaClient } from "@prisma/client";
import type { Category, Collection } from "@shared/types/Catalog";
import { QueryObject, queryOptionsToPrisma } from "@shared/types/QueryObject";

export class CatalogCRUD {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  // -------------------- Categories --------------------
  async createCategory(category: Category): Promise<Category> {
    const { id, ...rest } = category;
    const created = await this.prisma.category.create({
      data: { id, ...rest },
    });
    return this.toCategory(created);
  }

  async getCategory(id: string): Promise<Category | null> {
    const found = await this.prisma.category.findUnique({ where: { id } });
    return found ? this.toCategory(found) : null;
  }

  async getCategories(query?: QueryObject): Promise<Category[]> {
    const prismaQuery = queryOptionsToPrisma(query);
    const found = await this.prisma.category.findMany({ ...prismaQuery });
    return found.map(this.toCategory);
  }

  async updateCategory(
    id: string,
    updates: Partial<Category>
  ): Promise<Category | null> {
    const updated = await this.prisma.category.update({
      where: { id },
      data: this.toCollectionUpdateInput(updates),
    });
    return this.toCategory(updated);
  }

  async deleteCategory(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  // -------------------- Collections --------------------
  async createCollection(collection: Collection): Promise<Collection> {
    const { id, images, ...rest } = collection;
    const data: any = { id, ...rest };
    if (images) {
      data.images = { create: images };
    }
    const created = await this.prisma.collection.create({
      data,
    });
    return this.toCollection(created);
  }

  async getCollection(id: string): Promise<Collection | null> {
    const found = await this.prisma.collection.findUnique({ where: { id } });
    return found ? this.toCollection(found) : null;
  }

  async getCollections(query?: QueryObject): Promise<Collection[]> {
    const prismaQuery = queryOptionsToPrisma(query);
    const found = await this.prisma.collection.findMany({ ...prismaQuery });
    return found.map(this.toCollection);
  }

  async updateCollection(
    id: string,
    updates: Partial<Collection>
  ): Promise<Collection | null> {
    const updated = await this.prisma.collection.update({
      where: { id },
      data: this.toCollectionUpdateInput(updates),
    });
    return this.toCollection(updated);
  }

  async deleteCollection(id: string): Promise<void> {
    await this.prisma.collection.delete({ where: { id } });
  }

  // ----------- Mapping helpers -----------
  private toCollectionUpdateInput(updates: Partial<Collection>): any {
    const { images, ...rest } = updates;
    const data: any = { ...rest };
    if (images !== undefined) {
      data.images = {
        // Adjust this logic as needed for your schema
        update: images,
      };
    }
    return data;
  }

  private toCategory(prismaCategory: any): Category {
    return {
      ...prismaCategory,
      description: prismaCategory.description ?? undefined,
      imageUrl: prismaCategory.imageUrl ?? undefined,
      parentId: prismaCategory.parentId ?? undefined,
    };
  }

  private toCollection(prismaCollection: any): Collection {
    return {
      ...prismaCollection,
      description: prismaCollection.description ?? undefined,
      imageUrl: prismaCollection.imageUrl ?? undefined,
      parentId: prismaCollection.parentId ?? undefined,
    };
  }
}
