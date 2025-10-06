import qs from "qs";

export interface QueryObject<T> {
  search?: string;
  searchFields?: (keyof T)[];
  conditions?: QueryCondition<T>[];
  sortBy?: keyof T | string;
  sortOrder?: "asc" | "desc";

  limit?: number;
  page?: number;
}

export interface QueryCondition<T = any> {
  field: keyof T;
  operator: "=" | "!=" | "<" | "<=" | ">" | ">=";
  value: T[keyof T];
}

// Converts a QueryObject into a query string for use in URLs
export function toQueryString<T>(query?: QueryObject<T>): string {
  if (!query) return "";

  const params: Record<string, any> = {};

  if (query.limit !== undefined) params.limit = query.limit;
  if (query.page !== undefined) params.page = query.page;
  if (query.sortBy) params.sortBy = query.sortBy;
  if (query.sortOrder) params.sortOrder = query.sortOrder;
  if (query.search) params.search = query.search;

  if (query.conditions && query.conditions.length) {
    params.conditions = query.conditions.map((c) => ({
      field: c.field,
      operator: c.operator,
      value: c.value,
    }));
  }

  return qs.stringify(params, { encode: true });
}

// Parses a query object from a request query (e.g., Express req.query)
export function parseQueryObject<T>(
  query: Record<string, any> | Record<string, any>[]
): QueryObject<T> {
  const q = Array.isArray(query) ? query[0] : query;

  const options: QueryObject<T> = { searchFields: [] };

  if (q.limit !== undefined) {
    const n = parseInt(q.limit as string, 10);
    if (!isNaN(n) && n > 0) options.limit = n;
  }

  if (q.page !== undefined) {
    const n = parseInt(q.page as string, 10);
    if (!isNaN(n) && n > 0) options.page = n;
  }

  if (q.sortBy !== undefined) options.sortBy = q.sortBy as keyof T;
  if (q.sortOrder !== undefined) {
    const order = String(q.sortOrder).toLowerCase();
    if (order === "asc" || order === "desc")
      options.sortOrder = order as "asc" | "desc";
  }

  if (q.search !== undefined) options.search = String(q.search);

  if (q.conditions) {
    const rawConditions = Array.isArray(q.conditions)
      ? q.conditions
      : Object.values(q.conditions);

    options.conditions = rawConditions.map((c: any) => ({
      field: c.field as keyof T,
      operator: c.operator as QueryCondition<T>["operator"],
      value: c.value as T[keyof T],
    }));
  }

  return options;
}
