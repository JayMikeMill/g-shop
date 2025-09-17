import { useState, useEffect } from "react";
import type { Product } from "@models/product";
import ProductDialog from "@components/dialogs/product-dialog";
import { useAdminPageHeader } from "@pages/admin/dashboard";
import { useApi } from "@api/use-api";
import DynamicTable from "@components/dynamic-table";

export default function Products() {
  const { setPageHeader } = useAdminPageHeader();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { getProducts, deleteProduct } = useApi();

  // Set the page header
  useEffect(() => {
    const headerContent = (
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-semibold m-0">Products</h2>
        <button className="btn-primary" onClick={() => setIsAdding(true)}>
          Add Product
        </button>
      </div>
    );
    setPageHeader(headerContent);
    return () => setPageHeader(null);
  }, [isAdding, setPageHeader]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDialogClose = () => {
    setIsAdding(false);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDeleteProduct = async (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      await deleteProduct(product.id);
      loadProducts();
    }
  };

  return (
    <div className="pt-lg pb-lg">
      {/* Product dialog */}
      {(isAdding || editingProduct) && (
        <ProductDialog product={editingProduct} onClose={handleDialogClose} />
      )}

      {/* Loading / Error */}
      {loading && (
        <p className="text-text-secondary text-center py-md text-[1.2rem]">
          Loading products...
        </p>
      )}
      {error && (
        <p className="text-error text-center py-md text-[1.2rem]">
          Error loading products: {error.message}
        </p>
      )}

      {/* Product list */}
      {!loading && !error && (
        <DynamicTable
          data={products}
          columns={[
            {
              id: "image",
              label: "Image",
              width: "120px",
              render: (p) =>
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
              render: (p) => (
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-center">{p.name}</span>
                </div>
              ),
            },
            {
              id: "price",
              label: "Price",
              sortable: true,
              render: (p) => (
                <div className="flex items-center justify-center">
                  <span className="font-semibold text-center">
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
                  <span className="font-semibold text-center">
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
                  <span className="font-semibold text-center">
                    {p.description}
                  </span>
                </div>
              ),
            },
          ]}
          actions={(p) => (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setEditingProduct(p)}
                className="btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProduct(p)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          )}
          pageSize={5}
          searchable={true}
        />
      )}
    </div>
  );
}
