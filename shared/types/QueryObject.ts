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

export type QueryType<T> = QueryObject<T> | Partial<T>;

// -------------------- Query Object --------------------
export type QueryObject<T> = {
  search?: string;
  searchFields?: (DeepDotKeyof<T> | string)[];
  select?: (DeepDotKeyof<T> | string)[];
  include?: (DeepDotKeyof<T> | string | NestedInclude<T>)[];
  conditions?: QueryCondition<T>[];
  orderBy?: DeepDotKeyof<T>;
  order?: "asc" | "desc";
  limit?: number;
  page?: number;
};

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

export interface NestedInclude<T = any> {
  field: DeepDotKeyof<T>;
  select?: (DeepDotKeyof<T> | string)[];
  include?: (DeepDotKeyof<T> | string)[];
  take?: number;
  skip?: number;
  orderBy?: DeepDotKeyof<T>;
  order?: "asc" | "desc";
}

const QUERY_KEYS = [
  "limit",
  "page",
  "sortBy",
  "sortOrder",
  "search",
  "searchFields",
  "select",
  "include",
  "conditions",
] as const;

export function isQueryObject<T>(obj: any): obj is QueryObject<T> {
  if (!obj || typeof obj !== "object") return false;
  return QUERY_KEYS.some((key) => key in obj);
}

/**
 * Convert a dot-path string into a nested object suitable for Prisma
 *
 * Example:
 *   dotToNested("shippingInfo.address.name", { contains: "g" })
 *   =>
 *   {
 *     shippingInfo: {
 *       include: {
 *         address: {
 *           name: { contains: "g" }
 *         }
 *       }
 *     }
 *   }
 *
 * options.wrapRelationWith: "some" | "every" => for array relations
 */
export function dotToNested(
  path: string,
  leafValue: any = true,
  options?: { wrapRelationWith?: "some" | "every" }
): any {
  const parts = path.split(".");
  const root: any = {};
  let current = root;

  for (let i = 0; i < parts.length; i++) {
    const key = parts[i];
    const isLeaf = i === parts.length - 1;

    if (isLeaf) {
      current[key] = leafValue;
    } else {
      current[key] = { include: {} };
      current = current[key].include;
    }
  }

  if (options?.wrapRelationWith) {
    return { [options.wrapRelationWith]: root };
  }

  return root;
}
