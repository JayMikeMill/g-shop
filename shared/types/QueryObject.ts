import qs from "qs";

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

  // Handle conditions array
  if (query.conditions) {
    const arr = Array.isArray(query.conditions)
      ? query.conditions
      : Object.values(query.conditions);
    options.conditions = arr.map((c: any) => ({
      field: String(c.field),
      operator: String(c.operator) as any,
      value: c.value,
    }));
  }

  return options;
}
