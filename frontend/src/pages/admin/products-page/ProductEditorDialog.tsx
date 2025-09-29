// src/components/ProductDialog.tsx
import React, { useState, useEffect } from "react";

// UI Components
import { AnimatedDialog } from "@components/controls/AnimatedDialog";

// Types
import {
  type Product,
  type ProductImageSet,
  emptyProduct,
} from "@shared/types/Product";

// Editors
import ProductOptionsEditor from "./ProductOptionsEditor";
import { ProductStockEditor, ProductStockHeader } from "./ProductStockEditor";
import ProductTagsEditor from "./ProductTagsEditor";
import ProductImagesEditor from "./ProductImagesEditor";

// API
import { useApi } from "@api/useApi";
import ProductInfoEditor from "./ProductInfoEditor";
import AnimatedDropdownSurface from "@components/controls/AnimatedDropdownSurface";

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onSave: () => void;
  onCancel?: () => void;
}

export const ProductEditorDialog: React.FC<ProductDialogProps> = ({
  product,
  open,
  onSave,
  onCancel,
}) => {
  const [localProduct, setLocalProduct] = useState<Product>(emptyProduct);

  const [isAdding, setIsAdding] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const { products, uploadImage } = useApi();

  // Sync local product when dialog opens
  useEffect(() => {
    // Closing dialog
    if (!open) {
      clearProduct();
      return;
      // Adding new product
    } else if (!product) {
      clearProduct();
      setIsAdding(true);
      return;
    }

    // Editing existing product

    setIsAdding(false);
    setLocalProduct(product);
  }, [open, product]);

  const handleCancel = () => {
    clearProduct();
    onCancel?.();
  };

  const clearProduct = () => {
    setLocalProduct(emptyProduct);
    setIsAdding(false);
  };

  const handleDelete = async () => {
    if (!localProduct.id) return onSave();

    const confirmed = window.confirm(
      `Are you sure you want to delete ${localProduct.name}?`
    );
    if (!confirmed) return;

    await products.delete(localProduct.id);
    onSave();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!localProduct.images || localProduct.images.length === 0) {
      alert("At least one image is required");
      return;
    }

    if (isProcessingImages) {
      alert("Please wait for images to finish processing.");
      return;
    }

    setIsSavingProduct(true);

    try {
      const uploadedImages: ProductImageSet[] = [];

      for (const img of localProduct.images) {
        if (img.main.startsWith("blob:")) {
          const blobM = await fetch(img.main).then((r) => r.blob());
          const blobP = await fetch(img.preview).then((r) => r.blob());
          const blobT = await fetch(img.thumbnail).then((r) => r.blob());

          const uploadedMain = await uploadImage(blobM, `product_main`);
          const uploadedPreview = await uploadImage(blobP, `product_preview`);
          const uploadedThumbnail = await uploadImage(blobT, `product_thumb`);

          uploadedImages.push({
            main: uploadedMain.url,
            preview: uploadedPreview.url,
            thumbnail: uploadedThumbnail.url,
          });
        } else {
          uploadedImages.push(img);
        }
      }

      const productToSave: Product = {
        ...localProduct,
        images: uploadedImages,
      };

      if (localProduct.id) {
        await products.update({
          ...productToSave,
          id: localProduct.id as string,
        });
      } else {
        await products.create(productToSave);
      }

      setIsSavingProduct(false);
      clearProduct();
      onSave();
    } catch (err: any) {
      setIsSavingProduct(false);
      alert(err.message || "Error saving product");
    }
  };

  console.log("Rendering ProductEditorDialog", {
    open,
    isAdding,
    localProduct,
  });

  const shouldRender = isAdding || localProduct.id != undefined;
  const hasVariants = !!localProduct.options?.length;

  return (
    <AnimatedDialog
      title={isAdding ? "Add Product" : "Edit Product"}
      open={shouldRender}
      onClose={handleCancel}
      className="dialog-box rounded-none sm:rounded-2xl pl-2 w-full h-full sm:h-[90vh] sm:max-w-4xl flex flex-col overflow-hidden px-2 sm:px-8"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 overflow-hidden border-t"
      >
        <div className="flex flex-1 flex-col sm:flex-row sm:gap-md overflow-hidden min-h-0">
          {/* Main Editor */}
          <div className="flex-1 flex flex-col gap-md overflow-y-auto py-4 sm:border sm:rounded-lg sm:mt-4">
            {/* Editors */}
            <div className="flex flex-col gap-4">
              {/* Info Editor */}
              <AnimatedDropdownSurface
                title="Product Info"
                openInitially={true}
              >
                <ProductInfoEditor
                  product={localProduct}
                  setProduct={setLocalProduct}
                />
              </AnimatedDropdownSurface>

              {/* Tags Editor */}
              <AnimatedDropdownSurface title="Tags" openInitially={true}>
                <ProductTagsEditor
                  product={localProduct}
                  setProduct={setLocalProduct}
                  openInitially={true}
                />
              </AnimatedDropdownSurface>

              {/* Options Editor */}
              <AnimatedDropdownSurface
                title="Product Options"
                openInitially={true}
              >
                <ProductOptionsEditor
                  product={localProduct}
                  setProduct={setLocalProduct}
                  openInitially={true}
                />
              </AnimatedDropdownSurface>

              {/* Stock Editor */}
              <AnimatedDropdownSurface
                customTitle={
                  <ProductStockHeader
                    product={localProduct}
                    setProduct={setLocalProduct}
                  />
                }
                openInitially={hasVariants}
                disabled={!hasVariants}
              >
                <ProductStockEditor
                  product={localProduct}
                  setProduct={setLocalProduct}
                  openInitially={true}
                />
              </AnimatedDropdownSurface>
            </div>

            <button
              className="btn-normal h-12"
              type="button"
              onClick={handleDelete}
            >
              Delete Product
            </button>
          </div>

          {/* Image Editor */}
          <div className=" flex flex-col flex-shrink-0  sm:w-1/3 sm:border-t sm:border sm:mt-4">
            <span className="text-xl font-semibold text-text text-center rounded-t-sm py-2 hidden hidden sm:block">
              Product Images
            </span>
            <ProductImagesEditor
              className="sm:border-0"
              images={localProduct.images ?? []}
              onImagesChange={(imgs) =>
                setLocalProduct((prev) => ({ ...prev, images: imgs }))
              }
              setIsProcessingImages={setIsProcessingImages}
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="w-full flex flex-row gap-2 px-4 sm:px-40 items-center py-4 border-border flex-shrink-0">
          <button
            className="btn-cancel w-full h-12"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-normal w-full h-12 whitespace-nowrap"
            disabled={isProcessingImages || isSavingProduct}
          >
            {isSavingProduct
              ? "Saving..."
              : isProcessingImages
                ? "Processing Images..."
                : localProduct.id
                  ? "Save Changes"
                  : "Add Product"}
          </button>
        </div>
      </form>
    </AnimatedDialog>
  );
};
