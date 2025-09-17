import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@contexts/auth-context";
import LoginDialog from "@components/dialogs/login-dialog";
import type { Product } from "@models/product";
import AdminProductList from "@components/admin-product-list";
import ProductDialog from "@components/dialogs/product-dialog";
import { useAdminPageHeader } from "@pages/admin/dashboard";
import { useApi } from "@api/use-api";

export default function Products() {
  const { user, loading: authLoading } = useAuth();
  const { setPageHeader } = useAdminPageHeader();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { getProducts, deleteProduct } = useApi();

  if (!authLoading && !user) return <LoginDialog />;

  useEffect(() => {
    const headerContent = (
      <div className="flex justify-between items-center w-full">
        <h2 className="text-lg font-semibold m-0">Products</h2>
        <button
          className="px-md py-sm rounded font-semibold text-button-text bg-primary hover:brightness-90 transition-all duration-200"
          onClick={() => setIsAdding(true)}
        >
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

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name));
  }, [products]);

  return (
    <div className="p-lg">
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
        <AdminProductList
          products={sortedProducts}
          onEdit={setEditingProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}
