import type { QueryObject } from "../types/QueryObject";

export interface CRUDInterface<T> {
  create(data: Partial<T>): Promise<T>;
  getOne(id: string): Promise<T | null>;
  getAll(query?: QueryObject): Promise<{ data: T[]; total: number }>;
  update(updates: Partial<T> & { id: string }): Promise<T>;
  delete(id: string): Promise<T>;
}
