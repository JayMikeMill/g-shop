// src/crud/GenericCRUD.ts

/**
 * GENERIC ATOMIC NESTED CRUD HELPER
 *
 * Fully generic create/update/delete helper for Prisma models,
 * with support for nested relations of any depth.
 */

import { PrismaClient } from "@prisma/client";

// Shared utilities and types
import {
  isQueryObject,
  type CrudInterface,
  type QueryObject,
} from "@shared/types";

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
    // -------------------- NO QUERY: return all --------------------
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

    // -------------------- Partial (Single) --------------------
    if (!isQueryObject(query)) {
      const partialQuery = query as Partial<T>;
      const where: any = {};

      for (const key in partialQuery) {
        const val = (partialQuery as any)[key];
        if (val === undefined) continue;
        where[key] = val;
      }

      // If 'id' is provided, use findUnique
      if ((partialQuery as any).id) {
        return await this.client.findUnique({
          where: { id: (partialQuery as any).id },
          include: this.baseInclude,
        });
      }

      // Otherwise, use findFirst
      return await this.client.findFirst({
        where,
        include: this.baseInclude,
      });
    }

    // -------------------- QueryObject (Multiple) --------------------
    const queryObj: QueryObject<T> = (query as QueryObject<T>) ?? {};
    const queryParams = buildPrismaQuery(
      queryObj,
      this.includeFieldsCfg,
      this.searchFields || []
    );

    let data: T[], total: number;

    if (this.isTx) {
      data = await this.client.findMany(queryParams);
      total = await this.client.count({ where: queryParams.where });
    } else {
      [data, total] = await this.prisma.$transaction([
        this.client.findMany(queryParams),
        this.client.count({ where: queryParams.where }),
      ]);
    }

    return { data, total };
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

    const existing = await this.get({ id } as any);
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
    const existing = await this.get({ id } as any);
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
