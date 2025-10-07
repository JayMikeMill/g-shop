import { DeepDotKeyof, QueryCondition, QueryObject } from "@my-store/shared";

type PrismaFindParams = {
  where?: any;
  include?: any;
  orderBy?: any;
  take?: number;
  skip?: number;
};

export function buildPrismaQuery<T>(
  queryObj: QueryObject<T>,
  includeFields: any,
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

  const include = queryObj.includeFields?.length
    ? dotToInclude(queryObj.includeFields.map(String))
    : includeFields;

  // Pagination & Sorting
  const orderBy = queryObj.sortBy
    ? { [queryObj.sortBy]: queryObj.sortOrder === "desc" ? "desc" : "asc" }
    : undefined;
  const take = queryObj.limit;
  const skip =
    queryObj.page && queryObj.page > 1
      ? (queryObj.limit ?? 0) * (queryObj.page - 1)
      : undefined;

  return { where, include, orderBy, take, skip };
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

// Convert dot-notation array to Prisma include object
export function dotToInclude(fields: string[]) {
  const include: any = {};
  for (const f of fields) {
    const parts = f.split(".");
    let current = include;
    for (let i = 0; i < parts.length; i++) {
      if (i === parts.length - 1) current[parts[i]] = true;
      else current[parts[i]] = current[parts[i]] || {};
      current = current[parts[i]];
    }
  }
  return include;
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

// Deep merge objects safely
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
    default:
      return "equals";
  }
}
