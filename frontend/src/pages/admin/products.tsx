// frontend/src/pages/admin/products.tsx
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@contexts/auth-context";
import LoginDialog from "@components/login-dialog";
import type { Product } from "@models/product";
import AdminProductList from "@components/admin-product-list";
import ProductDialog from "@components/product-dialog";
import { useAdminPageHeader } from "@pages/admin/dashboard";
import { getProducts, deleteProduct } from "@services/product-service";

export default function Products() {
  const { user, loading: authLoading } = useAuth();
  const { setPageHeader } = useAdminPageHeader();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  if (!authLoading && !user) {
    return <LoginDialog />;
  }

  useEffect(() => {
    const headerContent = (
      <>
        <h2>Products</h2>
        <button onClick={() => setIsAdding(true)} className="admin-add-button">Add Product</button>
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

  if (loading) return <p className="loading-text">Loading products...</p>;
  if (error) return <p className="error-text">Error loading products: {error.message}</p>;

  return (
    <div className="admin-products-page">
      {(isAdding || editingProduct) && (
        <ProductDialog
          product={editingProduct}
          onClose={handleDialogClose}
        />
      )}
      <AdminProductList
          products={sortedProducts}
          onEdit={setEditingProduct}
          onDelete={handleDeleteProduct}
      />
    </div>
  );
}
