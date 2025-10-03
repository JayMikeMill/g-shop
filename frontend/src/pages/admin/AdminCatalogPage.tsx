// AdminCatalogPage.tsx
// Components
import { buttonVariants } from "@components/ui";

import {
  AdminCrudPage,
  CategoryDialog,
  CollectionDialog,
  collectionTableColumns,
} from "@features/admin-dash";

import type { Category, Collection } from "@shared/types/Catalog";

// API hook
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

export function AdminCollectionsPage() {
  return (
    <AdminCrudPage<Collection>
      objectsName="Collection"
      apiKey="collections"
      columns={collectionTableColumns}
      Editor={CollectionDialog}
    />
  );
}

export function AdminCategoriesPage() {
  return (
    <AdminCrudPage<Category>
      objectsName="Category"
      apiKey="categories"
      columns={collectionTableColumns}
      Editor={CategoryDialog}
    />
  );
}
