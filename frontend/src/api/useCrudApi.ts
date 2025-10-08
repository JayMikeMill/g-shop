import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CrudInterface, QueryObject } from "@shared/types";
import { isQueryObject, toQueryString } from "@shared/types";
import { get, post, put, del } from "./client";

export function CRUD<T extends { id?: string }>(
  name: string
): CrudInterface<T> {
  // -------------------- get Implementation --------------------
  const getImpl = async (
    query?: Partial<T> | QueryObject<T>
  ): Promise<T | { data: T[]; total: number } | null> => {
    // No query (getAll)
    if (!query) {
      return await get<{ data: T[]; total: number }>(`/${name}`);
    }

    const isQueryObj = isQueryObject(query);

    // Partial<T> query (getOne)
    if (!isQueryObj && query) {
      const queryString = Object.entries(query)
        .map(
          ([key, value]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value as any)}`
        )
        .join("&");

      return await get<T | null>(`/${name}?${queryString}`);
    }

    // QueryObject<T> (getMany)
    if (isQueryObj) {
      return await get<{ data: T[]; total: number }>(
        `/${name}?${toQueryString(query)}`
      );
    }

    // Fallback
    return null;
  };

  return {
    create: (data: Partial<T>) => post<T>(`/${name}`, data),
    get: getImpl as CrudInterface<T>["get"], // cast to satisfy overloads
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
    getOne: (query: Partial<T>) => {
      return useQuery({
        queryKey: [resource, query],
        queryFn: () => crud.get(query),
      });
    },

    getMany: (query?: QueryObject<T>) => {
      return useQuery({
        queryKey: [resource, query],
        queryFn: () => crud.get(query),
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
