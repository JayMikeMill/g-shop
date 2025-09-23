export interface QueryObject {
  conditions?: QueryCondition[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string; // add a global search field
  limit?: number;
  page?: number;
}

export interface QueryCondition {
  field: string;
  operator: "=" | "!=" | "<" | "<=" | ">" | ">=";
  value: any;
}

export function parseQueryObject(query: Record<string, any>): QueryObject {
  const options: QueryObject = {};

  if (query.limit !== undefined) {
    const n = parseInt(query.limit as string);
    if (!isNaN(n) && n > 0) options.limit = n;
  }

  if (query.page !== undefined) {
    const n = parseInt(query.page as string);
    if (!isNaN(n) && n > 0) options.page = n;
  }

  if (query.sortBy !== undefined) {
    options.sortBy = query.sortBy as string;
  }

  if (query.sortOrder !== undefined) {
    const order = (query.sortOrder as string).toLowerCase();
    if (order === "asc" || order === "desc") options.sortOrder = order;
  }

  return options;
}

export function queryOptionsToPrisma(query?: QueryObject) {
  let where: any = {};
  const orderBy: any = {};
  let take: number | undefined;
  let skip: number | undefined;

  // Handle individual conditions
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

  // Handle global search across multiple fields
  if (!query?.conditions?.length && query?.search) {
    const search = query.search;
    // Example: search in name, description, category
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { category: { contains: search, mode: "insensitive" } },
    ];
  }

  // Sorting
  if (query?.sortBy) {
    orderBy[query.sortBy] = query.sortOrder === "desc" ? "desc" : "asc";
  }

  // Pagination
  if (query?.limit) {
    take = query.limit;
    if (query.page) skip = query.limit * (query.page - 1);
  }

  return {
    where: Object.keys(where).length ? where : undefined,
    orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    take,
    skip,
  };
}
