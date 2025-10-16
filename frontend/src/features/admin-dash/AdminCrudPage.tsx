// AdminCrudPage.tsx
import { useState } from "react";

import type { QueryObject } from "@shared/types";

import {
  Button,
  CircleSpinner,
  DynamicTable,
  type TableColumn,
} from "@components/ui";

import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";

import { useDataApi } from "@api";
import type { TableLayout } from "./AdminTableLayouts";

interface AdminCrudPageProps<T extends { id?: string }> {
  objectsName: string;
  objectName: string;
  apiKey: keyof ReturnType<typeof useDataApi>; // e.g., "collections" | "categories"
  tableLayout: TableLayout<T>;
  Editor?: React.ComponentType<CrudEditorInterface<T>>;
  preSaveHook?: (item: T, isNew: boolean) => Promise<T>;
  pageSize?: number;
  searchable?: boolean;
}

function AdminCrudPage<T extends { id?: string }>({
  objectsName,
  objectName,
  apiKey,
  tableLayout,
  Editor,
  preSaveHook,
  pageSize = 10,
  searchable = true,
}: AdminCrudPageProps<T>) {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { query, columns } = tableLayout;

  const api = useDataApi()[apiKey] as any;

  // Fetch
  const { data, isLoading, refetch } = api.getMany({
    search,
    searchFields: query.searchFields,
    select: query.select ? [...query.select, "id"] : undefined,
    include: query.include,
    page,
    limit: pageSize,
    sortBy: "createdAt",
    sortOrder: "desc",
  } as QueryObject<T>);

  // Fetch product data
  const { data: editingItem } = api.getOne({ id: editingItemId });

  const items: T[] = data?.data ?? [];
  const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1;

  // Mutations
  const createItem = api.create();
  const updateItem = api.update();
  const deleteItem = api.delete();

  const handleSave = async (item: T, isNew: boolean) => {
    if (preSaveHook) {
      item = await preSaveHook(item, isNew);
    }

    setIsSaving(true);

    try {
      console.log("handleSave", { item, isNew });
      if (isNew) await createItem.mutateAsync(item);
      else await updateItem.mutateAsync(item as any);
      setEditingItemId(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Failed to save ${objectName}: ${err.message}`);
    } finally {
      setIsSaving(false);
      refetch();
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteItem.mutateAsync(id);
      setEditingItemId(null);
      setIsCreating(false);
    } catch (err: any) {
      alert(`Failed to delete ${objectName}: ${err.message}`);
    } finally {
      setIsSaving(false);
      refetch();
    }
  };

  const handleAddClick = () => {
    setIsCreating(true);
    setEditingItemId(null);
  };

  const handleRowClick = (item: T) => setEditingItemId(item.id!);

  return (
    <div className="pt-lg pb-lg">
      {/* Editor Dialog */}
      {Editor && (
        <Editor
          open={editingItem || isCreating}
          item={editingItem}
          onCreate={(item) => handleSave(item, true)}
          onModify={(item) => handleSave(item, false)}
          onDelete={handleDelete}
          onCancel={() => {
            setEditingItemId(null);
            setIsCreating(false);
          }}
        />
      )}

      {/* Spinner overlay */}
      {isSaving && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner text="Saving..." />
        </div>
      )}

      {/* Table */}
      <DynamicTable<T>
        className="sm:px-md"
        tableClassName="rounded-none sm:rounded-card"
        objectsName={objectsName}
        columns={columns}
        data={items}
        loading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        searchable={searchable}
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setPage(1)}
        onRowClick={handleRowClick}
        headerButton={
          <Button
            className="px-4 py-2 border rounded bg-blue-600 text-white"
            onClick={handleAddClick}
          >
            {`Add ${objectName}`}
          </Button>
        }
      />
    </div>
  );
}

export { AdminCrudPage };
