// src/crud/ProductCRUD.ts
import { PrismaClient } from "@prisma/client";
import type {
  Product,
  ProductOptionPreset,
  ProductTagPreset,
  ProductVariant,
  ProductReview,
} from "@shared/types/product";
import {
  QueryOptions,
  queryOptionsToPrisma,
} from "@shared/types/query-options";

const prisma = new PrismaClient();

// Common include object for all product queries
const PRODUCT_INCLUDE = {
  images: true,
  options: { include: { values: true } },
  tags: true,
  dimensions: true,
  categories: true,
  collections: true,
  variants: true,
  reviews: true,
};

function toPrismaProduct(product: Product) {
  const { reviews, ...rest } = product;
  return {
    ...rest,
    images: product.images?.length
      ? { create: product.images.map(({ id, ...img }) => img) }
      : undefined,
    options: product.options?.length
      ? {
          create: product.options.map((opt) => ({
            name: opt.name,
            values: opt.values?.length
              ? { create: opt.values.map(({ id, ...val }) => val) }
              : undefined,
          })),
        }
      : undefined,
    variants: product.variants?.length
      ? {
          create: product.variants.map(({ id, ...v }) => v),
        }
      : undefined,
    tags: product.tags?.length
      ? { create: product.tags.map(({ id, ...tag }) => tag) }
      : undefined,
    dimensions: product.dimensions
      ? { create: (({ id, ...d }) => d)(product.dimensions) }
      : undefined,
    categories: product.categories?.length
      ? { connect: product.categories.map((c) => ({ id: c.id })) }
      : undefined,
    collections: product.collections?.length
      ? { connect: product.collections.map((c) => ({ id: c.id })) }
      : undefined,
  };
}

// Map Prisma product to Product type, converting nulls to undefined and fixing nested types
function toProduct(prismaProduct: any): Product {
  return {
    ...prismaProduct,
    dimensions: prismaProduct.dimensions
      ? {
          ...prismaProduct.dimensions,
          weightGrams: prismaProduct.dimensions.weightGrams ?? undefined,
          lengthCm: prismaProduct.dimensions.lengthCm ?? undefined,
          widthCm: prismaProduct.dimensions.widthCm ?? undefined,
          heightCm: prismaProduct.dimensions.heightCm ?? undefined,
        }
      : undefined,
    categories:
      prismaProduct.categories?.map((c: any) => ({
        ...c,
        description: c.description ?? undefined,
      })) ?? [],
    collections:
      prismaProduct.collections?.map((c: any) => ({
        ...c,
        description: c.description ?? undefined,
      })) ?? [],
    tags:
      prismaProduct.tags?.map((t: any) => ({
        ...t,
        color: t.color ?? undefined,
      })) ?? [],
  };
}

export class ProductCRUD {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient = prisma) {
    this.prisma = prismaClient;
  }

  // ---------------- PRODUCTS ----------------
  async create(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: toPrismaProduct(product),
      include: PRODUCT_INCLUDE,
    });
    return toProduct(created);
  }

  async get(id: string): Promise<Product | null> {
    const found = await this.prisma.product.findUnique({
      where: { id },
      include: PRODUCT_INCLUDE,
    });
    return found ? toProduct(found) : null;
  }

  async getAll(query?: QueryOptions): Promise<Product[]> {
    const prismaQuery = queryOptionsToPrisma(query);
    const products = await this.prisma.product.findMany({
      ...prismaQuery,
      include: PRODUCT_INCLUDE,
    });
    return products.map((p) => toProduct(p));
  }

  async update(id: string, update: Partial<Product>): Promise<Product> {
    const updated = await this.prisma.product.update({
      where: { id },
      data: toPrismaProduct(update as Product),
      include: PRODUCT_INCLUDE,
    });
    return toProduct(updated);
  }

  async delete(id: string): Promise<Product> {
    const deleted = await this.prisma.product.delete({
      where: { id },
      include: PRODUCT_INCLUDE,
    });
    return toProduct(deleted);
  }

  // ---------------- PRODUCT OPTION PRESETS ----------------
  async createOptionPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset> {
    const { id, values, ...rest } = preset;
    return this.prisma.productOptionPreset.create({
      data: {
        ...rest,
        values: values?.length
          ? { create: values.map(({ id, ...v }) => v) }
          : undefined,
      },
      include: { values: true },
    });
  }

  async getOptionPresets(): Promise<ProductOptionPreset[]> {
    return this.prisma.productOptionPreset.findMany({
      include: { values: true },
    });
  }

  async updateOptionPreset(
    id: string,
    update: Partial<ProductOptionPreset>
  ): Promise<ProductOptionPreset> {
    const { id: _id, values, ...rest } = update;
    return this.prisma.productOptionPreset.update({
      where: { id },
      data: {
        ...rest,
        values: values?.length
          ? { create: values.map(({ id, ...v }) => v) }
          : undefined,
      },
      include: { values: true },
    });
  }

  async deleteOptionPreset(id: string): Promise<void> {
    await this.prisma.productOptionPreset.delete({ where: { id } });
  }

  // ---------------- PRODUCT TAG PRESETS ----------------
  async createTag(tag: ProductTagPreset): Promise<ProductTagPreset> {
    const { id, ...rest } = tag;
    const created = await this.prisma.productTagPreset.create({ data: rest });
    return { ...created, color: created.color ?? undefined };
  }

  async getTag(id: string): Promise<ProductTagPreset | null> {
    const found = await this.prisma.productTagPreset.findUnique({
      where: { id },
    });
    return found ? { ...found, color: found.color ?? undefined } : null;
  }

  async getTags(query: QueryOptions | undefined): Promise<ProductTagPreset[]> {
    const tags = await this.prisma.productTagPreset.findMany();
    return tags.map((t) => ({ ...t, color: t.color ?? undefined }));
  }

  async updateTag(
    id: string,
    update: Partial<ProductTagPreset>
  ): Promise<ProductTagPreset> {
    // Exclude 'id' from update object
    const { id: _id, ...updateData } = update;
    const updated = await this.prisma.productTagPreset.update({
      where: { id },
      data: updateData,
    });
    return { ...updated, color: updated.color ?? undefined };
  }

  async deleteTag(id: string): Promise<ProductTagPreset> {
    const deleted = await this.prisma.productTagPreset.delete({
      where: { id },
    });
    return { ...deleted, color: deleted.color ?? undefined };
  }

  // ---------------- PRODUCT REVIEWS ----------------
  async getReviews(productId: string): Promise<ProductReview[]> {
    return this.prisma.productReview.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });
  }

  async createReview(
    productId: string,
    review: { userId: string; rating: number; comment: string }
  ): Promise<ProductReview> {
    return this.prisma.productReview.create({
      data: {
        productId,
        ...review,
      },
    });
  }

  async deleteReview(id: string): Promise<ProductReview> {
    return this.prisma.productReview.delete({ where: { id } });
  }

  // ---------------- PRODUCT VARIANTS ----------------
  async getVariants(productId: string): Promise<ProductVariant[]> {
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
    });
    return variants.map((v) => ({
      ...v,
      sku: v.sku ?? undefined,
      priceOverride: v.priceOverride ?? undefined,
    }));
  }
}
