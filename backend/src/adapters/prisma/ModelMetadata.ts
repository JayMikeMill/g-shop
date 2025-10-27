/**
 * ================================
 * MODEL METADATA SYSTEM
 * ================================
 *
 * Provides a structured metadata layer for Prisma models, supporting:
 * - Field-level configurations (owned, many-to-many, JSON, searchable, etc.)
 * - Dot-notation paths for nested relations
 * - Automatic generation of Prisma `include` and `select` objects
 * - Base search fields and include defaults
 *
 * This metadata is used by generic CRUD operations and nested update helpers.
 */

import { dotToNested } from "shared/types";

//////////////////////////////
// --- TYPES & DEFAULTS --- //
//////////////////////////////

type FieldMeta = FieldMetadata<any> | DotFieldMetadata;

/** Metadata describing a model */
export type ModelMetadata<T> = {
  fieldMeta?: FieldMeta; // original raw metadata
  normalizedMeta: DotFieldMetadata; // flattened dot-path -> FieldConfig
  childMap: Record<string, DotFieldMetadata>; // prebuilt nested children
  baseInclude?: string[] | Record<string, any>; // default include for queries
  baseSearch?: (keyof T)[]; // default search fields
};

/** Field configuration options */
export type FieldConfig = {
  owned?: boolean; // owned nested object or array
  manyToMany?: boolean; // many-to-many relation (array of IDs)
  json?: boolean; // JSON field (store value directly)
  include?: boolean; // always include in queries
  search?: boolean; // include in full-text search
};

/** Default configuration for fields */
export const FieldConfigDefaults: FieldConfig = {
  owned: true,
  manyToMany: true,
  json: true,
  include: true,
  search: true,
};

/** Metadata keyed by model properties */
export type FieldMetadata<T> = Partial<Record<keyof T, FieldConfig>>;

/** Dot-notation flattened metadata for nested relations */
export type DotFieldMetadata = Record<string, FieldConfig>;

/////////////////////////////////////
// --- BUILDING & NORMALIZING --- //
/////////////////////////////////////

/**
 * Build a full ModelMetadata object from raw metadata
 */
export function buildMetadata<T>(
  meta: FieldMetadata<T> | DotFieldMetadata
): ModelMetadata<T> {
  const normalized = normalizeMeta(meta);

  return {
    fieldMeta: meta,
    normalizedMeta: normalizeMeta(meta),
    childMap: buildChildMap(normalized),
    baseInclude: buildBaseInclude(meta),
    baseSearch: buildBaseSearch(meta),
  };
}

/** Normalize raw metadata into dot-paths */
function normalizeMeta<T>(
  meta?: FieldMetadata<T> | DotFieldMetadata
): DotFieldMetadata {
  if (!meta) return {};
  const out: DotFieldMetadata = {};
  for (const k in meta) {
    if (!Object.prototype.hasOwnProperty.call(meta, k)) continue;
    out[String(k)] = (meta as any)[k] || {};
  }
  return out;
}

/** Create normalized metadata and prebuilt child maps */
function buildChildMap(
  normalized: DotFieldMetadata
): Record<string, DotFieldMetadata> {
  const childMap: Record<string, DotFieldMetadata> = {};

  for (const key in normalized) {
    childMap[key] = getChildMeta(normalized, key);
  }

  return childMap;
}

/** Extract child metadata for a given key (dot-notation nested fields) */
function getChildMeta(
  metaMap: DotFieldMetadata,
  key: string
): DotFieldMetadata {
  const prefix = key + ".";
  const out: DotFieldMetadata = {};

  for (const k in metaMap) {
    if (k.startsWith(prefix)) out[k.slice(prefix.length)] = metaMap[k];
  }

  return out;
}

/** Build base include array or object and default search fields */
function buildBaseSearch<T>(fieldMeta: FieldMeta): (keyof T)[] | undefined {
  if (!Object.keys(fieldMeta).length) return undefined;

  const searchFields: (keyof T)[] = [];

  for (const [key, config] of Object.entries(fieldMeta)) {
    if (config && config.search && key) searchFields.push(key as keyof T);
  }

  return searchFields.length ? searchFields : undefined;
}

/**
 * Build a nested Prisma include object from a fieldMeta
 * Only includes fields with `include: true` or `owned: true`
 */
export function buildBaseInclude(fieldMeta: FieldMeta): any {
  const root: any = {};
  for (const [key, cfg] of Object.entries(fieldMeta)) {
    if (cfg?.include) {
      Object.assign(root, dotToNested(key));
    }
  }
  return root;
}
