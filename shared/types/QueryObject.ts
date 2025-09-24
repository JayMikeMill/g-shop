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
