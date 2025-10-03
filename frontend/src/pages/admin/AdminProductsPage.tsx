// AdminProductsPage.tsx
import {
  AdminCrudPage,
  ProductEditorDialog,
  productTableColumns,
} from "@features/admin-dash";
import { type Product } from "@shared/types/Product";

export default function AdminProductsPage() {
  return (
    <AdminCrudPage<Product>
      objectsName="Product"
      apiKey="products"
      columns={productTableColumns}
      Editor={ProductEditorDialog}
      pageSize={5}
      searchable={true}
    />
  );
}
