import type { QueryObject } from "./QueryObject";

export interface CrudInterface<T> {
  // Create a new item
  create(data: Partial<T>): Promise<T>;

  // Overloads for get method
  // If called with an id or specific query, return a single item or null
  get(query: Partial<T>): Promise<T | null>;

  // If called with a general query, return multiple items with total count
  get(query?: QueryObject<T>): Promise<{ data: T[]; total: number } | null>;

  // Update requires an id in the updates
  update(
    updates: Partial<T> & { id: string },
    options?: { increment: boolean }
  ): Promise<T>;

  // Delete by id
  delete(id: string): Promise<T>;
}
