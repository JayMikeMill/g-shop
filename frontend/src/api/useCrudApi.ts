import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CrudInterface } from "@shared/interfaces";
import { toQueryString, type QueryType } from "@shared/types";
import { get, post, put, del } from "./client";

export function CRUD<T extends { id?: string }>(
  name: string
): CrudInterface<T> {
  return {
    create: (data: Partial<T>) => post<T>(`/${name}`, data),
    getOne: (query: QueryType<T>) =>
      get<T | null>(`/${name}/one${toQueryString(query)}`),
    getMany: (query?: QueryType<T>) =>
      get<{ data: T[]; total: number }>(`/${name}${toQueryString(query)}`),
    update: (updates: Partial<T> & { id: string }) =>
      put<T>(`/${name}/${updates.id}`, updates),
    delete: (id: string) => del<T>(`/${name}/${id}`),
  };
}

export function useCrudApi<T extends { id?: string }>(
  resource: CrudInterface<T> | string
) {
  const queryClient = useQueryClient();

  // If a string is passed, call the CRUD factory
  const crud: CrudInterface<T> =
    typeof resource === "string" ? CRUD<T>(resource) : resource;

  return {
    // Queries
    getOne: (query: QueryType<T>) => {
      return useQuery({
        queryKey: [resource, query],
        queryFn: () => crud.getOne(query),
      });
    },

    getMany: (query?: QueryType<T>) => {
      return useQuery({
        queryKey: [resource, query],
        queryFn: () => crud.getMany(query),
      });
    },

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
