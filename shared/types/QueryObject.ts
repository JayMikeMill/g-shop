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
  searchFields?: (DeepDotKeyof<T> | string)[];
  select?: (DeepDotKeyof<T> | string)[];
  include?: (DeepDotKeyof<T> | string)[];
  conditions?: QueryCondition<T>[];
  sortBy?: DeepDotKeyof<T>;
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
}

// Helper to detect QueryObject
export const isQueryObject = <T>(q: any): q is QueryObject<T> =>
  q && (q.conditions || q.search || q.limit || q.page || q.includeFields);

// -------------------- To Query String --------------------
export function toQueryString<T>(query?: QueryType<T>): string {
  if (!query) return "";

  if (!isQueryObject<T>(query)) return "?" + qs.stringify(query);

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
  if (query.select?.length) params.select = query.select;
  if (query.include?.length) params.include = query.include;

  return "?" + qs.stringify(params, { encode: true, arrayFormat: "brackets" });
}

// -------------------- Parse Query Type --------------------
export function parseQueryType<T>(
  query: Record<string, any> | Record<string, any>[]
): QueryType<T> | undefined {
  if (!query || Object.keys(query).length === 0) return undefined;

  const q = Array.isArray(query) ? query[0] : query;

  const queryKeys = [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
    "search",
    "searchFields",
    "searchFields[]",
    "select",
    "select[]",
    "conditions",
  ];
  const hasQueryKeys = queryKeys.some((k) => k in q);
  if (!hasQueryKeys) return q as Partial<T>;

  const options: QueryObject<T> = {};

  // --- Parse numbers
  if (q.limit !== undefined) {
    const n = Number(q.limit);
    if (!isNaN(n) && n > 0) options.limit = n;
  }
  if (q.page !== undefined) {
    const n = Number(q.page);
    if (!isNaN(n) && n > 0) options.page = n;
  }

  // --- Sort
  if (q.sortBy !== undefined)
    options.sortBy = String(q.sortBy) as DeepDotKeyof<T>;

  if (q.sortOrder !== undefined) {
    const order = String(q.sortOrder).toLowerCase();
    if (order === "asc" || order === "desc")
      options.sortOrder = order as "asc" | "desc";
  }

  // --- Search
  if (q.search !== undefined) options.search = String(q.search);

  // --- Normalize input into string arrays
  const toStringArray = (input: any): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) return input.map((v) => String(v));
    if (typeof input === "object")
      return Object.values(input).map((v) => String(v));
    if (typeof input === "string") {
      return input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    return [];
  };

  // --- Handle select and searchFields variants
  const rawSelect = q.select ?? q["select[]"];
  const rawSearchFields = q.searchFields ?? q["searchFields[]"];

  const select = toStringArray(rawSelect);
  if (select.length) options.select = select as DeepDotKeyof<T>[];

  const include = toStringArray(q.include);
  if (include.length) options.include = include as DeepDotKeyof<T>[];

  const searchFields = toStringArray(rawSearchFields);
  if (searchFields.length)
    options.searchFields = searchFields as DeepDotKeyof<T>[];

  // --- Conditions
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
