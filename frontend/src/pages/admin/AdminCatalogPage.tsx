// AdminCatalogPage.tsx
// Components
import { NavButton } from "@components/ui";

import {
  AdminCrudPage,
  CategoryDialog,
  CollectionDialog,
  collectionTable,
} from "@features/admin-dash";

import type { Category, Collection } from "@shared/types";
import { uploadCollectionImages } from "@utils/dataImagesProcessing";

// API hook
import { Outlet } from "react-router-dom";

export default function AdminCatalogPageWrapper() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Secondary Catalog Navigation */}
      <nav className="flex justify-center border-b h-12 overflow-x-auto whitespace-nowrap">
        <NavButton
          to="/admin/catalog/categories"
          label="Categories"
          className=" w-1/2 sm:w-60"
        />
        <NavButton
          to="/admin/catalog/collections"
          label="Collections"
          className=" w-1/2 sm:w-60"
        />
      </nav>

      {/* Nested catalog content */}
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export function AdminCollectionsPage() {
  return (
    <AdminCrudPage<Collection>
      objectsName="Collections"
      objectName="Collection"
      apiKey="collections"
      tableLayout={collectionTable}
      preSaveHook={uploadCollectionImages}
      Editor={CollectionDialog}
    />
  );
}

export function AdminCategoriesPage() {
  return (
    <AdminCrudPage<Category>
      objectsName="Categories"
      objectName="Category"
      apiKey="categories"
      tableLayout={collectionTable}
      preSaveHook={uploadCollectionImages}
      Editor={CategoryDialog}
    />
  );
}
