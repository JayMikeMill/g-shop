export interface QueryOptions {
  conditions?: QueryCondition[];
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface QueryCondition {
  field: string;
  operator: "=" | "!=" | "<" | "<=" | ">" | ">=";
  value: any;
}
