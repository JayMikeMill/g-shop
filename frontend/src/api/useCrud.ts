import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CrudInterface, QueryObject } from "@my-store/shared";
import { toQueryString } from "@my-store/shared";
import { get, post, put, del } from "./client";

// CRUD factory
function CRUD<T extends { id?: string }>(name: string): CrudInterface<T> {
  return {
    create: (data: Partial<T>) => post<T>(`/${name}`, data),
    getOne: (id: string) => get<T | null>(`/${name}/${id}`),
    getOneBy: (field: keyof T, value: any) =>
      get<T | null>(`/${name}/by/${String(field)}/${value}`),
    getAll: (query?: QueryObject<T>) =>
      get<{ data: T[]; total: number }>(`/${name}?${toQueryString(query)}`),
    update: (updates: Partial<T> & { id: string }) =>
      put<T>(`/${name}/${updates.id}`, updates),
    delete: (id: string) => del<T>(`/${name}/${id}`),
  };
}

export function useCrud<T extends { id?: string }>(
  resource: CrudInterface<T> | string
) {
  const queryClient = useQueryClient();

  // If a string is passed, call the CRUD factory
  const crud: CrudInterface<T> =
    typeof resource === "string" ? CRUD<T>(resource) : resource;

  return {
    // Queries
    getAll: (query?: QueryObject<T>) => {
      return useQuery({
        queryKey: [resource, query],
        queryFn: () => crud.getAll(query),
      });
    },

    getOne: (id: string) =>
      useQuery({
        queryKey: [resource, id],
        queryFn: () => crud.getOne(id),
        enabled: !!id,
      }),

    getOneBy: (field: keyof T, value: any) =>
      useQuery({
        queryKey: [resource, "by", field, value],
        queryFn: () => crud.getOneBy(field, value),
        enabled: !!value,
      }),

    // Mutations
    create: () =>
      useMutation({
        mutationFn: (data: Partial<T>) => crud.create(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [crud] }),
      }),

    update: () =>
      useMutation({
        mutationFn: (data: Partial<T> & { id: string }) => crud.update(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [crud] }),
      }),

    delete: () =>
      useMutation({
        mutationFn: (id: string) => crud.delete(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [crud] }),
      }),
  };
}
