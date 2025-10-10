import qs from "qs";

// -------------------- Example Usage --------------------
// const query: QueryObject<User> = {
//   search: "john",
//   searchFields: ["name", "email", "address.city"],
//   conditions: [
//     { field: "age", operator: ">=", value: 18 },
//     { field: "address.country", operator: "=", value: "USA" },
//   ],
//   sortBy: "name",
//   sortOrder: "asc",
//   limit: 10,
//   page: 2,
// };

// -------------------- Deep Types --------------------

// // Optional deep partial (skips arrays, functions, and nulls)
// type DeepPartial<T> = {
//   [P in keyof T]?: T[P] extends object
//     ? T[P] extends Function | Array<any> | null
//       ? T[P]
//       : DeepPartial<T[P]>
//     : T[P];
// };

// Generate dot notation keys for nested objects (skips arrays, functions, nulls)
export type DeepDotKeyof<T> = T extends object
  ? {
      [K in keyof T & (string | number)]: T[K] extends object
        ? T[K] extends Array<any> | Function | null
          ? K
          : K | `${K}.${DeepDotKeyof<T[K]>}`
        : K;
    }[keyof T & (string | number)]
  : never;

// -------------------- Query Types --------------------
export interface QueryCondition<T = any> {
  field: DeepDotKeyof<T>; // dot-notation key
  operator: "=" | "!=" | "<" | "<=" | ">" | ">=" | "like" | "in";
  value: any;
}

export interface QueryObject<T> {
  search?: string;
  searchFields?: DeepDotKeyof<T>[]; // dot-notation keys
  includeFields?: DeepDotKeyof<T>[]; // dot-notation keys
  conditions?: QueryCondition<T>[];
  sortBy?: DeepDotKeyof<T>;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

// Helper to detect QueryObject
export const isQueryObject = <T>(q: any): q is QueryObject<T> =>
  q && (q.conditions || q.search || q.limit || q.page || q.includeFields);

// -------------------- Query String Helpers --------------------

// Convert QueryObject into query string
export function toQueryString<T>(query?: QueryType<T>): string {
  if (!query) return "";

  if (!isQueryObject<T>(query)) return qs.stringify(query);

  const params: Record<string, any> = {};

  if (query.limit !== undefined) params.limit = query.limit;
  if (query.page !== undefined) params.page = query.page;
  if (query.sortBy) params.sortBy = query.sortBy;
  if (query.sortOrder) params.sortOrder = query.sortOrder;
  if (query.search) params.search = query.search;

  if (query.conditions?.length) {
    params.conditions = query.conditions.map((c) => ({
      field: c.field,
      operator: c.operator,
      value: c.value,
    }));
  }

  if (query.searchFields?.length) params.searchFields = query.searchFields;

  return qs.stringify(params, { encode: true, arrayFormat: "brackets" });
}

// Parse query string / object into strongly-typed QueryObject
export function parseQueryType<T>(
  query: Record<string, any> | Record<string, any>[]
): QueryType<T> | undefined {
  // No query = undefined (used to fetch all)
  if (!query || Object.keys(query).length === 0) return undefined;

  // If an array is passed, use the first item
  const q = Array.isArray(query) ? query[0] : query;

  // If the object doesn't have any query-related keys, assume it's a Partial<T>
  const queryKeys = [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
    "search",
    "searchFields",
    "conditions",
  ];
  const hasQueryKeys = queryKeys.some((k) => k in q);
  if (!hasQueryKeys) {
    return q as Partial<T>;
  }

  const options: QueryObject<T> = { searchFields: [] };

  if (q.limit !== undefined) {
    const n = Number(q.limit);
    if (!isNaN(n) && n > 0) options.limit = n;
  }

  if (q.page !== undefined) {
    const n = Number(q.page);
    if (!isNaN(n) && n > 0) options.page = n;
  }

  if (q.sortBy !== undefined)
    options.sortBy = String(q.sortBy) as DeepDotKeyof<T>;

  if (q.sortOrder !== undefined) {
    const order = String(q.sortOrder).toLowerCase();
    if (order === "asc" || order === "desc")
      options.sortOrder = order as "asc" | "desc";
  }

  if (q.search !== undefined) options.search = String(q.search);

  if (q.searchFields) {
    options.searchFields = Array.isArray(q.searchFields)
      ? (q.searchFields as DeepDotKeyof<T>[])
      : (Object.values(q.searchFields).map(String) as DeepDotKeyof<T>[]);
  }

  if (q.conditions) {
    const rawConditions = Array.isArray(q.conditions)
      ? q.conditions
      : Object.values(q.conditions);
    options.conditions = rawConditions.map((c: any) => ({
      field: String(c.field) as DeepDotKeyof<T>,
      operator: c.operator as QueryCondition<T>["operator"],
      value: c.value,
    }));
  }

  return options;
}

export type QueryType<T> = QueryObject<T> | Partial<T>;
