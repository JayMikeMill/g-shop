import { useState, useEffect, useCallback } from "react";
import { Button, DynamicTable, Input, KebabMenu } from "@components/ui";
import { Search } from "lucide-react";
import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";
import { useDataApi } from "@app/hooks";
import type { TableLayout } from "./AdminTableLayouts";

import { CrudEditorWrapper } from "./CrudEditorWrapper";
import { useRowActions } from "./useRowActions";

export type EditorMode =
  | { type: "idle" }
  | { type: "editing"; id: string }
  | { type: "creating" };

interface Props<T extends { id?: string }> {
  objectsName: string;
  objectName: string;
  apiKey: keyof ReturnType<typeof useDataApi>;
  tableLayout: TableLayout<T>;
  Editor?: React.ComponentType<CrudEditorInterface<T>>;
  preSaveHook?: (item: T, isNew: boolean) => Promise<T>;
  pageSize?: number;
}

export function AdminCrudPage<T extends { id?: string }>({
  objectsName,
  objectName,
  apiKey,
  tableLayout,
  Editor,
  preSaveHook,
  pageSize = 3,
}: Props<T>) {
  const [editorMode, setEditorMode] = useState<EditorMode>({ type: "idle" });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<T[]>([]);
  const [loadingNextPage, setLoadingNextPage] = useState(false);

  const api = useDataApi()[apiKey] as any;
  const { query, columns } = tableLayout;

  const { rowsLoading, withRowAction, setRowsLoading } = useRowActions();

  // --- Event handlers ---
  const openCreate = () => setEditorMode({ type: "creating" });
  const openEdit = (item: T) =>
    setEditorMode({ type: "editing", id: item.id! });
  const closeEditor = () => setEditorMode({ type: "idle" });

  // --- Fetch list ---
  const { data, isFetching: isListLoading } = api.getMany({
    search,
    searchFields: query.searchFields,
    select: query.select ? [...query.select, "id"] : undefined,
    include: query.include,
    page,
    limit: pageSize,
    orderBy: "createdAt",
    order: "desc",
  });

  useEffect(
    () => setLoadingNextPage(isListLoading && page > 1),
    [isListLoading, page]
  );

  const totalPages = data?.total ? Math.ceil(data.total / pageSize) : 1;

  useEffect(() => {
    if (!data?.data) return;
    setItems((prev) => (page === 1 ? data.data : [...prev, ...data.data]));
  }, [data?.data, page]);

  // --- Fetch single item for editing ---
  const editingItemId =
    editorMode.type === "editing" ? editorMode.id : undefined;
  const { data: editingItem, isFetching: isItemLoading } = api.getOne({
    id: editingItemId,
  });

  // --- Mutations ---
  const createItem = api.create();
  const updateItem = api.update();
  const deleteItem = api.delete();

  const setItem = (item: T) => {
    setItems((prev) => prev.map((it) => (it.id === item.id ? item : it)));
  };

  const setLoading = (id: string, loadingMsg: string | null) => {
    console.log("Setting loading state:", id, loadingMsg);
    setRowsLoading((map) => {
      const newMap = { ...map };
      if (loadingMsg) {
        newMap[id] = loadingMsg;
      } else {
        delete newMap[id];
      }
      return newMap;
    });
  };

  const handleSave = useCallback(
    async (item: T, isNew: boolean) => {
      closeEditor();
      setErrorMsg(null);
      let tempId = isNew ? "__new__" : item.id!;

      // Optimistically add or update the item in the list
      setItems((prev) => {
        if (isNew) return [{ ...item, id: tempId }, ...prev];
        return prev.map((it) => (it.id === tempId ? item : it));
      });

      setRowsLoading((map) => ({
        ...map,
        [tempId]: `${isNew ? "Creating" : "Updating"} ${objectName}...`,
      }));

      if (preSaveHook) item = await preSaveHook(item, isNew);

      try {
        console.log("Saving item:", item);
        const saved = isNew
          ? await createItem.mutateAsync(item)
          : await updateItem.mutateAsync(item as any);

        if (!saved) {
          setItems((prev) => prev.filter((it) => it.id !== tempId));
          setErrorMsg("Item could not be saved.");
        } else {
          setItems((prev) => prev.map((it) => (it.id === tempId ? saved : it)));
        }
      } catch (err) {
        setItems((prev) => prev.filter((it) => it.id !== tempId));
        setErrorMsg("Item could not be saved.");
      } finally {
        setRowsLoading((map) => {
          const newMap = { ...map };
          delete newMap[tempId];
          return newMap;
        });
      }
    },
    [createItem, updateItem, preSaveHook, closeEditor, setItems, setRowsLoading]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm(`Delete ${objectName}? This cannot be undone.`))
        return;

      // Close editor immediately
      closeEditor();

      await withRowAction(
        async () => {
          await deleteItem.mutateAsync(id);
          setItems((prev) => prev.filter((it) => it.id !== id));
        },
        id,
        `Deleting ${objectName}...`
      );
    },
    [deleteItem, withRowAction, objectName, closeEditor]
  );

  // --- Render ---
  const columnsWithMenu = [
    {
      id: "menu",
      label: "",
      width: "48px",
      render: (row: T) => (
        <KebabMenu
          options={[
            {
              label: "Edit",
              onClick: () => openEdit(row),
            },
            {
              label: "Delete",
              onClick: () => handleDelete(row.id!),
              className: "text-red-600",
            },
          ]}
        />
      ),
    },
    ...columns,
  ];

  return (
    <div className="flex flex-col h-full min-h-0 w-full min-w-0">
      {errorMsg && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded p-2 mb-2 text-center">
          {errorMsg}
        </div>
      )}
      {/* Editor */}
      {Editor && (
        <CrudEditorWrapper
          objectName={objectName}
          Editor={Editor}
          editorMode={editorMode}
          editingItem={editingItem}
          isItemLoading={isItemLoading}
          handleSave={handleSave}
          handleDelete={handleDelete}
          closeEditor={closeEditor}
        />
      )}

      {/* Header */}
      <div className="flex flex-row w-full bg-background border-b items-center gap-sm p-sm">
        <Button onClick={openCreate}>{`Add ${objectName}`}</Button>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder={`Search ${objectsName}...`}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Search
            className="text-primary absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            size={20}
            onClick={() => setPage(1)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 overflow-auto">
        <DynamicTable<T>
          objectsName={objectsName}
          columns={columnsWithMenu}
          data={items}
          loading={page === 1 && isListLoading}
          loadingNextPage={loadingNextPage}
          rowsLoading={rowsLoading}
          page={page}
          totalPages={totalPages}
          onRowClick={openEdit}
          rowActions={{ setItem, setLoading }}
          onEndReached={() => {
            if (page < totalPages && !isListLoading)
              setPage((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
}
