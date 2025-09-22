// controllers/catalog-controller.ts
import { parseQueryOptions } from "@shared/types/query-options";
import { CatalogService } from "@services/catalog-service";
import {
  createCrudHandler,
  createCrudDeleteHandler,
} from "@utils/crud-handler";

// -------------------- CATEGORY --------------------
export const createCategory = createCrudHandler((req) =>
  CatalogService.createCategory(req.body)
);

export const getCategory = createCrudHandler(
  (req) => CatalogService.getCategory(req.params.id),
  "Category not found"
);

export const getCategories = createCrudHandler((req) =>
  CatalogService.getCategories(parseQueryOptions(req.query))
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
  CatalogService.getCollections(parseQueryOptions(req.query))
);

export const updateCollection = createCrudHandler(
  (req) => CatalogService.updateCollection(req.params.id, req.body),
  "Collection not found"
);

export const deleteCollection = createCrudDeleteHandler(
  (req) => CatalogService.deleteCollection(req.params.id),
  "Collection deleted"
);

// -------------------- TAG --------------------
export const createTag = createCrudHandler((req) =>
  CatalogService.createTag(req.body)
);

export const getTag = createCrudHandler(
  (req) => CatalogService.getTag(req.params.id),
  "Tag not found"
);

export const getTags = createCrudHandler((req) =>
  CatalogService.getTags(parseQueryOptions(req.query))
);

export const updateTag = createCrudHandler(
  (req) => CatalogService.updateTag(req.params.id, req.body),
  "Tag not found"
);

export const deleteTag = createCrudDeleteHandler(
  (req) => CatalogService.deleteTag(req.params.id),
  "Tag deleted"
);
