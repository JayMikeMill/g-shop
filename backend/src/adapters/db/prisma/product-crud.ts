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
      data: toPrismaProduct(update as Product, true),
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
        values: values?.length ? { create: values.map((v) => v) } : undefined,
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
        values: values?.length ? { create: values.map((v) => v) } : undefined,
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

function toPrismaProduct(product: Product, isUpdate = false) {
  const prismaData: any = {
    name: product.name,
    price: product.price,
    description: product.description,
    discount: product.discount || null,
    stock: product.stock,
    reviewCount: product.reviewCount || 0,
    averageRating: product.averageRating || 0,
  };

  // --------------------
  // Images
  // --------------------
  if (product.images?.length) {
    prismaData.images = isUpdate
      ? {
          deleteMany: {},
          create: product.images.map(({ main, preview, thumbnail }) => ({
            main,
            preview,
            thumbnail,
          })),
        }
      : {
          create: product.images.map(({ main, preview, thumbnail }) => ({
            main,
            preview,
            thumbnail,
          })),
        };
  }

  // --------------------
  // Tags
  // --------------------
  if (product.tags?.length) {
    prismaData.tags = isUpdate
      ? {
          deleteMany: {},
          create: product.tags.map(({ name, color }) => ({ name, color })),
        }
      : {
          create: product.tags.map(({ name, color }) => ({ name, color })),
        };
  }

  // --------------------
  // Options
  // --------------------
  if (product.options?.length) {
    prismaData.options = isUpdate
      ? {
          deleteMany: {},
          create: product.options.map((o) => ({
            name: o.name,
            values: o.values?.length
              ? { create: o.values.map((v) => ({ value: v.value })) }
              : undefined,
          })),
        }
      : {
          create: product.options.map((o) => ({
            name: o.name,
            values: o.values?.length
              ? { create: o.values.map((v) => ({ value: v.value })) }
              : undefined,
          })),
        };
  }

  // --------------------
  // Variants
  // --------------------
  if (product.variants?.length) {
    prismaData.variants = isUpdate
      ? {
          deleteMany: {},
          create: product.variants.map((v) => ({
            sku: v.sku,
            priceOverride: v.priceOverride,
            stock: v.stock,
          })),
        }
      : {
          create: product.variants.map((v) => ({
            sku: v.sku,
            priceOverride: v.priceOverride,
            stock: v.stock,
          })),
        };
  }

  // --------------------
  // Dimensions
  // --------------------
  if (product.dimensions) {
    prismaData.dimensions = isUpdate
      ? {
          upsert: {
            create: { ...product.dimensions },
            update: { ...product.dimensions },
          },
        }
      : { create: { ...product.dimensions } };
  }

  // --------------------
  // Categories & Collections
  // --------------------
  if (product.categories?.length) {
    prismaData.categories = {
      set: product.categories.map((c) => ({ id: c.id })),
    };
  }

  if (product.collections?.length) {
    prismaData.collections = {
      set: product.collections.map((c) => ({ id: c.id })),
    };
  }

  return prismaData;
}

// Maps Prisma product back to frontend Product type
function toProduct(p: any): Product {
  return {
    ...p,
    images:
      p.images?.map((img: any) => ({
        main: img.main,
        preview: img.preview,
        thumbnail: img.thumbnail,
      })) ?? [],
    tags:
      p.tags?.map((t: any) => ({
        name: t.name,
        color: t.color ?? undefined,
      })) ?? [],
    options:
      p.options?.map((o: any) => ({
        name: o.name,
        values: o.values?.map((v: any) => ({ value: v.value })) ?? [],
      })) ?? [],
    variants:
      p.variants?.map((v: any) => ({
        sku: v.sku,
        priceOverride: v.priceOverride,
        stock: v.stock,
      })) ?? [],
    dimensions: p.dimensions
      ? {
          weight_grams: p.dimensions.weight_grams ?? undefined,
          length_cm: p.dimensions.length_cm ?? undefined,
          width_cm: p.dimensions.width_cm ?? undefined,
          height_cm: p.dimensions.height_cm ?? undefined,
        }
      : undefined,
    categories: p.categories ?? [],
    collections: p.collections ?? [],
    reviews: p.reviews ?? [],
  };
}
