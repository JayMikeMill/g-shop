// AdminCatalogPage.tsx
import { useState } from "react";

// Components
import {
  Button,
  buttonVariants,
  CircleSpinner,
  DynamicTable,
} from "@components/ui";
import { CatalogDialog } from "@features/admin-dash/catalog-editor/CollectionDialog";
import { CollectionTable } from "@features/admin-dash/catalog-editor/CatalogTable";

import type { Category, Collection } from "@shared/types/Catalog";

// API hook
import { useApi } from "@api/useApi";
import { NavLink, Outlet } from "react-router-dom";
import type { QueryObject } from "@shared/types/QueryObject";

export default function AdminCatalogPageWrapper() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Secondary Catalog Navigation */}
      <nav className="flex gap-2 p-2 py-4 border-b border-border overflow-x-auto whitespace-nowrap">
        <NavLink
          to="categories"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="collections"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Collections
        </NavLink>
      </nav>

      {/* Nested catalog content */}
      <div className="flex-grow overflow-y-auto p-2">
        <Outlet />
      </div>
    </div>
  );
}

interface AdminCatalogPageProps {
  apiKey: "categories" | "collections";
  typeLabel: "Category" | "Collection";
}

export function AdminCatalogPage({ apiKey, typeLabel }: AdminCatalogPageProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingItem, setIsSavingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<Collection | Category | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 10;

  const api = useApi()[apiKey];

  // Fetch items
  const {
    data: itemsData,
    isLoading,
    refetch: refetchItems,
  } = api.getAll({ page, limit: pageSize, search } as QueryObject);

  const itemList = itemsData?.data ?? [];
  const totalPages = itemsData?.total
    ? Math.ceil(itemsData.total / pageSize)
    : 1;

  // Mutation hooks
  const createItem = api.create();
  const updateItem = api.update();
  const deleteItem = api.delete();

  const clearState = () => {
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleDialogSave = async (
    item: Collection | Category,
    isNew: boolean
  ) => {
    setIsSavingItem(true);
    try {
      if (isNew) await createItem.mutateAsync(item);
      else await updateItem.mutateAsync(item as Collection & { id: string });
      clearState();
    } catch (err: any) {
      alert(`Failed to save ${typeLabel}: ${err.message}`);
    } finally {
      setIsSavingItem(false);
    }
    refetchItems();
  };

  const handleDialogDelete = async (itemId: string) => {
    if (!itemId) return;
    try {
      await deleteItem.mutateAsync(itemId);
      clearState();
    } catch (err: any) {
      alert(`Failed to delete ${typeLabel}: ${err.message}`);
    }
    refetchItems();
  };

  const handleDialogCancel = () => {
    clearState();
  };

  return (
    <div className="pt-lg pb-lg">
      {/* Catalog dialog */}
      <CatalogDialog
        open={editingItem !== null || isCreating}
        item={editingItem}
        onCreate={(i) => handleDialogSave(i, true)}
        onModify={(i) => handleDialogSave(i, false)}
        onDelete={() => editingItem?.id && handleDialogDelete(editingItem.id)}
        onCancel={handleDialogCancel}
        typeLabel={typeLabel}
        apiKey={apiKey}
      />

      {/* Spinner overlay */}
      {isSavingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner
            text={`${isCreating ? "Creating" : "Modifying"} ${typeLabel}...`}
          />
        </div>
      )}

      {/* Collection table */}
      <CollectionTable
        data={itemList}
        loading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setPage(1)} // reset page when searching
        onRowClick={setEditingItem}
        onAddClick={() => setIsCreating(true)}
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
