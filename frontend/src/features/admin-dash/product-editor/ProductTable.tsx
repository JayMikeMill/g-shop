// src/features/admin-dash/product-editor/ProductTable.tsx
import type { Product } from "@shared/types/Product";
import { priceToFloat } from "@shared/types/Product";
import { DynamicTable, Button } from "@components/ui";

interface ProductTableProps {
  products: Product[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick: (product: Product) => void;
  onAddClick: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

export function ProductTable({
  products,
  loading,
  page = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  onAddClick,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: ProductTableProps) {
  return (
    <DynamicTable<Product>
      data={products}
      loading={loading}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      searchable={!!onSearchChange && !!onSearchSubmit}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
      objectsName="Products"
      headerButton={<Button onClick={onAddClick}>Add Product</Button>}
      columns={[
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
              <span className="font-semibold text-center text-text">
                {p.name}
              </span>
            </div>
          ),
        },
        {
          id: "price",
          label: "Price",
          sortable: true,
          render: (p: Product) => (
            <div className="flex items-center justify-center">
              <span className="font-semibold text-center text-text">
                {priceToFloat(p.price).toFixed(2)}
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
      ]}
    />
  );
}

export default ProductTable;
