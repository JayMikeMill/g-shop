import { apiClient } from "./client";
import type { CRUDInterface, QueryObject } from "@my-store/shared/types";
import { toQueryString } from "@my-store/shared/types/QueryObject";

// Generic HTTP helpers
const get = async <T>(url: string, params?: any) =>
  (await apiClient.get<T>(url, { params })).data;
const post = async <T>(url: string, data?: any) =>
  (await apiClient.post<T>(url, data)).data;
const put = async <T>(url: string, data: any) =>
  (await apiClient.put<T>(url, data)).data;
const del = async <T>(url: string) => (await apiClient.delete<T>(url)).data;

// CRUD factory
export function CRUD<T extends { id?: string }>(
  name: string
): CRUDInterface<T> {
  return {
    create: (data: Partial<T>) => post<T>(`/${name}`, data),
    getOne: (id: string) => get<T | null>(`/${name}/${id}`),
    getAll: (query?: QueryObject) => {
      const qs = query ? `?${toQueryString(query)}` : "";
      return get<{ data: T[]; total: number }>(`/${name}${qs}`);
    },
    update: (data: Partial<T> & { id: string }) =>
      put<T>(`/${name}/${data.id}`, data),
    delete: (id: string) => del<T>(`/${name}/${id}`),
  };
}
