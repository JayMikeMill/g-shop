// src/pages/admin/AdminCatalogPages.tsx
import {
  AdminCrudPage,
  CategoryDialog,
  CollectionDialog,
  collectionTable,
} from "@features/admin-dash";
import type { Category, Collection } from "shared/types";
import { uploadCollectionImages } from "@utils/dataImagesProcessing";

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
