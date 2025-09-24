// src/crud/GenericCRUD.ts
import { PrismaClient } from "@prisma/client";
import type { QueryObject } from "@shared/types/QueryObject";
import { queryOptionsToPrisma } from "@shared/types/QueryObject";

type NestedType = "upsertNested" | "createNested" | "set" | "upsert";

interface NestedFieldOptions {
  type: NestedType;
  path?: string; // nested path for nested inside nested
}

export type FieldMetadata<T> = Partial<Record<keyof T, NestedFieldOptions>>;

// ---------------- Nested Helpers ----------------
function upsertNested<T extends { id?: string }>(items?: T[]) {
  if (!items?.length) return undefined;
  return items.map(({ id, ...data }) => ({
    where: { id: id ?? "" },
    update: data,
    create: data,
  }));
}

function createNested<T extends object>(items?: T[], stripId = true) {
  if (!items?.length) return undefined;
  return {
    create: items.map((item) => {
      const copy = { ...item };
      if (stripId) delete (copy as any).id; // remove id to prevent duplication
      return copy;
    }),
  };
}

function replaceNested<T extends object>(items?: T[], path?: string) {
  // Always delete existing rows
  const result: any = { deleteMany: {} };

  // If items exist, create new ones
  if (items?.length) {
    result.create = items.map((item) => {
      const copy: { [key: string]: any } = { ...item };

      // Remove id and foreign keys
      for (const key in copy) {
        if (key === "id" || key.endsWith("Id")) delete (copy as any)[key];
      }

      // Handle nested path recursively
      if (path && copy[path]) copy[path] = createNested(copy[path]);

      return copy;
    });
  }

  // If items is undefined or empty, we still return { deleteMany: {} }
  return result;
}

// ---------------- CRUD Class ----------------
export interface PrismaCRUDOptions<T> {
  model: keyof PrismaClient;
  include?: any;
  fields?: FieldMetadata<T>;
}

export class PrismaCRUD<T> {
  private prisma: PrismaClient;
  private model: keyof PrismaClient;
  private include?: any;
  private fields?: FieldMetadata<T>;

  constructor(prisma: PrismaClient, opts: PrismaCRUDOptions<T>) {
    this.prisma = prisma;
    this.model = opts.model;
    this.include = opts.include ?? {};
    this.fields = opts.fields ?? {};
  }

  private get client() {
    return this.prisma[this.model] as any;
  }

  private toPrisma(data: Partial<T>, action: "create" | "update") {
    if (!this.fields) return data;
    const result: any = { ...data };

    for (const key in this.fields) {
      const value = data[key as keyof T];
      if (value === undefined) continue;

      let { type, path } = this.fields[key as keyof T]!;

      // During create, switch upsertNested => createNested
      if (action === "create" && type === "upsertNested") type = "createNested";

      switch (type) {
        case "createNested":
          if (Array.isArray(value) && value.length) {
            // <-- only process non-empty arrays
            result[key] = {
              create: (value as any[]).map((item) => {
                const copy = { ...item };
                if (path && copy[path]) copy[path] = createNested(copy[path]);
                delete copy.id; // strip id for create
                delete copy.productId; // strip FK
                return copy;
              }),
            };
          } else {
            delete result[key]; // remove empty array
          }
          break;

        case "upsertNested":
          if (action === "update") {
            // Send empty array or undefined => explicitly deletes all nested rows
            result[key] = replaceNested(value as any[], path);
          } else {
            result[key] = createNested(value as any[], false);
          }
          break;

        case "set":
          if (Array.isArray(value) && value.length) {
            result[key] = {
              set: (value as any[]).map((item: any) => ({ id: item.id })),
            };
          } else {
            delete result[key]; // remove empty array
          }
          break;
      }
    }

    return result;
  }

  private fromPrisma(data: any) {
    if (!this.fields) return data;
    const result: any = { ...data };

    for (const key in this.fields) {
      const value = data[key];
      if (value === undefined || value === null) continue;

      const { type, path } = this.fields[key as keyof T]!;

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
      include: this.include,
    });
    return this.fromPrisma(created);
  }

  async get(id: string): Promise<T | null> {
    const found = await this.client.findUnique({
      where: { id },
      include: this.include,
    });
    return found ? this.fromPrisma(found) : null;
  }

  async getAll(query?: QueryObject): Promise<{ data: T[]; total: number }> {
    const prismaQuery = query ? queryOptionsToPrisma(query) : {};
    const where = (prismaQuery as any).where ?? {};
    const [results, total] = await this.prisma.$transaction([
      this.client.findMany({ ...prismaQuery, include: this.include }),
      this.client.count({ where }),
    ]);
    return { data: results.map(this.fromPrisma.bind(this)), total };
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const updated = await this.client.update({
      where: { id },
      data: this.toPrisma(updates, "update"),
      include: this.include,
    });
    return this.fromPrisma(updated);
  }

  async delete(id: string): Promise<T> {
    const deleted = await this.client.delete({
      where: { id },
      include: this.include,
    });
    return this.fromPrisma(deleted);
  }
}
