// AdminProductsPage.tsx

import {
  AdminCrudPage,
  ProductEditorDialog,
  productTable,
} from "@features/admin-dash";

import type { Product } from "shared/types";
import { uploadProductImages } from "@utils/dataImagesProcessing";

export default function AdminProductsPage() {
  return (
    <AdminCrudPage<Product>
      objectName="Product"
      objectsName="Products"
      apiKey="products"
      tableLayout={productTable}
      Editor={ProductEditorDialog}
      pageSize={5}
      preSaveHook={uploadProductImages}
    />
  );
}
