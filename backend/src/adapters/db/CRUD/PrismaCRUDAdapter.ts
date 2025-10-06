// src/crud/GenericCRUD.ts

/**
 * GENERIC ATOMIC NESTED CRUD HELPER
 *
 * Fully generic create/update/delete helper for Prisma models,
 * with support for nested relations of any depth.
 */

import { PrismaClient } from "@prisma/client";
import type { CRUDInterface, QueryObject } from "@my-store/shared";

// ----------------- Nested Config -----------------
type NestedConfig = {
  owned?: boolean; // owned nested object or array
  manyToMany?: boolean; // many-to-many relation (array of IDs)
};

type NestedMetadata<T> = Partial<Record<keyof T, NestedConfig>>;

// ----------------- Generic Nested Update/Create -----------------
function genericNestedUpdate<T>(
  existing: T | null,
  incoming: Partial<T>,
  meta: NestedMetadata<T> = {},
  action: "create" | "update" = "update"
): any {
  if (!incoming) return incoming;

  const result: any = {};

  for (const key in incoming) {
    const value = incoming[key];
    const current = existing ? (existing as any)[key] : undefined;
    const config = meta[key as keyof T] || {};

    // ------------------ Many-to-many (array of IDs) ------------------
    if (config.manyToMany && Array.isArray(value)) {
      const existingIds = current?.map((c: any) => c.id) ?? [];
      const incomingIds = value.map((v: any) => v.id);

      const toConnect = value.filter((v: any) => !existingIds.includes(v.id));
      const toDisconnect =
        current?.filter((c: any) => !incomingIds.includes(c.id)) ?? [];

      if (toConnect.length)
        result[key] = {
          ...(result[key] ?? {}),
          connect: toConnect.map((i) => ({ id: i.id })),
        };
      if (toDisconnect.length)
        result[key] = {
          ...(result[key] ?? {}),
          disconnect: toDisconnect.map((i: any) => ({ id: i.id })),
        };

      continue;
    }

    // ------------------ Owned nested arrays ------------------
    if (Array.isArray(value) && config.owned) {
      const toCreate = value.filter((v: any) => !v.id).map(stripIdsAndFKs);
      const toUpdate = value.filter(
        (v) => v.id && current?.some((c: any) => c.id === v.id)
      );
      const toDelete =
        current?.filter((c: any) => !value.some((v: any) => v.id === c.id)) ??
        [];

      if (toCreate.length)
        result[key] = { ...(result[key] ?? {}), create: toCreate };
      if (toUpdate.length) {
        result[key] = {
          ...(result[key] ?? {}),
          update: toUpdate.map((v: any) => ({
            where: { id: v.id },
            data: genericNestedUpdate(
              current.find((c: any) => c.id === v.id),
              stripIdsAndFKs(v),
              meta[key as keyof T] as any,
              "update"
            ),
          })),
        };
      }
      if (toDelete.length)
        result[key] = {
          ...(result[key] ?? {}),
          delete: toDelete.map((d: any) => ({ id: d.id })),
        };

      continue;
    }

    // ------------------ Owned or optional 1:1 object ------------------
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const valueWithId = value as { id?: any };

      if (config.owned) {
        // owned 1:1
        const data = genericNestedUpdate(
          current || {},
          stripIdsAndFKs(value),
          meta[key as keyof T] as any,
          action
        );
        if (current) result[key] = { update: data };
        else result[key] = { create: data };
        continue;
      }

      // connect/disconnect optional relation
      if (valueWithId.id != null)
        result[key] = { connect: { id: valueWithId.id } };
      else if (valueWithId.id === null) result[key] = { disconnect: true };

      continue;
    }

    // ------------------ Primitive field ------------------
    if (value !== undefined) result[key] = value;
  }

  return result;
}

// ----------------- Helper: Strip IDs and foreign keys for create -----------------
function stripIdsAndFKs(obj: any) {
  if (!obj || typeof obj !== "object") return obj;
  const copy = { ...obj };
  delete copy.id;
  for (const key in copy) if (key.endsWith("Id")) delete copy[key];
  return copy;
}

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

export class PrismaCRUDAdapter<T> implements CRUDInterface<T> {
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
      return genericNestedUpdate(existing, data, this.nestedMeta, "update");
    }
    const created = genericNestedUpdate(null, data, this.nestedMeta, "create");
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

  async getOne(id: string): Promise<T | null> {
    return await this.client.findUnique({
      where: { id },
      include: this.includeFields,
    });
  }

  async getAll(query?: QueryObject<T>): Promise<{ data: T[]; total: number }> {
    const prismaQuery = queryOptionsToPrisma<T>({
      ...query,
      searchFields: query?.searchFields?.length
        ? query.searchFields
        : (this.searchFields ?? []),
    });

    const where = (prismaQuery as any).where ?? {};
    const [results, total] = await this.prisma.$transaction([
      this.client.findMany({ ...prismaQuery, include: this.includeFields }),
      this.client.count({ where }),
    ]);
    return { data: results, total };
  }

  async update(updates: Partial<T> & { id?: string }): Promise<T> {
    if (!updates.id) throw new Error("Document id is required for update");

    const existing = await this.getOne(updates.id);
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

// ----------------- Nested search helpers -----------------
function buildNestedWhere(parts: string[], search: string): any {
  const [head, ...rest] = parts;
  if (rest.length === 0) return { [head]: { contains: search } };
  return { [head]: { some: buildNestedWhere(rest, search) } };
}

export function queryOptionsToPrisma<T>(query?: QueryObject<T>) {
  let where: any = {};
  const orderBy: any = {};
  let take: number | undefined;
  let skip: number | undefined;

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

  if (query?.sortBy)
    orderBy[query.sortBy] = query.sortOrder === "desc" ? "desc" : "asc";

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
