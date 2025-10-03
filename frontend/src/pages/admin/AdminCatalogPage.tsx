// AdminCatalogPage.tsx
import { useState } from "react";

// Components
import {
  Button,
  buttonVariants,
  CircleSpinner,
  DynamicTable,
} from "@components/ui";
import {
  CatalogDialog,
  CollectionDialog,
} from "@features/admin-dash/catalog-editor/CollectionDialog";

import type { Category, Collection } from "@shared/types/Catalog";

// API hook
import { useApi } from "@api/useApi";
import { NavLink, Outlet } from "react-router-dom";
import type { QueryObject } from "@shared/types/QueryObject";
import { AdminCrudPage } from "./AdminCrudPage";
import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";

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
      columns={tableColumns}
      Editor={CollectionEditor}
    />
  );
}

export function AdminCategoriesPage() {
  return (
    <AdminCrudPage<Category>
      objectsName="Category"
      apiKey="categories"
      columns={tableColumns}
      Editor={CategoryEditor}
    />
  );
}

// For collections
const CollectionEditor = (props: CrudEditorInterface<Collection>) => (
  <CatalogDialog {...props} typeLabel="Collection" apiKey="collections" />
);

// For categories
const CategoryEditor = (props: CrudEditorInterface<Category>) => (
  <CatalogDialog {...props} typeLabel="Category" apiKey="categories" />
);

const tableColumns = [
  { id: "name", label: "Name", render: (row: Collection) => row.name },
  { id: "slug", label: "Slug", render: (row: Collection) => row.slug },
  {
    id: "description",
    label: "Description",
    render: (row: Collection) => row.description?.slice(0, 50) + "...",
  },
];
