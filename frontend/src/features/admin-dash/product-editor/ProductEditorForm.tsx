import React, { useEffect, useState } from "react";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";

// Types
import type { Product, ProductImageSet, SafeType } from "@shared/types";

// UI Components
import { AnimatedDropdownBox, Button } from "@components/ui";

// Image Editor & Processor
import { MultiImageEditor } from "@components/ui";
import { processProductImages } from "@utils/dataImagesProcessing";

// Forms
import type { CrudEditorInterface } from "../CrudEditorInterface";
import { ProductVariantForm, ProductVariantHeader } from "./ProductVariantForm";
import ProductOptionsForm from "./ProductOptionsForm";
import ProductDimensionsForm from "./ProductDimensionsForm";
import ProductTagsForm from "./ProductTagsForm";
import ProductInfoForm from "./ProductInfoForm";

export const newProduct: SafeType<Product> = {
  name: "",
  price: 0,
  description: "",
  status: "ACTIVE", // or whichever default makes sense
};

export const ProductEditorForm: React.FC<CrudEditorInterface<Product>> = ({
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);

  // --------------------------
  // Form Setup
  // --------------------------
  const methods = useForm<Product>({
    defaultValues: item ?? newProduct,
    mode: "onChange",
  });

  const { reset, handleSubmit, watch } = methods;

  // Watch options for variant toggle
  const options = watch("options");
  const images = watch("images");

  // --------------------------
  // Sync logic
  // --------------------------
  useEffect(() => {
    if (item?.id) {
      reset(item);
      setIsAdding(false);
    } else {
      reset(newProduct);
      setIsAdding(true);
    }
  }, [item, reset]);

  // --------------------------
  // Actions
  // --------------------------
  const handleCancel = () => {
    reset(newProduct);
    setIsAdding(false);
    onCancel();
  };

  const handleDelete = async () => {
    const product = methods.getValues();
    if (!product.id) {
      alert("Cannot delete a product that hasn't been created yet.");
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${product.name}?`))
      return;
    onDelete(product.id);
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (!data.images?.length) {
      alert("At least one image is required");
      return;
    }
    if (isProcessingImages) {
      alert("Please wait for images to finish processing.");
      return;
    }

    setIsSavingProduct(true);
    try {
      if (isAdding) await onCreate(data);
      else if (data.id) await onModify(data as Product & { id: string });
    } finally {
      setIsSavingProduct(false);
    }
  };

  // --------------------------
  // Render
  // --------------------------
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div className="flex flex-1 flex-col sm:flex-row sm:gap-md sm:py-md overflow-hidden min-h-0">
          {/* Main Editor */}
          <div className="flex-1 flex flex-col gap-md overflow-y-auto pb-md sm:border sm:rounded-lg">
            <div className="flex flex-col gap-sm p-sm sm:p-md sm:gap-md">
              {/* Info Editor */}
              <AnimatedDropdownBox title="Product Info" openInitially>
                <ProductInfoForm />
              </AnimatedDropdownBox>

              {/* Tags Editor */}
              <AnimatedDropdownBox title="Product Tags" openInitially>
                <ProductTagsForm />
              </AnimatedDropdownBox>

              {/* Dimensions Editor */}
              <AnimatedDropdownBox title="Dimensions" openInitially>
                <ProductDimensionsForm />
              </AnimatedDropdownBox>

              {/* Options Editor */}
              <AnimatedDropdownBox title="Options" openInitially>
                <ProductOptionsForm />
              </AnimatedDropdownBox>

              {/* Variants */}
              <AnimatedDropdownBox
                customTitle={<ProductVariantHeader />}
                autoSyncOpen={!!options?.length}
                disabled={!options?.length}
              >
                <ProductVariantForm />
              </AnimatedDropdownBox>
            </div>

            {/* Delete Button */}
            {!isAdding && (
              <Button
                variant="destructive"
                className="h-12 w-1/2 self-center"
                type="button"
                onClick={handleDelete}
              >
                Delete Product
              </Button>
            )}
          </div>

          {/* Image Editor */}
          <div className="flex flex-col sm:w-1/3">
            <MultiImageEditor<ProductImageSet>
              className="mb-sm sm:mb-md"
              images={images ?? []}
              onImagesChange={(imgs) =>
                methods.setValue("images", imgs as ProductImageSet[], {
                  shouldDirty: true,
                })
              }
              processor={processProductImages}
              getPreview={(item: ProductImageSet) => item.preview}
              setIsProcessingImages={setIsProcessingImages}
            />

            {/* Footer Buttons */}
            <div className="w-full flex flex-row px-2 gap-2 sm:px-0 items-center sm:flex-col sm:gap-2">
              <Button
                className="w-full h-12 sm:hidden"
                type="button"
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <Button
                className={`w-full h-12 ${
                  isProcessingImages || isSavingProduct ? "justify-between" : ""
                }`}
                type="submit"
                disabled={isProcessingImages || isSavingProduct}
                loadingIcon={isProcessingImages || isSavingProduct}
              >
                {isSavingProduct
                  ? "Saving Product..."
                  : isProcessingImages
                    ? "Processing Images..."
                    : isAdding
                      ? "Create Product"
                      : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
