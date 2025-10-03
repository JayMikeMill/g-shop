// src/crud/GenericCRUD.ts
import { PrismaClient } from "@prisma/client";
import type { CRUDInterface, QueryObject } from "@shared/types";

type NestedType = "upsertNested" | "createNested" | "set" | "upsert";

interface NestedFieldOptions {
  type: NestedType;
  path?: string; // nested path for nested inside nested
}

export type FieldMetadata<T> = Partial<Record<keyof T, NestedFieldOptions>>;

// ---------------- Nested Helpers ----------------
function stripIdsRecursively(obj: any): any {
  if (obj && typeof obj === "object") {
    if (Array.isArray(obj)) {
      return obj.map(stripIdsRecursively);
    } else {
      for (const key in obj) {
        if (key === "id" || key.endsWith("Id")) delete obj[key];
        else obj[key] = stripIdsRecursively(obj[key]);
      }
    }
  }
  return obj;
}

function createNested<T extends object>(items?: T[]) {
  if (!items?.length) return undefined;
  return {
    create: items.map((item) => {
      const copy = { ...item };
      stripIdsRecursively(copy);
      return copy;
    }),
  };
}

function replaceNested<T extends object>(items?: T[], path?: string) {
  const result: any = { deleteMany: {} };
  if (items?.length) {
    result.create = items.map((item) => {
      const copy: any = { ...item };
      stripIdsRecursively(copy);
      if (path && copy[path]) copy[path] = createNested(copy[path]);
      return copy;
    });
  }
  return result;
}

// ---------------- CRUD Class ----------------
export interface PrismaCRUDAdpaterOptions<T> {
  model: keyof PrismaClient;
  includeFields?: any;
  nestedFields?: FieldMetadata<T>;
  searchFields?: (keyof T)[];
}

export class PrismaCRUDAdapter<T> implements CRUDInterface<T> {
  private prisma: PrismaClient;
  private model: keyof PrismaClient;
  private includeFields?: any;
  private nestedFields?: FieldMetadata<T>;
  private searchFields?: (keyof T)[];

  constructor(prisma: PrismaClient, opts: PrismaCRUDAdpaterOptions<T>) {
    this.prisma = prisma;
    this.model = opts.model;
    this.includeFields = opts.includeFields ?? {};
    this.nestedFields = opts.nestedFields ?? {};
    this.searchFields = opts.searchFields;
  }

  private get client() {
    return this.prisma[this.model] as any;
  }

  private toPrisma(data: Partial<T>, action: "create" | "update") {
    if (!this.nestedFields) return data;
    const result: any = { ...data };

    for (const key in this.nestedFields) {
      const value = data[key as keyof T];
      if (value === undefined || value === null) {
        result[key] = null;
        continue;
      }
      if (Array.isArray(value) && !value.length) {
        delete result[key];
        continue;
      }

      let { type, path } = this.nestedFields[key as keyof T]!;

      if (action === "create" && type === "upsertNested") type = "createNested";

      switch (type) {
        case "createNested":
          result[key] = createNested(value as any[]);
          break;
        case "upsertNested":
          result[key] = replaceNested(value as any[], path);
          break;
        case "set":
          if (Array.isArray(value) && value.length) {
            result[key] = {
              set: (value as any[]).map((i: any) => ({ id: i.id })),
            };
          } else delete result[key];
          break;
      }
    }

    return result;
  }

  private fromPrisma(data: any) {
    if (!this.nestedFields) return data;
    const result: any = { ...data };

    for (const key in this.nestedFields) {
      const value = data[key];
      if (value === undefined || value === null) continue;

      const { type, path } = this.nestedFields[key as keyof T]!;

      switch (type) {
        case "upsertNested":
        case "createNested":
          result[key] =
            value.map?.((item: any) => {
              if (path && item[path]?.create) item[path] = item[path].create;
              return item;
            }) ?? [];
          break;
        case "set":
          result[key] = value ?? [];
          break;
        case "upsert":
          result[key] = value ?? undefined;
          break;
      }
    }

    return result;
  }

  // -------------------- CRUD --------------------
  async create(data: Partial<T>): Promise<T> {
    const created = await this.client.create({
      data: this.toPrisma(data, "create"),
      include: this.includeFields,
    });
    return this.fromPrisma(created);
  }

  async getOne(id: string): Promise<T | null> {
    const found = await this.client.findUnique({
      where: { id },
      include: this.includeFields,
    });
    return found ? this.fromPrisma(found) : null;
  }

  async getAll(query?: QueryObject): Promise<{ data: T[]; total: number }> {
    const prismaQuery = queryOptionsToPrisma({
      ...query,
      searchFields: query?.searchFields?.length
        ? query.searchFields.map((f) => String(f))
        : (this.searchFields ?? []).map((f) => String(f)),
    });
    const where = (prismaQuery as any).where ?? {};
    const [results, total] = await this.prisma.$transaction([
      this.client.findMany({ ...prismaQuery, include: this.includeFields }),
      this.client.count({ where }),
    ]);
    return { data: results.map(this.fromPrisma.bind(this)), total };
  }

  async update(updates: Partial<T> & { id?: string }): Promise<T> {
    if (!updates.id) throw new Error("Document id is required for update");

    // make a copy and strip IDs before passing to Prisma
    const { id, ...rest } = updates;
    const cleaned = stripIdsRecursively({ ...rest });

    const updated = await this.client.update({
      where: { id },
      data: this.toPrisma(cleaned, "update"),
      include: this.includeFields,
    });

    return this.fromPrisma(updated);
  }

  async delete(id: string): Promise<T> {
    const deleted = await this.client.delete({
      where: { id },
      include: this.includeFields,
    });
    return this.fromPrisma(deleted);
  }
}

// ----------------- Nested search helpers -----------------
function buildNestedWhere(parts: string[], search: string): any {
  const [head, ...rest] = parts;

  if (rest.length === 0) {
    // last field, simple contains
    return { [head]: { contains: search } };
  }

  // assume relation is array, use 'some'
  return { [head]: { some: buildNestedWhere(rest, search) } };
}

export function queryOptionsToPrisma(query?: QueryObject) {
  let where: any = {};
  const orderBy: any = {};
  let take: number | undefined;
  let skip: number | undefined;

  // Conditions
  if (query?.conditions?.length) {
    for (const cond of query.conditions) {
      switch (cond.operator) {
        case "=":
          where[cond.field] = cond.value;
          break;
        case "!=":
          where[cond.field] = { not: cond.value };
          break;
        case "<":
          where[cond.field] = { lt: cond.value };
          break;
        case "<=":
          where[cond.field] = { lte: cond.value };
          break;
        case ">":
          where[cond.field] = { gt: cond.value };
          break;
        case ">=":
          where[cond.field] = { gte: cond.value };
          break;
      }
    }
  }

  // Nested / dotted search
  if (
    query?.search &&
    Array.isArray(query.searchFields) &&
    query.searchFields.length
  ) {
    const search = query.search;
    where.OR = query.searchFields
      .filter((f) => typeof f === "string")
      .map((field) => {
        const parts = (field as string).split(".");
        return buildNestedWhere(parts, search);
      });
  }

  // Sorting
  if (query?.sortBy)
    orderBy[query.sortBy] = query.sortOrder === "desc" ? "desc" : "asc";

  // Pagination
  if (query?.limit) {
    take = query.limit;
    skip = query.page && query.page > 1 ? query.limit * (query.page - 1) : 0;
  }

  return {
    where: Object.keys(where).length ? where : undefined,
    orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    take,
    skip,
  };
}
