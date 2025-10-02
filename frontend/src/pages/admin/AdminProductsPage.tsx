import { useState } from "react";
import { AnimatedDialog, CircleSpinner } from "@components/ui";
import { ProductEditorForm } from "@features/admin-dash/product-editor/ProductEditorForm";
import { useApi } from "@api/useApi";
import type { Product } from "@shared/types/Product";
import { ProductTable } from "@features/admin-dash/product-editor/ProductTable";

export default function AdminProductsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [tableKey, setTableKey] = useState(0);

  const { products, uploadImage } = useApi();
  const getProducts = products.getAll;

  const clearState = (refreshTable = true) => {
    setIsCreating(false);
    setEditingProduct(null);
    if (refreshTable) setTableKey((k) => k + 1);
  };

  const handleDialogSave = async (product: Product, isNew: boolean) => {
    setIsSavingProduct(true);
    // handle image uploads...
    if (isNew) await products.create(product);
    else await products.update(product as Product & { id: string });
    setIsSavingProduct(false);
    clearState();
  };

  const handleDialogDelete = async (productId: string) => {
    await products.delete(productId);
    clearState();
  };

  const handleDialogCancel = () => {
    clearState(false);
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
        productsFetcher={getProducts}
        onRowClick={setEditingProduct}
        onAddClick={() => setIsCreating(true)}
        keyProp={tableKey}
      />
    </div>
  );
}
