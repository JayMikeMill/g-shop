import { DeepDotKeyof, QueryCondition, QueryObject } from "@my-store/shared";

type PrismaFindParams = {
  where?: any;
  select?: any;
  include?: any;
  orderBy?: any;
  take?: number;
  skip?: number;
};

// Merge helper
export function deepMerge(target: any, source: any) {
  if (!source || typeof source !== "object") return target;

  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = target[key];

    if (
      srcVal &&
      typeof srcVal === "object" &&
      !Array.isArray(srcVal) &&
      srcVal.constructor === Object
    ) {
      if (
        !tgtVal ||
        typeof tgtVal !== "object" ||
        tgtVal.constructor !== Object
      ) {
        target[key] = {};
      }
      deepMerge(target[key], srcVal);
    } else {
      target[key] = srcVal;
    }
  }

  return target;
}

// Convert dot-notation array to nested object (raw, not wrapped)
export function dotToNestedObject(paths: string[]) {
  const root: any = {};
  for (const f of paths) {
    const parts = f.split(".");
    let current = root;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const isLeaf = i === parts.length - 1;

      if (!isLeaf) {
        // Ensure container is an object; upgrade boolean 'true' to {}
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
        // Leaf: if already an object (because a deeper path was added earlier), keep it
        if (current[p] && typeof current[p] === "object") {
          // keep existing nested object; no-op
        } else {
          current[p] = true;
        }
      }
    }
  }
  return root;
}

// Wrap nested object into Prisma include shape
function wrapAsPrismaInclude(obj: any): any {
  const out: any = {};
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (val === true) {
      out[key] = true;
      continue;
    }
    // Already a config object with include/select
    if (val && (val.include || val.select)) {
      const cfg: any = {};
      if (val.select) cfg.select = val.select;
      if (val.include)
        cfg.include = wrapAsPrismaInclude(
          typeof val.include === "object" && !Array.isArray(val.include)
            ? val.include
            : {}
        );
      out[key] = Object.keys(cfg).length ? cfg : true;
      continue;
    }
    // Plain nested object → treat as nested include
    out[key] = { include: wrapAsPrismaInclude(val) };
  }
  return out;
}

// Build include with optional metadata map:
// - If includeMap is array of paths: turns into nested includes
// - If includeMap is { "a.b": true | { select: {...} | include: {...} } }
export function normalizeIncludeConfig(
  includeMap?: string[] | Record<string, any>
): any {
  if (!includeMap) return undefined;

  if (Array.isArray(includeMap)) {
    return wrapAsPrismaInclude(dotToNestedObject(includeMap.map(String)));
  }

  // object map of path -> meta
  const raw: any = {};
  for (const key of Object.keys(includeMap)) {
    const parts = key.split(".");
    let current = raw;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const isLeaf = i === parts.length - 1;

      if (!isLeaf) {
        // Ensure container is an object; upgrade boolean 'true' to {}
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

        // Merge behavior:
        // - if existing is object and meta === true -> keep object
        // - if existing is true and meta is object -> replace with object meta
        // - if both objects -> shallow-merge select/include keys
        // - else -> set true
        const existing = current[p];

        if (meta && typeof meta === "object") {
          const next: any = {
            ...(existing && typeof existing === "object" ? existing : {}),
            ...(meta.select ? { select: meta.select } : {}),
            ...(meta.include ? { include: meta.include } : {}),
          };
          current[p] = next;
        } else if (existing && typeof existing === "object") {
          // already has nested; keep it
        } else {
          current[p] = true;
        }
      }
    }
  }

  return wrapAsPrismaInclude(raw);
}

// Build nested include+select for dot fields (treat leaf as scalar select)
function includeForSelectPath(path: string) {
  const parts = path.split(".");
  if (parts.length < 2) return undefined;

  // Build include chain so that last relation has select of leaf field
  const leaf = parts.pop()!;
  let obj: any = { select: { [leaf]: true } };
  for (let i = parts.length - 1; i >= 0; i--) {
    obj = { include: { [parts[i]]: obj } };
  }
  // unwrap first level
  return obj.include;
}

export function buildPrismaQuery<T>(
  queryObj: QueryObject<T>,
  includeConfig: string[] | Record<string, any> | undefined,
  defaultSearchFields: (keyof T)[]
): PrismaFindParams {
  const where = buildPrismaWhere(queryObj);

  // Search
  if (queryObj.search) {
    const searchFields =
      queryObj.searchFields && queryObj.searchFields.length > 0
        ? queryObj.searchFields
        : defaultSearchFields;

    if (!searchFields || searchFields.length === 0) {
      throw new Error("searchFields must be defined for search queries.");
    }

    where.OR = searchFields.map((field) => {
      const parts = String(field).split(".");
      let nested: any = { contains: queryObj.search };
      for (let i = parts.length - 1; i >= 0; i--) {
        nested = { [parts[i]]: nested };
      }
      return nested;
    });
  }

  // Base include from adapter config (string[] or map)
  let include = normalizeIncludeConfig(includeConfig) || undefined;
  let select: any = undefined;

  // Query-specific include fields (dot-notation supported)
  if (queryObj.includeFields?.length) {
    const nestedSelects = queryObj.includeFields
      .filter((f) => String(f).includes("."))
      .map(String);
    const topScalars = queryObj.includeFields
      .filter((f) => !String(f).includes("."))
      .map(String);

    // Build nested includes for dot paths selecting leaf scalars
    if (nestedSelects.length) {
      const nestedInclude: any = {};
      for (const p of nestedSelects) {
        const inc = includeForSelectPath(p);
        if (inc) deepMerge(nestedInclude, inc);
      }
      include = include ? deepMerge(include, nestedInclude) : nestedInclude;
    }

    // Only emit top-level select if we DO NOT already have an include.
    // Prisma forbids using include and select together at the same level.
    if (!include && topScalars.length) {
      select = select || {};
      for (const f of topScalars) select[f] = true;
    }
  }

  // Pagination & Sorting
  const orderBy = queryObj.sortBy
    ? { [queryObj.sortBy]: queryObj.sortOrder === "desc" ? "desc" : "asc" }
    : undefined;
  const take = queryObj.limit;
  const skip =
    queryObj.page && queryObj.page > 1
      ? (queryObj.limit ?? 0) * (queryObj.page - 1)
      : undefined;

  const result: PrismaFindParams = { where, orderBy };
  if (typeof take === "number") result.take = take;
  if (typeof skip === "number") result.skip = skip;

  if (include && Object.keys(include).length) {
    result.include = include;
  } else if (select && Object.keys(select).length) {
    result.select = select;
  }

  return result;
}

// -------------------- Prisma Where Builder --------------------
export function buildPrismaWhere<T>(query: QueryObject<T>): any {
  const where: any = {};

  // Conditions
  if (query.conditions?.length) {
    for (const cond of query.conditions) {
      const nested = buildNestedWhere(cond.field, {
        [mapOperator(cond.operator)]: cond.value,
      });
      deepMerge(where, nested);
    }
  }

  // Search
  if (query.search) {
    const fieldsToSearch: DeepDotKeyof<T>[] =
      query.searchFields && query.searchFields.length > 0
        ? query.searchFields
        : (Object.keys(query as any) as DeepDotKeyof<T>[]); // fallback shallow

    where.OR = fieldsToSearch.map((field) =>
      buildNestedWhere(field, { contains: query.search })
    );
  }

  return where;
}

// Convert dot-notation key into nested object
export function buildNestedWhere(field: DeepDotKeyof<any>, value: any): any {
  if (field === undefined || field === null || field === "") return value;

  const parts = String(field).split(".");
  let nested: any = value;

  for (let i = parts.length - 1; i >= 0; i--) {
    const key = parts[i];
    if (key) nested = { [key]: nested };
  }

  return nested;
}

// -------------------- Operator Mapper --------------------
function mapOperator(op: QueryCondition["operator"]): string {
  switch (op) {
    case "=":
      return "equals";
    case "!=":
      return "not";
    case "<":
      return "lt";
    case "<=":
      return "lte";
    case ">":
      return "gt";
    case ">=":
      return "gte";
    case "like":
      return "contains";
    case "in":
      return "in";
    default:
      return "equals";
  }
}
