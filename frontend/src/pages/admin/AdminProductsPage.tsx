// Admin product dashboard page
import { useState } from "react";

// UI Components
import {
  AnimatedDialog,
  DynamicTable,
  CircleSpinner,
  Button,
} from "@components/ui";
import { ProductEditorForm } from "@features/admin-dash/product-editor/ProductEditorForm";

// Types
import { priceToFloat, type Product } from "@shared/types/Product";

// API
import { useApi } from "@api/useApi";

export default function AdminProductsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [tableKey, setTableKey] = useState(0);

  const { products, uploadImage } = useApi();
  const getProducts = products.getAll;

  const saveProductImages = async (product: Product) => {
    console.log("Processing images for product:", product);

    for (const img of product.images) {
      if (img.main.startsWith("blob:")) {
        const blobM = await fetch(img.main).then((r) => r.blob());
        const blobP = await fetch(img.preview).then((r) => r.blob());
        const blobT = await fetch(img.thumbnail).then((r) => r.blob());

        const uploadedMain = await uploadImage(blobM, `product_main`);
        const uploadedPreview = await uploadImage(blobP, `product_preview`);
        const uploadedThumbnail = await uploadImage(blobT, `product_thumb`);

        img.main = uploadedMain.url;
        img.preview = uploadedPreview.url;
        img.thumbnail = uploadedThumbnail.url;
      }
    }
  };

  const clearState = (refreshTable: boolean = true) => {
    setIsCreating(false);
    setEditingProduct(null);
    if (refreshTable) setTableKey((k) => k + 1);
  };

  const handleDialogSave = async (product: Product, isNew: boolean) => {
    console.log("Creating product:", product);
    setIsSavingProduct(true);
    await saveProductImages(product);
    if (isNew) {
      await products.create(product);
    } else {
      await products.update(product as Product & { id: string });
    }
    setIsSavingProduct(false);
    clearState();
  };

  const handleDialogDelete = async (productId: string) => {
    console.log("Deleting product:", productId);
    await products.delete(productId);
    clearState();
  };

  const handleDialogCancel = () => {
    clearState(false);
  };

  if (editingProduct) console.log("Editing product:", editingProduct);

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

      {/* Spinner overlay OUTSIDE the dialog */}
      {isSavingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner
            text={`${isCreating ? "Creating" : "Modifying"} Product...`}
          />
        </div>
      )}

      {/* Product list */}
      <DynamicTable
        fetchPage={getProducts}
        key={tableKey}
        onRowClick={(p) => setEditingProduct(p)}
        objectsName="Products"
        headerButton={
          <Button onClick={() => setIsCreating(true)}>Add Product</Button>
        }
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
                  {priceToFloat(p.price).toFixed(2)}
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
