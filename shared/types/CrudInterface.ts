import type { QueryObject } from "./QueryObject";

export interface CrudInterface<T> {
  create(data: Partial<T>): Promise<T>;
  getOne(id: string): Promise<T | null>;
  getOneBy(field: keyof T, value: any): Promise<T | null>;
  getAll(query?: QueryObject<T>): Promise<{ data: T[]; total: number }>;
  update(updates: Partial<T> & { id: string }): Promise<T>;
  delete(id: string): Promise<T>;
}
