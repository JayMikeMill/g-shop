// AdminCatalogPage.tsx
import { useState } from "react";

// Components
import { buttonVariants } from "@components/ui";
import { CatalogDialog } from "@features/admin-dash/catalog-editor/CollectionDialog";
import { CollectionTable } from "@features/admin-dash/catalog-editor/CatalogTable";

import type { Category, Collection } from "@shared/types/Catalog";

// API hook
import { useApi } from "@api/useApi";
import { NavLink, Outlet } from "react-router-dom";

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
    clearState();
  };

  const handleDialogModify = (item: Collection | Category) => {
    if (item && item.id) {
      api.update({ ...item, id: item.id as string });
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

      {/* Catalog table */}
      <CollectionTable
        fetcher={api.getAll}
        onRowClick={setEditingItem}
        onAddClick={() => setIsAdding(true)}
        typeLabel={typeLabel}
        keyProp={tableKey}
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
