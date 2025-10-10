// src/crud/GenericCRUD.ts

/**
 * GENERIC ATOMIC NESTED CRUD HELPER
 *
 * Fully generic create/update/delete helper for Prisma models,
 * with support for nested relations of any depth.
 */

import { PrismaClient } from "@prisma/client";

import type { CrudInterface } from "@shared/interfaces";

// Shared utilities and types
import { isQueryObject, type QueryType, type QueryObject } from "@shared/types";

// Utility to convert nested data into Prisma create/update shape
import {
  prismaNestedUpdate,
  NestedMetadata,
  DotNestedMetadata, // ADDED
} from "./prismaNestedUpdate";

// Utility to build Prisma queries from QueryObject
import { buildPrismaQuery, normalizeIncludeConfig } from "./buildPrismaQuery";

// ----------------- Helper: Remove empty arrays for Prisma -----------------
function removeEmptyArrays(obj: any): any {
  if (!obj || typeof obj !== "object") return obj;
  const copy: any = {};
  for (const key in obj) {
    const val = obj[key];
    if (Array.isArray(val) && val.length === 0) continue;
    copy[key] = val;
  }
  return copy;
}

// ----------------- PrismaCRUDAdapter -----------------
export interface PrismaCRUDAdapterOptions<T> {
  // The Prisma model name, e.g. 'user' (must match a model in your PrismaClient)
  model: keyof PrismaClient;
  // Accept dot-notation include paths or a map of path -> { select/include }
  includeFields?: string[] | Record<string, any>;
  // Fields to search in full-text search queries
  searchFields?: (keyof T)[];
  // Accept nested field metadata with dot-notation keys
  nestedMeta?: NestedMetadata<T> | DotNestedMetadata; // CHANGED
  isTx?: boolean;
}

export class PrismaCrudAdapter<T> implements CrudInterface<T> {
  private prisma: PrismaClient;

  private model: keyof PrismaClient;
  private includeFieldsCfg?: string[] | Record<string, any>;
  private searchFields?: (keyof T)[];
  private nestedMeta?: NestedMetadata<T> | DotNestedMetadata; // CHANGED
  private isTx: boolean;

  constructor(prisma: PrismaClient, opts: PrismaCRUDAdapterOptions<T>) {
    this.prisma = prisma;
    this.model = opts.model;
    this.includeFieldsCfg = opts.includeFields;
    this.searchFields = opts.searchFields;
    this.nestedMeta = opts.nestedMeta; // can be dot-notation
    this.isTx = opts.isTx ?? false;
  }

  private get client() {
    return this.prisma[this.model] as any;
  }

  // Expand dot-notation include config into Prisma include shape
  private get baseInclude() {
    return normalizeIncludeConfig(this.includeFieldsCfg);
  }

  private async toPrisma(
    data: Partial<T>,
    action: "create" | "update" | "increment",
    existing?: T
  ) {
    if (existing && (action === "update" || action === "increment")) {
      return prismaNestedUpdate(existing, data, this.nestedMeta as any, action);
    }
    const created = prismaNestedUpdate(
      null,
      data,
      this.nestedMeta as any,
      "create"
    );
    return removeEmptyArrays(created);
  }

  // -------------------- CRUD --------------------
  async create(data: Partial<T>): Promise<T> {
    const prismaData = await this.toPrisma(data, "create");
    const created = await this.client.create({
      data: prismaData,
      include: this.baseInclude,
    });
    return created;
  }

  // -------------------- GET ONE --------------------
  async getOne(query: QueryType<T>): Promise<T | null> {
    const where: any = {};

    // If query has id, use findUnique
    if ("id" in query && query.id) {
      return this.client.findUnique({
        where: { id: query.id },
        include: this.baseInclude,
      });
    }

    // Otherwise, build where for findFirst
    for (const key in query) {
      const val = (query as any)[key];
      if (val !== undefined) where[key] = val;
    }

    return this.client.findFirst({
      where,
      include: this.baseInclude,
    });
  }

  // -------------------- GET MANY --------------------
  async getMany(
    query?: QueryType<T>
  ): Promise<{ data: T[]; total: number } | null> {
    // No query: return all
    if (!query) {
      const [data, total] = this.isTx
        ? await this.prisma.$transaction([
            this.client.findMany({ include: this.baseInclude }),
            this.client.count(),
          ])
        : await Promise.all([
            this.client.findMany({ include: this.baseInclude }),
            this.client.count(),
          ]);

      return { data, total };
    }

    // If QueryObject, use buildPrismaQuery
    if (isQueryObject(query)) {
      const queryParams = buildPrismaQuery(
        query as QueryObject<T>,
        this.includeFieldsCfg,
        this.searchFields || []
      );
      const [data, total] = this.isTx
        ? await this.prisma.$transaction([
            this.client.findMany(queryParams),
            this.client.count({ where: queryParams.where }),
          ])
        : await Promise.all([
            this.client.findMany(queryParams),
            this.client.count({ where: queryParams.where }),
          ]);

      return { data, total };
    }

    // Otherwise, Partial<T>
    const where: any = {};
    for (const key in query) {
      const val = (query as any)[key];
      if (val !== undefined) where[key] = val;
    }

    const data = await this.client.findMany({
      where,
      include: this.baseInclude,
    });
    return { data, total: data.length };
  }

  async update(
    updates: Partial<T> & { id?: string },
    options?: { increment: boolean }
  ): Promise<T> {
    if (!updates.id) throw new Error("Document id is required for update");

    const { id, ...rest } = updates;
    const restData = rest as Partial<T>;

    if (options?.increment) {
      return this.increment(id, restData);
    }

    const existing = await this.getOne({ id } as any);
    if (!existing) throw new Error("Document not found");

    const prismaData = await this.toPrisma(restData, "update", existing);

    const updated = await this.client.update({
      where: { id },
      data: prismaData,
      include: this.baseInclude,
    });

    return updated;
  }

  async increment(id: string, updates: Partial<T>): Promise<T> {
    const existing = await this.getOne({ id } as any);
    if (!existing) throw new Error("Document not found");

    const prismaData = await this.toPrisma(updates, "increment", existing);

    const updated = await this.client.update({
      where: { id },
      data: prismaData,
      include: this.baseInclude,
    });

    return updated;
  }

  async delete(id: string): Promise<T> {
    return await this.client.delete({
      where: { id },
      include: this.baseInclude,
    });
  }
}
