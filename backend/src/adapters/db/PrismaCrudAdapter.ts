// src/crud/GenericCRUD.ts

/**
 * GENERIC ATOMIC NESTED CRUD HELPER
 *
 * Fully generic create/update/delete helper for Prisma models,
 * with support for nested relations of any depth.
 */

import { PrismaClient } from "@prisma/client";

import {
  isQueryObject,
  type CrudInterface,
  type QueryObject,
} from "@my-store/shared";

import { prismaNestedUpdate, NestedMetadata } from "./prismaNestedUpdate";

import { buildPrismaQuery } from "./buildPrismaQuery";

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
  model: keyof PrismaClient;
  includeFields?: any;
  searchFields?: (keyof T)[];
  nestedMeta?: NestedMetadata<T>;
}

export class PrismaCrudAdapter<T> implements CrudInterface<T> {
  private prisma: PrismaClient;
  private model: keyof PrismaClient;
  private includeFields?: any;
  private searchFields?: (keyof T)[];
  private nestedMeta?: NestedMetadata<T>;

  constructor(prisma: PrismaClient, opts: PrismaCRUDAdapterOptions<T>) {
    this.prisma = prisma;
    this.model = opts.model;
    this.includeFields = opts.includeFields ?? {};
    this.searchFields = opts.searchFields;
    this.nestedMeta = opts.nestedMeta;
  }

  private get client() {
    return this.prisma[this.model] as any;
  }

  private async toPrisma(
    data: Partial<T>,
    action: "create" | "update",
    existing?: T
  ) {
    if (existing && action === "update") {
      return prismaNestedUpdate(existing, data, this.nestedMeta, "update");
    }
    const created = prismaNestedUpdate(null, data, this.nestedMeta, "create");
    return removeEmptyArrays(created);
  }

  // -------------------- CRUD --------------------
  async create(data: Partial<T>): Promise<T> {
    const prismaData = await this.toPrisma(data, "create");
    const created = await this.client.create({
      data: prismaData,
      include: this.includeFields,
    });
    return created;
  }

  // Overloads
  // If called with an id or specific query, return a single item or null
  async get(query: Partial<T>): Promise<T | null>;

  // If called with a general query, return multiple items with total count
  async get(
    query?: QueryObject<T>
  ): Promise<{ data: T[]; total: number } | null>;

  // -------------------- Implementation --------------------
  async get(
    query?: Partial<T> | QueryObject<T>
  ): Promise<T | { data: T[]; total: number } | null> {
    // -------------------- Partial (Single) --------------------
    if (query && !isQueryObject(query)) {
      const partialQuery = query as Partial<T>;
      const where: any = {};

      for (const key in partialQuery) {
        const val = partialQuery[key];
        if (val === undefined) continue;
        where[key] = val;
      }

      // If 'id' is provided, use findUnique
      if ((partialQuery as any).id) {
        return await this.client.findUnique({
          where: { id: (partialQuery as any).id },
          include: this.includeFields,
        });
      }

      // Otherwise, use findFirst
      return await this.client.findFirst({
        where,
        include: this.includeFields,
      });
    }

    // -------------------- QueryObject (Multiple) --------------------
    const queryObj: QueryObject<T> = (query as QueryObject<T>) ?? {};
    const queryParams = buildPrismaQuery(
      queryObj,
      this.includeFields,
      this.searchFields || []
    );

    // Execute
    const [data, total] = await this.prisma.$transaction([
      this.client.findMany(queryParams),
      this.client.count({ where: queryParams.where }),
    ]);

    return { data, total };
  }

  async update(updates: Partial<T> & { id?: string }): Promise<T> {
    if (!updates.id) throw new Error("Document id is required for update");

    const existing = await this.get({ id: updates.id } as any);
    if (!existing) throw new Error("Document not found");

    const { id, ...rest } = updates;
    const prismaData = await this.toPrisma(
      rest as Partial<T>,
      "update",
      existing
    );

    const updated = await this.client.update({
      where: { id },
      data: prismaData,
      include: this.includeFields,
    });
    return updated;
  }

  async delete(id: string): Promise<T> {
    return await this.client.delete({
      where: { id },
      include: this.includeFields,
    });
  }
}
