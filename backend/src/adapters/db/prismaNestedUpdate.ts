/**
 * Utility to handle nested updates/creates for Prisma ORM
 * Supports owned relations, many-to-many, and optional relations
 * with deep nesting of any depth
 */

// ----------------- Nested Config -----------------
type NestedConfig = {
  owned?: boolean; // owned nested object or array
  manyToMany?: boolean; // many-to-many relation (array of IDs)
};

export type NestedMetadata<T> = Partial<Record<keyof T, NestedConfig>>;

// ----------------- Generic Nested Update/Create -----------------
export function prismaNestedUpdate<T>(
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
            data: prismaNestedUpdate(
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
        const data = prismaNestedUpdate(
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
