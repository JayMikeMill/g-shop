import { useState } from "react";
import { AnimatedDialog, CircleSpinner } from "@components/ui";
import { ProductEditorForm } from "@features/admin-dash/product-editor/ProductEditorForm";
import { useApi } from "@api/useApi";
import type { Product } from "@shared/types/Product";
import { ProductTable } from "@features/admin-dash/product-editor/ProductTable";
import type { QueryObject } from "@shared/types/QueryObject";

export default function AdminProductsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const pageSize = 5; // adjust if needed

  const { products } = useApi();

  // Fetch products using hook, pass query
  const {
    data: productsData,
    isLoading,
    refetch: refetchProducts, // <-- get the refetch function
  } = products.getAll({ page, limit: pageSize, search } as QueryObject);

  const productList = productsData?.data ?? [];
  const totalPages = productsData?.total
    ? Math.ceil(productsData.total / pageSize)
    : 1;

  // Setup mutation hooks
  const createProduct = products.create();
  const updateProduct = products.update();
  const deleteProduct = products.delete();

  const clearState = () => {
    setIsCreating(false);
    setEditingProduct(null);
  };

  const handleDialogSave = async (product: Product, isNew: boolean) => {
    setIsSavingProduct(true);
    try {
      if (isNew) await createProduct.mutateAsync(product);
      else await updateProduct.mutateAsync(product as Product & { id: string });
      clearState();
    } catch (err: any) {
      alert("Failed to save product: " + err.message);
    } finally {
      setIsSavingProduct(false);
    }
    refetchProducts(); // Refresh product list after save
  };

  const handleDialogDelete = async (productId: string) => {
    if (!productId) return;
    try {
      await deleteProduct.mutateAsync(productId);
      clearState();
    } catch (err: any) {
      alert("Failed to delete product: " + err.message);
    }
    refetchProducts(); // Refresh product list after delete
  };

  const handleDialogCancel = () => {
    clearState();
  };

  return (
    <div className="pt-lg pb-lg">
      {/* Product dialog */}
      <AnimatedDialog
        open={editingProduct !== null || isCreating}
        title={isCreating ? "Create Product" : "Edit Product"}
        onClose={handleDialogCancel}
        className="flex flex-col overflow-hidden pl-2 w-full h-full 
					sm:rounded-2xl sm:max-w-3xl px-md sm:px-lg z-49"
      >
        <ProductEditorForm
          product={editingProduct}
          onCreate={(p) => handleDialogSave(p, true)}
          onModify={(p) => handleDialogSave(p, false)}
          onDelete={handleDialogDelete}
          onCancel={handleDialogCancel}
        />
      </AnimatedDialog>

      {/* Spinner overlay */}
      {isSavingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner
            text={`${isCreating ? "Creating" : "Modifying"} Product...`}
          />
        </div>
      )}

      {/* Product table */}
      <ProductTable
        products={productList}
        loading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        searchValue={search}
        onSearchChange={setSearch}
        onSearchSubmit={() => setPage(1)} // reset page when searching
        onRowClick={setEditingProduct}
        onAddClick={() => setIsCreating(true)}
      />
    </div>
  );
}
