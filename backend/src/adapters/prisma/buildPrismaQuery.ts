import { QueryObject, QueryCondition, NestedInclude } from "shared/types";
import { ModelMetadata } from "./ModelMetadata";

type PrismaFindParams = {
  where?: any;
  select?: any;
  include?: any;
  orderBy?: any;
  take?: number;
  skip?: number;
};

//============================================================
// Build Prisma Query from QueryObject
//============================================================
export function buildPrismaQuery<T>(
  query: QueryObject<T>,
  modelMeta: ModelMetadata<T>
): PrismaFindParams {
  const where = buildPrismaWhere(query, modelMeta.baseSearch || []);

  // Explicit select/include
  const select = query.select?.length
    ? buildNestedPrisma(query.select.map(String))
    : undefined;

  const include =
    !select && query.include?.length
      ? buildNestedPrisma(query.include.map(String))
      : !select && modelMeta.baseInclude
        ? modelMeta.baseInclude
        : undefined;

  const orderBy = query.orderBy
    ? { [query.orderBy]: query.order === "desc" ? "desc" : "asc" }
    : undefined;

  const take = query.limit;
  const skip =
    query.page && query.page > 1 && query.limit
      ? query.limit * (query.page - 1)
      : undefined;

  const result: PrismaFindParams = { where, orderBy };
  if (select) result.select = select;
  if (include) result.include = include;
  if (typeof take === "number") result.take = take;
  if (typeof skip === "number") result.skip = skip;

  return result;
}

//============================================================
// Build WHERE Clause
//============================================================

export function buildPrismaWhere<T>(
  query: QueryObject<T>,
  defaultSearchFields: (keyof T)[]
): any {
  const where: any = {};

  // Conditions
  if (query.conditions?.length) {
    for (const cond of query.conditions) {
      const key = cond.field;
      where[key] = { [mapOperator(cond.operator)]: cond.value };
    }
  }

  // Full-text search
  if (query.search) {
    const searchFields =
      query.searchFields && query.searchFields.length > 0
        ? query.searchFields
        : defaultSearchFields;

    if (!searchFields || searchFields.length === 0)
      throw new Error("searchFields must be defined for search queries.");

    where.OR = searchFields.map((field) => ({
      [String(field)]: { contains: query.search },
    }));
  }

  return where;
}

//============================================================
// Map QueryCondition operator to Prisma operator
//============================================================

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

//============================================================
// Build Nested Prisma Select/Include
//============================================================
//============================================================
// Build Nested Prisma Select/Include from dot paths or NestedInclude
//============================================================
export function buildNestedPrisma(
  fields: (string | NestedInclude<any>)[]
): any {
  const root: any = {};

  for (const field of fields) {
    // Handle simple string include/select path like "products.images"
    if (typeof field === "string") {
      const parts = field.split(".");
      let current = root;

      for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        const isLeaf = i === parts.length - 1;

        if (!current[key]) {
          current[key] = isLeaf ? true : { include: {} };
        } else if (!isLeaf && current[key] === true) {
          current[key] = { include: {} };
        }

        if (!isLeaf) current = current[key].include;
      }
    }

    // Handle NestedInclude objects
    else {
      const parts = String(field.field).split(".");
      let current = root;

      for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        const isLeaf = i === parts.length - 1;

        if (!current[key]) {
          current[key] = isLeaf ? {} : { include: {} };
        } else if (!isLeaf && current[key] === true) {
          current[key] = { include: {} };
        }

        if (isLeaf) {
          current[key] = {
            select: field.select
              ? buildNestedPrisma(field.select.map(String))
              : undefined,
            include: field.include
              ? buildNestedPrisma(field.include.map(String))
              : undefined,
            take: field.take,
            skip: field.skip,
            orderBy: field.orderBy
              ? { [field.orderBy]: field.order === "desc" ? "desc" : "asc" }
              : undefined,
          };
        } else {
          current = current[key].include;
        }
      }
    }
  }

  return root;
}
