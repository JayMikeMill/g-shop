/**
 * Utility to handle nested updates/creates/increments for Prisma ORM
 * Supports:
 * - Owned relations (1:1, 1:n)
 * - Many-to-many relations
 * - Optional relations
 * - Deeply nested increments of numeric fields
 */

// ----------------- Nested Config -----------------
type NestedConfig = {
  owned?: boolean; // owned nested object or array
  manyToMany?: boolean; // many-to-many relation (array of IDs)
};

export type NestedMetadata<T> = Partial<Record<keyof T, NestedConfig>>;

// NEW: dot-notation metadata shape
export type DotNestedMetadata = Record<string, NestedConfig>;

function normalizeMeta<T>(
  meta?: NestedMetadata<T> | DotNestedMetadata
): DotNestedMetadata {
  if (!meta) return {};
  const out: DotNestedMetadata = {};
  for (const k in meta as any) {
    if (!Object.prototype.hasOwnProperty.call(meta, k)) continue;
    out[String(k)] = (meta as any)[k] || {};
  }
  return out;
}

function childMeta(metaMap: DotNestedMetadata, key: string): DotNestedMetadata {
  const prefix = key + ".";
  const out: DotNestedMetadata = {};
  for (const k in metaMap) {
    if (k.startsWith(prefix)) {
      out[k.slice(prefix.length)] = metaMap[k];
    }
  }
  return out;
}

// ----------------- Generic Nested Update/Create/Increment -----------------
export function prismaNestedUpdate<T>(
  existing: T | null,
  incoming: Partial<T>,
  meta: NestedMetadata<T> | DotNestedMetadata = {},
  action: "create" | "update" | "increment" = "update"
): any {
  if (!incoming) return incoming;

  const metaMap = normalizeMeta(meta);
  const result: any = {};

  for (const key in incoming as any) {
    const value = (incoming as any)[key];
    const current = existing ? (existing as any)[key] : undefined;
    const config = metaMap[key] || {};
    const nextMeta = childMeta(metaMap, key);

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
      if (action === "increment") {
        // Increment numeric fields for existing items only
        result[key] = {
          update: value
            .filter(
              (v: any) => v.id && current?.some((c: any) => c.id === v.id)
            )
            .map((v: any) => {
              const target = current.find((c: any) => c.id === v.id);
              return {
                where: { id: v.id },
                data: prismaNestedUpdate(target, v, nextMeta, "increment"),
              };
            }),
        };
        continue;
      }

      // Normal create/update logic
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
            data: prismaNestedUpdate(
              current.find((c: any) => c.id === v.id),
              stripIdsAndFKs(v),
              nextMeta,
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
        // Owned 1:1
        const data = prismaNestedUpdate(
          current || {},
          stripIdsAndFKs(value),
          nextMeta,
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
    if (value !== undefined) {
      if (action === "increment" && typeof value === "number") {
        result[key] = { increment: value };
      } else {
        result[key] = value;
      }
    }
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
