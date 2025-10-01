// AdminCatalogPage.tsx
import { useState } from "react";

// Components
import { DynamicTable } from "@components/UI";
import type { Category, Collection } from "@shared/types/Catalog";
import { CatalogDialog } from "./CollectionDialog";

// API hook
import { useApi } from "@api/useApi";

interface AdminCatalogPageProps {
  apiKey: "categories" | "collections";
  typeLabel: "Category" | "Collection";
}

export function AdminCatalogPage({ apiKey, typeLabel }: AdminCatalogPageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState<Collection | Category | null>(
    null
  );
  const [tableKey, setTableKey] = useState(0);

  const api = useApi()[apiKey];

  const clearState = () => {
    setIsAdding(false);
    setEditingItem(null);
    setTableKey((prev) => prev + 1);
  };

  const handleDialogCreate = (item: Collection | Category) => {
    api.create(item);
    console.log("Created item:", item);
    clearState();
  };

  const handleDialogModify = (item: Collection | Category) => {
    if (item && item.id) {
      api.update({ ...item, id: item.id as string });
      console.log("Modified item:", item);
      clearState();
    }
  };

  const handleDialogDelete = () => {
    api.delete(editingItem?.id as string);
    clearState();
  };

  const handleDialogCancel = () => {
    setIsAdding(false);
    setEditingItem(null);
  };

  return (
    <div className="pt-lg pb-lg">
      {/* Catalog dialog */}
      <CatalogDialog
        open={editingItem !== null || isAdding}
        item={editingItem}
        onCreate={handleDialogCreate}
        onModify={handleDialogModify}
        onDelete={handleDialogDelete}
        onCancel={handleDialogCancel}
        typeLabel={typeLabel}
        apiKey={apiKey}
      />

      {/* Catalog list */}
      <DynamicTable
        fetchPage={api.getAll}
        key={tableKey}
        onRowClick={(item: Collection | Category) => setEditingItem(item)}
        objectsName={typeLabel + "s"}
        headerButton={
          <button
            className="btn-normal whitespace-nowrap"
            onClick={() => setIsAdding(true)}
          >
            Add {typeLabel}
          </button>
        }
        columns={[
          {
            id: "name",
            label: "Name",
            sortable: true,
            render: (item: Collection | Category) => (
              <div className="flex items-center justify-center">
                <span className="font-semibold text-center text-text">
                  {item.name}
                </span>
              </div>
            ),
          },
          {
            id: "description",
            label: "Description",
            render: (item: Collection | Category) => (
              <div className="flex items-top justify-left">
                <span className="font-semibold text-text">
                  {item.description}
                </span>
              </div>
            ),
          },
        ]}
        pageSize={10}
        searchable={true}
      />
    </div>
  );
}

// Collections page
export function AdminCollectionsPage() {
  return <AdminCatalogPage apiKey="collections" typeLabel="Collection" />;
}

// Categories page
export function AdminCategoriesPage() {
  return <AdminCatalogPage apiKey="categories" typeLabel="Category" />;
}
