// src/features/admin-dash/product-editor/AdminProductsPage.tsx
import type { CrudEditorInterface } from "@features/admin-dash/CrudEditorInterface";
import { AdminCrudPage } from "./AdminCrudPage";
import { ProductEditorForm } from "@features/admin-dash/product-editor/ProductEditorForm";
import { priceToFloat, type Product } from "@shared/types/Product";
import { AnimatedDialog } from "@components/ui";

export default function AdminProductsPage() {
  return (
    <AdminCrudPage<Product>
      objectsName="Product"
      apiKey="products"
      columns={tableColumns}
      Editor={ProductEditorDialog}
      pageSize={5}
      searchable={true}
    />
  );
}

function ProductEditorDialog({
  open,
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}: CrudEditorInterface<Product>) {
  return (
    <AnimatedDialog
      open={!!open}
      onClose={onCancel}
      title={item?.id ? "Edit Product" : "Create Product"}
      className="flex flex-col overflow-hidden pl-2 w-full h-full sm:rounded-2xl sm:max-w-3xl px-md sm:px-lg"
    >
      <ProductEditorForm
        item={item}
        onCreate={onCreate}
        onModify={onModify}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    </AnimatedDialog>
  );
}

const tableColumns = [
  {
    id: "image",
    label: "Image",
    width: "120px",
    render: (p: Product) =>
      p.images?.[0] ? (
        <div className="flex items-center justify-center">
          <img
            src={p.images[0].thumbnail}
            className="w-20 h-20 object-cover rounded"
          />
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center bg-light rounded text-xs">
          No Image
        </div>
      ),
  },
  {
    id: "name",
    label: "Name",
    width: "120px",
    sortable: true,
    render: (p: Product) => (
      <div className="flex items-center justify-center">
        <span className="font-semibold text-center text-text">{p.name}</span>
      </div>
    ),
  },
  {
    id: "price",
    label: "Price",
    sortable: true,
    render: (p: Product) => (
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold text-center text-text">
          {priceToFloat(p.price).toFixed(2)}
        </span>
        <span className="font-semibold text-center text-red-400">
          {`-${p.discount}`}
        </span>
      </div>
    ),
  },
  {
    id: "tags",
    label: "Tags",
    width: "120px",
    render: (p: Product) => (
      <div className="flex items-center justify-center">
        <span className="font-semibold text-center text-text">
          {p.tags?.join(", ") || "N/A"}
        </span>
      </div>
    ),
  },
  {
    id: "description",
    label: "Description",
    width: "300px",
    render: (p: Product) => (
      <div className="flex items-top justify-left">
        <span className="font-semibold text-center text-text">
          {p.description}
        </span>
      </div>
    ),
  },
];
