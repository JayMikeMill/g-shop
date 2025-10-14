/**
 * ==========================================
 * GENERIC NESTED PRISMA UPDATE/CREATE/INCREMENT
 * ==========================================
 *
 * Converts incoming data into Prisma-compatible nested
 * create/update/increment operations based on model metadata.
 *
 * Supports:
 * - Primitive fields
 * - JSON fields (direct storage)
 * - Owned nested objects (1:1 or 1:N)
 * - Many-to-many relations (connect/disconnect arrays)
 * - Increment operations for numeric fields
 *
 * Example usage:
 *   prismaNestedUpdate(existingDoc, incomingData, modelMetadata, 'update');
 */

import { ModelMetadata } from "./ModelMetadata";

/**
 * Main nested update function
 */
export function prismaNestedUpdate<T>(
  existing: T | null,
  incoming: Partial<T>,
  meta: ModelMetadata<T>,
  action: "create" | "update" | "increment" = "update"
): any {
  if (!incoming) return incoming;

  const { normalizedMeta: metaMap, childMap } = meta;
  const result: any = {};

  for (const key in incoming as any) {
    const value = (incoming as any)[key];
    const config = metaMap[key] || {};
    const current = existing ? (existing as any)[key] : undefined;

    // ------------------ Nested metadata for recursion ------------------
    const nextMeta: ModelMetadata<any> = {
      normalizedMeta: childMap[key] ?? {},
      childMap: {}, // only first-level children; deeper recursion handled dynamically
    };

    // ------------------ JSON fields ------------------
    if (config.json) {
      result[key] = value;
      continue;
    }

    // ------------------ Many-to-many relations ------------------
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
      if (action === "increment") {
        result[key] = {
          update: value
            .filter(
              (v: any) => v.id && current?.some((c: any) => c.id === v.id)
            )
            .map((v: any) => ({
              where: { id: v.id },
              data: prismaNestedUpdate(
                targetOf(current, v.id),
                v,
                nextMeta,
                "increment"
              ),
            })),
        };
        continue;
      }

      const toCreate = value.filter((v: any) => !v.id).map(stripIdsAndFKs);
      const toUpdate = value.filter(
        (v: any) => v.id && current?.some((c: any) => c.id === v.id)
      );
      const toDelete =
        current?.filter((c: any) => !value.some((v: any) => v.id === c.id)) ??
        [];

      if (toCreate.length)
        result[key] = { ...(result[key] ?? {}), create: toCreate };
      if (toUpdate.length)
        result[key] = {
          ...(result[key] ?? {}),
          update: toUpdate.map((v: any) => ({
            where: { id: v.id },
            data: prismaNestedUpdate(
              targetOf(current, v.id),
              stripIdsAndFKs(v),
              nextMeta,
              "update"
            ),
          })),
        };
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
        const data = prismaNestedUpdate(
          current || {},
          stripIdsAndFKs(value),
          nextMeta,
          action
        );
        result[key] = current ? { update: data } : { create: data };
        continue;
      }

      if (valueWithId.id != null)
        result[key] = { connect: { id: valueWithId.id } };
      else if (valueWithId.id === null) result[key] = { disconnect: true };

      continue;
    }

    // ------------------ Primitive fields ------------------
    if (value !== undefined) {
      result[key] =
        action === "increment" && typeof value === "number"
          ? { increment: value }
          : value;
    }
  }

  return result;
}

/**
 * ----------------- Helpers -----------------
 */

/** Remove `id` and foreign key fields from an object */
function stripIdsAndFKs(obj: any) {
  if (!obj || typeof obj !== "object") return obj;
  const copy = { ...obj };
  delete copy.id;
  for (const key in copy) if (key.endsWith("Id")) delete copy[key];
  return copy;
}

/** Find object with a matching `id` in an array */
function targetOf(arr: any[], id: any) {
  return arr.find((c) => c.id === id);
}
