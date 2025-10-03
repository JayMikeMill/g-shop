import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CRUDInterface, QueryObject } from "@my-store/shared/types";
import { toQueryString } from "@my-store/shared/types/QueryObject";
import { get, post, put, del } from "./client";

// CRUD factory
function CRUD<T extends { id?: string }>(name: string): CRUDInterface<T> {
  return {
    create: (data: Partial<T>) => post<T>(`/${name}`, data),
    getOne: (id: string) => get<T | null>(`/${name}/${id}`),
    getAll: (query?: QueryObject) =>
      get<{ data: T[]; total: number }>(`/${name}?${toQueryString(query)}`),
    update: (updates: Partial<T> & { id: string }) =>
      put<T>(`/${name}/${updates.id}`, updates),
    delete: (id: string) => del<T>(`/${name}/${id}`),
  };
}

export function useCRUD<T extends { id?: string }>(
  resource: CRUDInterface<T> | string
) {
  const queryClient = useQueryClient();

  // If a string is passed, call the CRUD factory
  const crud: CRUDInterface<T> =
    typeof resource === "string" ? CRUD<T>(resource) : resource;

  return {
    // Queries
    getAll: (query?: QueryObject) => {
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
