// frontend/src/pages/admin/products.tsx
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

  if (!authLoading && !user) {
    return <LoginDialog />;
  }

  useEffect(() => {
    const headerContent = (
      <>
        <h2>Products</h2>
        <button 
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => setIsAdding(true)} 
        >Add Product</button>
      </>
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
    <div className="admin-products-page">
      {/* Always show the dialog if adding or editing */}
      {(isAdding || editingProduct) && (
        <ProductDialog
          product={editingProduct}
          onClose={handleDialogClose}
        />
      )}

      {/* Show loading or error messages, but keep the page functional */}
      {loading && <p className="loading-text">Loading products...</p>}
      {error && <p className="error-text">Error loading products: {error.message}</p>}

      {/* Show product list only if products exist */}
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
