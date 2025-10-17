// AdminCrudPage.tsx
import { useState } from "react";

import type { QueryObject } from "@shared/types";

import { Button, CircleSpinner, DynamicTable, Input } from "@components/ui";

import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";

import { useDataApi } from "@api";
import type { TableLayout } from "./AdminTableLayouts";
import { Search } from "lucide-react";

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
    <div className="flex flex-col h-full min-h-0 w-full min-w-0">
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

      {/* Header */}
      <div className="flex flex-row w-full bg-background border-b items-center gap-sm p-sm">
        <Button
          className="px-4 py-2 border rounded bg-blue-600 text-white"
          onClick={handleAddClick}
        >
          {`Add ${objectName}`}
        </Button>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            () => setPage(1);
          }}
          className="relative w-full h-full"
        >
          <Input
            type="text"
            placeholder={objectsName ? `Search ${objectsName}...` : "Search..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search
            className="text-text absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            size={20}
            onClick={() => setPage(1)}
          />
        </form>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-auto">
        <DynamicTable<T>
          objectsName={objectsName}
          columns={columns}
          data={items}
          loading={isLoading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export { AdminCrudPage };
