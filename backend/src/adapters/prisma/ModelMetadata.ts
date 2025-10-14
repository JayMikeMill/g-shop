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

//////////////////////////////
// --- TYPES & DEFAULTS --- //
//////////////////////////////

/** Metadata describing a model */
export type ModelMetadata<T> = {
  fieldMeta?: FieldMetadata<T> | DotFieldMetadata; // original raw metadata
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
  const { normalized, childMap } = buildMetaMaps(meta);
  const { include, search } = buildMetaArrays(meta);

  return {
    fieldMeta: meta,
    normalizedMeta: normalized,
    childMap,
    baseInclude: normalizeIncludeConfig(include),
    baseSearch: search,
  };
}

/** Create normalized metadata and prebuilt child maps */
function buildMetaMaps(meta: FieldMetadata<any> | DotFieldMetadata): {
  normalized: DotFieldMetadata;
  childMap: Record<string, DotFieldMetadata>;
} {
  const normalized = normalizeMeta(meta);
  const childMap: Record<string, DotFieldMetadata> = {};

  for (const key in normalized) {
    childMap[key] = getChildMeta(normalized, key);
  }

  return { normalized, childMap };
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
function buildMetaArrays<T>(meta: FieldMetadata<T> | DotFieldMetadata = {}): {
  include?: string[] | Record<string, any>;
  search?: (keyof T)[];
} {
  if (!Object.keys(meta).length)
    return { include: undefined, search: undefined };

  const baseInclude: string[] = [];
  const searchFields: (keyof T)[] = [];

  for (const [key, config] of Object.entries(meta)) {
    if (config.include) baseInclude.push(key);
    if (config.search && key) searchFields.push(key as keyof T);
  }

  return {
    include: baseInclude.length ? baseInclude : undefined,
    search: searchFields.length ? searchFields : undefined,
  };
}

/////////////////////////////////////////
// --- PRISMA INCLUDE / DOT HELPERS --- //
/////////////////////////////////////////

/** Convert nested object into Prisma `include` shape recursively */
function wrapAsPrismaInclude(obj: any): any {
  const out: any = {};

  for (const key of Object.keys(obj)) {
    const val = obj[key];

    if (val === true) {
      out[key] = true;
    } else if (val && (val.include || val.select)) {
      const cfg: any = {};
      if (val.select) cfg.select = val.select;
      if (val.include) cfg.include = wrapAsPrismaInclude(val.include || {});
      out[key] = Object.keys(cfg).length ? cfg : true;
    } else {
      // Plain nested object → recursive include
      out[key] = { include: wrapAsPrismaInclude(val) };
    }
  }

  return out;
}

/**
 * Normalize baseInclude config for Prisma queries
 * - Accepts array of dot-paths or object map
 */
export function normalizeIncludeConfig(
  includeMap?: string[] | Record<string, any>
): any {
  if (!includeMap) return undefined;

  if (Array.isArray(includeMap)) {
    return wrapAsPrismaInclude(dotToNestedObject(includeMap.map(String)));
  }

  // Object map of path → config
  const raw: any = {};
  for (const key of Object.keys(includeMap)) {
    const parts = key.split(".");
    let current = raw;

    for (let i = 0; i < parts.length; i++) {
      const isLeaf = i === parts.length - 1;
      const p = parts[i];

      if (!isLeaf) {
        if (current[p] === true) current[p] = {};
        if (
          !current[p] ||
          typeof current[p] !== "object" ||
          Array.isArray(current[p])
        ) {
          current[p] = {};
        }
        current = current[p];
      } else {
        const meta = includeMap[key];
        const existing = current[p];

        if (meta && typeof meta === "object") {
          current[p] = {
            ...(existing && typeof existing === "object" ? existing : {}),
            ...(meta.select ? { select: meta.select } : {}),
            ...(meta.include ? { include: meta.include } : {}),
          };
        } else if (!existing || existing === true) {
          current[p] = true;
        }
      }
    }
  }

  return wrapAsPrismaInclude(raw);
}

/** Convert array of dot-path strings into a nested object */
export function dotToNestedObject(paths: string[]) {
  const root: any = {};

  for (const f of paths) {
    const parts = f.split(".");
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const isLeaf = i === parts.length - 1;
      const p = parts[i];

      if (!isLeaf) {
        if (current[p] === true) current[p] = {};
        if (
          !current[p] ||
          typeof current[p] !== "object" ||
          Array.isArray(current[p])
        ) {
          current[p] = {};
        }
        current = current[p];
      } else {
        if (!current[p] || current[p] === true) current[p] = true;
      }
    }
  }

  return root;
}
