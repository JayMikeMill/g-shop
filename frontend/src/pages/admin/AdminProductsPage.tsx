// AdminProductsPage.tsx
import {
  AdminCrudPage,
  ProductEditorDialog,
  productTableColumns,
} from "@features/admin-dash";
import type { Product } from "@shared/types";

export default function AdminProductsPage() {
  return (
    <AdminCrudPage<Product>
      objectName="Product"
      objectsName="Products"
      apiKey="products"
      columns={productTableColumns}
      Editor={ProductEditorDialog}
      pageSize={5}
      searchable={true}
    />
  );
}
