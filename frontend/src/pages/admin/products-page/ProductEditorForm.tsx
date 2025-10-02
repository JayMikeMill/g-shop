// src/components/ProductDialog.tsx
import React, { useState, useEffect } from "react";

// UI Components
import { AnimatedDropdownBox, AnimatedSelect, Button } from "@components/ui";

// Types
import {
  type Product,
  type ProductImageSet,
  emptyProduct,
} from "@shared/types/Product";

// Editors
import ProductInfoEditor from "./ProductInfoEditor";
import ProductTagsEditor from "./ProductTagsEditor";
import ProductOptionsEditor from "./ProductOptionsEditor";

import {
  ProductVariantEditor,
  ProductVariantHeader,
} from "./ProductVariantEditor";

import ProductDimensionsEditor from "./ProductDimensionsEditor";
import ProductImageProcessor from "./ProductImagesProcessor";
import { MultiImageEditor } from "@components/ui";

interface ProductEditorFormProps {
  product: Product | null;
  onCreate: (product: Product) => void;
  onModify: (product: Product & { id: string }) => void;
  onDelete: (productId: string) => void;
  onCancel: () => void;
}

export const ProductEditorForm: React.FC<ProductEditorFormProps> = ({
  product,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => {
  const [localProduct, setLocalProduct] = useState<Product>(emptyProduct);

  const [isAdding, setIsAdding] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // Sync local product when dialog opens
  useEffect(() => {
    console.log("ProductEditorForm - product changed:", product);
    // Creating new product
    if (product) {
      setLocalProduct(product);
      setIsAdding(false);
      // Editing existing product
    } else {
      clearProduct();
      setIsAdding(true);
      return;
    }
  }, [product]);

  const handleCancel = () => {
    clearProduct();
    onCancel();
  };

  const clearProduct = () => {
    setLocalProduct(emptyProduct);
    setIsAdding(false);
  };

  const handleDelete = async () => {
    if (!localProduct.id) {
      alert("Cannot delete a product that hasn't been created yet.");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${localProduct.name}?`
    );

    if (!confirmed) return;

    onDelete(localProduct.id);
  };

  const handleSave = async () => {
    if (!localProduct.images || localProduct.images.length === 0) {
      alert("At least one image is required");
      return;
    }

    if (isProcessingImages) {
      alert("Please wait for images to finish processing.");
      return;
    }

    setIsSavingProduct(true);

    // Call appropriate handler
    if (isAdding) {
      await onCreate(localProduct);
    } else if (localProduct.id) {
      await onModify(localProduct as Product & { id: string });
    }

    setIsSavingProduct(false);
    clearProduct();
  };

  const hasVariants = !!localProduct.options?.length;

  return (
    <div className="flex flex-col flex-1 overflow-hidden border-t">
      <div className="flex flex-1 flex-col sm:flex-row sm:gap-md sm:py-md overflow-hidden min-h-0">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col gap-md overflow-y-auto pb-md sm:border sm:rounded-lg">
          {/* Editors */}
          <div className="flex flex-col gap-md p-sm">
            {/* Info Editor */}
            <AnimatedDropdownBox title="Product Info" openInitially={true}>
              <ProductInfoEditor
                product={localProduct}
                setProduct={setLocalProduct}
              />
            </AnimatedDropdownBox>

            {/* Tags Editor */}
            <AnimatedDropdownBox title="Product Tags" openInitially={true}>
              <ProductTagsEditor
                product={localProduct}
                setProduct={setLocalProduct}
                openInitially={true}
              />
            </AnimatedDropdownBox>

            {/* Dimensions Editor */}
            <AnimatedDropdownBox title="Dimensions" openInitially={true}>
              <ProductDimensionsEditor
                product={localProduct}
                setProduct={setLocalProduct}
              />
            </AnimatedDropdownBox>

            {/* Options Editor */}
            <AnimatedDropdownBox title="Options" openInitially={true}>
              <ProductOptionsEditor
                product={localProduct}
                setProduct={setLocalProduct}
              />
            </AnimatedDropdownBox>

            {/* Stock Editor */}
            <AnimatedDropdownBox
              customTitle={
                <ProductVariantHeader
                  product={localProduct}
                  setProduct={setLocalProduct}
                />
              }
              openInitially={hasVariants}
              disabled={!hasVariants}
            >
              <ProductVariantEditor
                product={localProduct}
                setProduct={setLocalProduct}
              />
            </AnimatedDropdownBox>
          </div>

          {/* Delete Button */}
          {!isAdding && (
            <Button
              variant="destructive"
              className="h-12 w-1/2 self-center"
              onClick={handleDelete}
            >
              Delete Product
            </Button>
          )}
        </div>

        {/* Image Editor */}
        <div className=" flex flex-col flex-shrink-0  pb-md gap-md sm:w-1/3 sm:pb-0">
          <MultiImageEditor<ProductImageSet>
            className=""
            images={localProduct.images ?? []}
            onImagesChange={(imgs) =>
              setLocalProduct((prev) => ({
                ...prev,
                images: imgs as ProductImageSet[],
              }))
            }
            processor={ProductImageProcessor.process}
            getPreview={(item: ProductImageSet) => item.preview}
            setIsProcessingImages={setIsProcessingImages}
          />

          {/* Footer Buttons */}
          <div className="w-full flex flex-row gap-2 sm:px-0 items-center sm:flex-col sm:gap-2">
            <Button
              className="w-full h-12 sm:hidden"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="w-full h-12"
              disabled={isProcessingImages || isSavingProduct}
              onClick={handleSave}
            >
              {isSavingProduct
                ? "Saving..."
                : isProcessingImages
                  ? "Processing Images..."
                  : localProduct.id
                    ? "Save Changes"
                    : "Create Product"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
