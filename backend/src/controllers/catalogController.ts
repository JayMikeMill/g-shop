// controllers/Catalog-controller.ts
import { parseQueryObject } from "@shared/types/QueryObject";
import { CatalogService } from "@services/CatalogService";
import { createCrudHandler, createCrudDeleteHandler } from "@utils/crudHandler";

// -------------------- CATEGORY --------------------
export const createCategory = createCrudHandler((req) =>
  CatalogService.createCategory(req.body)
);

export const getCategory = createCrudHandler(
  (req) => CatalogService.getCategory(req.params.id),
  "Category not found"
);

export const getCategories = createCrudHandler((req) =>
  CatalogService.getCategories(parseQueryObject(req.query))
);

export const updateCategory = createCrudHandler(
  (req) => CatalogService.updateCategory(req.params.id, req.body),
  "Category not found"
);

export const deleteCategory = createCrudDeleteHandler(
  (req) => CatalogService.deleteCategory(req.params.id),
  "Category deleted"
);

// -------------------- COLLECTION --------------------
export const createCollection = createCrudHandler((req) =>
  CatalogService.createCollection(req.body)
);

export const getCollection = createCrudHandler(
  (req) => CatalogService.getCollection(req.params.id),
  "Collection not found"
);

export const getCollections = createCrudHandler((req) =>
  CatalogService.getCollections(parseQueryObject(req.query))
);

export const updateCollection = createCrudHandler(
  (req) => CatalogService.updateCollection(req.params.id, req.body),
  "Collection not found"
);

export const deleteCollection = createCrudDeleteHandler(
  (req) => CatalogService.deleteCollection(req.params.id),
  "Collection deleted"
);
