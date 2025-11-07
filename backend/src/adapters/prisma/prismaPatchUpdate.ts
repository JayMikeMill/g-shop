/**
 * ==========================================
 * GENERIC PRISMA PATCH UPDATE
 * ==========================================
 *
 * Converts incoming patch data into a Prisma-compatible
 * update object. Only processes fields included in the patch.
 *
 * Supports:
 * - Primitive fields
 * - JSON fields
 * - Owned nested objects (1:1 or 1:N)
 * - Many-to-many relations (connect only)
 * - Nested recursion
 */

import { ModelMetadata } from "./ModelMetadata";

/**
 * Main patch update function
 */
export function prismaPatchUpdate<T>(
  patch: Partial<T>,
  meta: ModelMetadata<T>
): any {
  if (!patch) return {};

  const { normalizedMeta: metaMap, childMap } = meta;
  const result: any = {};

  for (const key in patch as any) {
    const value = (patch as any)[key];
    const config = metaMap[key] || {};

    if (value === undefined) continue;

    // ------------------ Primitive / JSON fields ------------------
    if (typeof value !== "object" || config.json) {
      result[key] = value;
      continue;
    }

    // ------------------ Owned 1:1 object ------------------
    if (!Array.isArray(value) && config.owned) {
      const nestedMeta: ModelMetadata<any> = {
        normalizedMeta: childMap[key] ?? {},
        childMap: {},
      };
      result[key] = { create: prismaPatchUpdate(value, nestedMeta) };
      continue;
    }

    // ------------------ Connect 1:1 object ------------------
    if (!Array.isArray(value) && !config.owned && "id" in value) {
      if (value.id != null) result[key] = { connect: { id: value.id } };
      else result[key] = { disconnect: true };
      continue;
    }

    // ------------------ Owned arrays ------------------
    if (Array.isArray(value) && config.owned) {
      const nestedMeta: ModelMetadata<any> = {
        normalizedMeta: childMap[key] ?? {},
        childMap: {},
      };
      result[key] = {
        create: value.map((v: any) => prismaPatchUpdate(v, nestedMeta)),
      };
      continue;
    }

    // ------------------ Many-to-many relations ------------------
    if (Array.isArray(value) && config.manyToMany) {
      const connect = value
        .filter((v: any) => v.id != null)
        .map((v: any) => ({ id: v.id }));
      if (connect.length) result[key] = { connect };
      continue;
    }
  }

  return result;
}
