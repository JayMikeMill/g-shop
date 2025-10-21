// AdminCrudPage.tsx
import { useState, useCallback } from "react";

import { Button, CircleSpinner, DynamicTable, Input } from "@components/ui";
import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";
import { useDataApi } from "@api";
import type { TableLayout } from "./AdminTableLayouts";
import { Search } from "lucide-react";

interface AdminCrudPageProps<T extends { id?: string }> {
  objectsName: string;
  objectName: string;
  apiKey: keyof ReturnType<typeof useDataApi>;
  tableLayout: TableLayout<T>;
  Editor?: React.ComponentType<CrudEditorInterface<T>>;
  preSaveHook?: (item: T, isNew: boolean) => Promise<T>;
  pageSize?: number;
}

type EditorMode =
  | { type: "idle" }
  | { type: "editing"; id: string }
  | { type: "creating" };

function AdminCrudPage<T extends { id?: string }>({
  objectsName,
  objectName,
  apiKey,
  tableLayout,
  Editor,
  preSaveHook,
  pageSize = 10,
}: AdminCrudPageProps<T>) {
  const [editorMode, setEditorMode] = useState<EditorMode>({ type: "idle" });
  const [currentAction, setCurrentAction] = useState<
    "creating" | "updating" | "deleting" | null
  >(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const api = useDataApi()[apiKey] as any;
  const { query, columns } = tableLayout;

  // Fetch list
  const {
    data,
    isFetching: isListLoading,
    refetch,
  } = api.getMany({
    search,
    searchFields: query.searchFields,
    select: query.select ? [...query.select, "id"] : undefined,
    include: query.include,
    page,
    limit: pageSize,
    orderBy: "createdAt",
    order: "desc",
  });

  // Fetch single item if editing
  const editingItemId =
    editorMode.type === "editing" ? editorMode.id : undefined;
  const { data: editingItem, isFetching: isItemLoading } = api.getOne({
    id: editingItemId,
  });

  const items: T[] = data?.data ?? [];
  const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1;

  // Mutations
  const createItem = api.create();
  const updateItem = api.update();
  const deleteItem = api.delete();

  // Wrap actions to show spinner with currentAction
  const withAction = useCallback(
    async (
      fn: () => Promise<void>,
      action: "creating" | "updating" | "deleting"
    ) => {
      setCurrentAction(action);
      try {
        await fn();
      } catch (err: any) {
        alert(err?.message ?? "Operation failed");
      } finally {
        setCurrentAction(null);
        setEditorMode({ type: "idle" });
        refetch();
      }
    },
    [refetch]
  );

  const handleSave = useCallback(
    (item: T, isNew: boolean) =>
      withAction(
        async () => {
          if (preSaveHook) item = await preSaveHook(item, isNew);
          if (isNew) await createItem.mutateAsync(item);
          else await updateItem.mutateAsync(item as any);
        },
        isNew ? "creating" : "updating"
      ),
    [createItem, updateItem, preSaveHook, withAction]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const confirmed = window.confirm(
        `Are you sure you want to delete this ${objectName}? This action cannot be undone.`
      );
      if (!confirmed) return;
      await withAction(() => deleteItem.mutateAsync(id), "deleting");
    },
    [deleteItem, withAction, objectName]
  );

  // Event handlers
  const openCreate = () => setEditorMode({ type: "creating" });
  const openEdit = (item: T) =>
    setEditorMode({ type: "editing", id: item.id! });
  const closeEditor = () => setEditorMode({ type: "idle" });

  return (
    <div className="flex flex-col h-full min-h-0 w-full min-w-0">
      {/* Editor Dialog */}
      {Editor &&
        editorMode.type !== "idle" &&
        (isItemLoading ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
            <CircleSpinner text={`Loading ${objectName}...`} />
          </div>
        ) : (
          <Editor
            open={true}
            item={editingItem}
            onCreate={(item) => handleSave(item, true)}
            onModify={(item) => handleSave(item, false)}
            onDelete={handleDelete}
            onCancel={closeEditor}
          />
        ))}

      {/* Action Spinner */}
      {currentAction && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner
            text={`${currentAction[0].toUpperCase() + currentAction.slice(1)} ${objectName}...`}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-row w-full bg-background border-b items-center gap-sm p-sm">
        <Button onClick={openCreate}>{`Add ${objectName}`}</Button>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder={objectsName ? `Search ${objectsName}...` : "Search..."}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Search
            className="text-text absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            size={20}
            onClick={() => setPage(1)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-auto">
        <DynamicTable<T>
          objectsName={objectsName}
          columns={columns}
          data={items}
          loading={isListLoading}
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          onRowClick={openEdit}
        />
      </div>
    </div>
  );
}

export { AdminCrudPage };
