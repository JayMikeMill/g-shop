// src/crud/ICrudAdapter.ts
import type { QueryObject } from "@shared/types/QueryObject";

export interface CRUDAdapter<T> {
  create(data: Partial<T>): Promise<T>;
  get(id: string): Promise<T | null>;
  getAll(query?: QueryObject): Promise<{ data: T[]; total: number }>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}
