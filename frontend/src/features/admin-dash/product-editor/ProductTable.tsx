// src/features/admin-dash/product-editor/ProductTable.tsx
import type { Product } from "@shared/types/Product";
import { priceToFloat } from "@shared/types/Product";
import { DynamicTable, Button } from "@components/ui";
import type { QueryObject } from "@shared/types/QueryObject";

interface ProductTableProps {
  productsFetcher: (
    query?: QueryObject
  ) => Promise<{ data: Product[]; total: number }>;
  onRowClick: (product: Product) => void;
  onAddClick: () => void;
  keyProp?: number;
}

export function ProductTable({
  productsFetcher,
  onRowClick,
  onAddClick,
  keyProp,
}: ProductTableProps) {
  return (
    <DynamicTable
      fetchPage={productsFetcher}
      key={keyProp}
      onRowClick={onRowClick}
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
              <div
                className="w-20 h-20 flex items-center justify-center 
								bg-light rounded text-xs"
              >
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
          width: "120px",
          label: "Tags",
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
      pageSize={5}
      searchable={true}
    />
  );
}

export default ProductTable;
