import qs from "qs";

export interface QueryObject {
  searchFields: string[];
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

// Converts a QueryObject into a query string for use in URLs
export function toQueryString(query?: QueryObject): string {
  if (!query) return "";

  const params: Record<string, any> = {};

  if (query.limit !== undefined) params.limit = query.limit;
  if (query.page !== undefined) params.page = query.page;
  if (query.sortBy) params.sortBy = query.sortBy;
  if (query.sortOrder) params.sortOrder = query.sortOrder;
  if (query.search) params.search = query.search;

  if (query.conditions && query.conditions.length) {
    params.conditions = query.conditions.map((c: QueryCondition) => ({
      field: c.field,
      operator: c.operator,
      value: c.value,
    }));
  }

  // Use qs to convert nested objects/arrays into a proper query string
  return qs.stringify(params, { encode: true });
}

// Parses a query object from a request query (e.g., Express req.query)
export function parseQueryObject(
  query: Record<string, any> | Record<string, any>[]
): QueryObject {
  // If query is an array, take the first element
  const q = Array.isArray(query) ? query[0] : query;

  const options: QueryObject = { searchFields: [] };

  // Numbers
  if (q.limit !== undefined) {
    const n = parseInt(q.limit as string, 10);
    if (!isNaN(n) && n > 0) options.limit = n;
  }

  if (q.page !== undefined) {
    const n = parseInt(q.page as string, 10);
    if (!isNaN(n) && n > 0) options.page = n;
  }

  // Strings
  if (q.sortBy !== undefined) options.sortBy = String(q.sortBy);
  if (q.sortOrder !== undefined) {
    const order = String(q.sortOrder).toLowerCase();
    if (order === "asc" || order === "desc")
      options.sortOrder = order as "asc" | "desc";
  }

  if (q.search !== undefined) options.search = String(q.search);

  // Conditions
  if (q.conditions) {
    const rawConditions = Array.isArray(q.conditions)
      ? q.conditions
      : Object.values(q.conditions);

    options.conditions = rawConditions.map((c: any) => ({
      field: String(c.field),
      operator: String(c.operator) as QueryCondition["operator"],
      value: c.value,
    }));
  }

  return options;
}
