// controllers/product-controller.ts
import { parseQueryOptions } from "@shared/types/query-options";
import { ProductService } from "@services/ProductService";
import { createCrudHandler, createCrudDeleteHandler } from "@utils/crudHandler";

// -------------------- PRODUCTS --------------------
export const createProduct = createCrudHandler((req) =>
  ProductService.createProduct(req.body)
);

export const getProduct = createCrudHandler(
  (req) => ProductService.getProduct(req.params.id),
  "Product not found"
);

export const getProducts = createCrudHandler((req) =>
  ProductService.getProducts(parseQueryOptions(req.query))
);

export const updateProduct = createCrudHandler(
  (req) => ProductService.updateProduct(req.params.id, req.body),
  "Product not found"
);

export const deleteProduct = createCrudDeleteHandler(
  (req) => ProductService.deleteProduct(req.params.id),
  "Product deleted",
  "Product not found" // 404 if delete returns false
);

// -------------------- PRODUCT OPTIONS PRESETS --------------------
export const createProductOptionsPreset = createCrudHandler((req) =>
  ProductService.createProductOptionsPreset(req.body)
);

export const getProductOptionsPresets = createCrudHandler((req) =>
  ProductService.getProductOptionsPresets()
);

export const deleteProductOptionsPreset = createCrudDeleteHandler(
  (req) => ProductService.deleteProductOptionsPreset(req.params.id),
  "Product options preset deleted",
  "Preset not found"
);
