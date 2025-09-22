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

export function parseQueryOptions(query: Record<string, any>): QueryOptions {
  const options: QueryOptions = {};

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

/**
 * Converts QueryOptions into SQL fragments and parameter array
 * @param query The QueryOptions object
 * @param jsonColumn Optional JSON column for JSON_EXTRACT filtering
 */
export function queryOptionsToSql(query?: QueryOptions, jsonColumn?: string) {
  let sql = "";
  const params: any[] = [];

  // WHERE conditions
  if (query?.conditions?.length) {
    const whereClauses = query.conditions.map((c) => {
      params.push(c.value);
      if (jsonColumn) {
        return `JSON_EXTRACT(${jsonColumn}, '$.${c.field}') ${c.operator} ?`;
      } else {
        return `${c.field} ${c.operator} ?`;
      }
    });
    sql += " WHERE " + whereClauses.join(" AND ");
  }

  // ORDER BY
  if (query?.sortBy) {
    if (sql) sql += " "; // spacing
    sql += `ORDER BY ${jsonColumn ? `JSON_EXTRACT(${jsonColumn}, '$.${query.sortBy}')` : query.sortBy} ${
      query.sortOrder === "desc" ? "DESC" : "ASC"
    }`;
  }

  // LIMIT & OFFSET
  if (query?.limit) {
    sql += " LIMIT ?";
    params.push(query.limit);

    if (query.page) {
      const offset = query.limit * (query.page - 1);
      sql += " OFFSET ?";
      params.push(offset);
    }
  }

  return { sqlFragment: sql, params };
}

export function queryOptionsToPrisma(query?: QueryOptions) {
  const where: any = {};
  const orderBy: any = {};
  let take: number | undefined;
  let skip: number | undefined;

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

  if (query?.sortBy) {
    orderBy[query.sortBy] = query.sortOrder === "desc" ? "desc" : "asc";
  }

  if (query?.limit) {
    take = query.limit;
    if (query.page) skip = query.limit * (query.page - 1);
  }

  return {
    where,
    orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    take,
    skip,
  };
}
