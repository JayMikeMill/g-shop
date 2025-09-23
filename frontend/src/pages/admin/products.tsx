import { useState, useEffect } from "react";
import type { Product } from "@shared/types/Product";
import ProductDialog from "@components/dialogs/ProductDialog";
import { useAdminPageHeader } from "@pages/admin/AdminDashboard";
import { useApi } from "@api/useApi";
import DynamicTable from "@components/DynamicTable";

export default function Products() {
  const { setPageHeader } = useAdminPageHeader();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [tableKey, setTableKey] = useState(0);

  const { getProducts } = useApi();

  // Set the page header
  useEffect(() => {
    const headerContent = (
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-semibold m-0 text-text">Products</h2>
        <button className="btn-primary" onClick={() => setIsAdding(true)}>
          Add Product
        </button>
      </div>
    );
    setPageHeader(headerContent);
    return () => setPageHeader(null);
  }, [isAdding, setPageHeader]);

  const handleDialogClose = () => {
    setIsAdding(false);
    setEditingProduct(null);
    setTableKey((prev) => prev + 1);
  };

  return (
    <div className="pt-lg pb-lg">
      {/* Product dialog */}
      {(isAdding || editingProduct) && (
        <ProductDialog product={editingProduct} onClose={handleDialogClose} />
      )}

      {/* Product list */}

      <DynamicTable
        fetchPage={getProducts}
        key={tableKey}
        onRowClick={(p) => setEditingProduct(p)}
        columns={[
          {
            id: "image",
            label: "Image",
            width: "120px",
            render: (p) =>
              p.images?.[0] ? (
                <div className="flex items-center justify-center">
                  <img
                    src={p.images?.[0].thumbnail}
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
            render: (p) => (
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
            render: (p) => (
              <div className="flex items-center justify-center">
                <span className="font-semibold text-center text-text">
                  {p.price.toFixed(2)}
                </span>
              </div>
            ),
          },
          {
            id: "tags",
            width: "120px",
            label: "Tags",
            render: (p) => (
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
            render: (p) => (
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
    </div>
  );
}
