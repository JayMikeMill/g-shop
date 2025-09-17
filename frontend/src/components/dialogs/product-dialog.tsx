// src/components/ProductDialog.tsx
import { useState, useEffect, useRef } from "react";
import CropDialog from "../crop-dialog";
import ImagePreviewList from "../image-preview-list";
import type { Product } from "@models/product";

import { useApi } from "@api/use-api";
import { processImageOnly } from "@utils/image-processing";

interface ProductDialogProps {
  product: Product | null; // If null, we are adding a new product
  onClose: () => void; // Callback to close dialog
}

export default function ProductDialog({
  product,
  onClose,
}: ProductDialogProps) {
  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [processedImages, setProcessedImages] = useState<any[]>([]); // Store processed blobs and preview
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  // const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<"%" | "$">("%");
  const [tags, setTags] = useState("");
  // For lightbox, store the preview URL of the image to show
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Drag and drop state
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { createProduct, updateProduct, uploadImage } = useApi();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // restore scroll when dialog closes
    };
  }, []);

  useEffect(() => {
    setName(product?.name || "");
    setPrice(product?.price || 0);
    setDescription(product?.description || "");
    setImageFiles([]);
    // Extract preview URLs from ProductImageSet[] for display
    setImagePreviews(
      product?.images?.map((imgSet) => imgSet.preview || imgSet.main) || []
    );

    setTags(product?.tags?.join(", ") || "");

    if (product && product.discount) {
      const discountStr = product.discount;
      if (discountStr.includes("%")) {
        setDiscountType("%");
        setDiscountValue(parseFloat(discountStr.replace("%", "")));
      } else {
        // Fixed amount
        setDiscountType("$");
        setDiscountValue(parseFloat(discountStr));
      }
    } else {
      setDiscountType("%");
      setDiscountValue(0);
    }
  }, [product]);

  const [imageProgress, setImageProgress] = useState<number[]>([]);
  // Cropping state
  const [pendingCropFiles, setPendingCropFiles] = useState<File[]>([]);
  const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPendingCropFiles((prev) => [...prev, ...files]);
    }
  };

  // When pendingCropFile is null and there are files in the queue, pop the next one
  useEffect(() => {
    if (!pendingCropFile && pendingCropFiles.length > 0) {
      setPendingCropFile(pendingCropFiles[0]);
      setPendingCropFiles((prev) => prev.slice(1));
    }
  }, [pendingCropFile, pendingCropFiles]);

  const handleCropComplete = async (croppedBlob: Blob, previewUrl: string) => {
    setIsProcessingImages(true);
    try {
      // Wrap cropped blob as File for processImageOnly
      const croppedFile = new File(
        [croppedBlob],
        pendingCropFile?.name || "cropped.webp",
        { type: "image/webp" }
      );
      const { mainBlob, previewBlob, thumbBlob } =
        await processImageOnly(croppedFile);
      setProcessedImages((prev) => [
        ...prev,
        {
          mainBlob,
          previewBlob,
          thumbBlob,
          previewUrl,
          name: croppedFile.name,
        },
      ]);
      setImagePreviews((prev) => [...prev, previewUrl]);
    } catch (err: any) {
      alert(err?.message || "Error processing cropped image");
    } finally {
      setIsProcessingImages(false);
      setPendingCropFile(null); // Will trigger next file in queue if any
    }
  };

  const handleCropCancel = () => setPendingCropFile(null);

  const removeImage = (index: number) => {
    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);

    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    const newProcessedImages = [...processedImages];
    newProcessedImages.splice(index, 1);
    setProcessedImages(newProcessedImages);

    const newImageProgress = [...imageProgress];
    newImageProgress.splice(index, 1);
    setImageProgress(newImageProgress);
  };

  const handleSort = (from: number, to: number) => {
    if (from === to) return;
    const newImagePreviews = [...imagePreviews];
    const draggedItemContent = newImagePreviews.splice(from, 1)[0];
    newImagePreviews.splice(to, 0, draggedItemContent);
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
      const discountString =
        discountValue > 0
          ? discountType === "%"
            ? `${discountValue}%`
            : `${discountValue}`
          : "";

      // Require at least one image, whether new or existing
      const hasImages =
        processedImages.length > 0 ||
        (product && product.images && product.images.length > 0);
      const hasPreview = imagePreviews.length > 0;
      if (!hasImages && !hasPreview) {
        alert("At least one image is required");
        return;
      }
      if (isProcessingImages) {
        alert("Please wait for images to finish processing.");
        return;
      }

      // setIsUploadingImages(true);
      setIsSavingProduct(true);
      // For each image in imagePreviews, if it has a processedImages entry, upload it; otherwise, use the existing product image
      let uploadedImages = [];
      for (let i = 0; i < imagePreviews.length; i++) {
        const previewUrl = imagePreviews[i];
        const processed = processedImages.find(
          (img) => img.previewUrl === previewUrl
        );
        if (processed) {
          const main = await uploadImage(
            processed.mainBlob,
            processed.name.replace(/\.[^.]+$/, "") + ".webp"
          );
          const preview = await uploadImage(
            processed.previewBlob,
            processed.name.replace(/\.[^.]+$/, "") + "_preview.webp"
          );
          const thumb = await uploadImage(
            processed.thumbBlob,
            processed.name.replace(/\.[^.]+$/, "") + "_thumb.webp"
          );
          uploadedImages.push({
            main: main.url,
            preview: preview.url,
            thumbnail: thumb.url,
          });
        } else if (product && product.images) {
          // Find the matching image in the original product.images by preview or main url
          const existing = product.images.find(
            (img) => img.preview === previewUrl || img.main === previewUrl
          );
          if (existing) {
            uploadedImages.push(existing);
          } else {
            alert(
              "Some images are missing or not processed. Please re-add them."
            );
            setIsSavingProduct(false);
            return;
          }
        } else {
          alert(
            "Some images are missing or not processed. Please re-add them."
          );
          setIsSavingProduct(false);
          return;
        }
      }
      // setIsUploadingImages(false);

      if (product) {
        await updateProduct(product.id, {
          name,
          price,
          description,
          discount: discountString,
          tags: tagsArray,
          images: uploadedImages.length > 0 ? uploadedImages : product.images,
        } as Product);
      } else {
        await createProduct({
          name,
          price,
          description,
          sizes: ["S", "M", "L"],
          colors: ["Red", "Blue"],
          discount: discountString,
          tags: tagsArray,
          images: uploadedImages,
        } as Product);
      }

      setIsSavingProduct(false);
      onClose();
    } catch (err: any) {
      // setIsUploadingImages(false);
      setIsSavingProduct(false);
      alert(err.message || "Error saving product");
    }
  };

  return (
    <>
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Preview"
            className="w-[70%] sm:w-auto sm:h-[70%] rounded-lg shadow-2xl border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition"
            onClick={() => setLightboxImage(null)}
            aria-label="Close lightbox"
          >
            &times;
          </button>
        </div>
      )}

      {/* Main Dialog */}
      <div className="fixed inset-0 bg-overlay flex justify-center items-center z-50">
        <div
          className="
          bg-surface rounded-lg shadow-xl border border-border
          w-full h-full sm:w-auto sm:h-[90vh] sm:max-w-4xl
          flex flex-col overflow-hidden
          px-4 sm:px-8"
        >
          {/* Header */}
          <div className="flex justify-center border-b border-border pb-md mb-md flex-shrink-0">
            <h2 className="text-xl font-bold text-text text-center">
              {product ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          {/* Form content */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col flex-1 gap-lg overflow-hidden"
          >
            <div className="flex flex-1 flex-col md:flex-row gap-md overflow-hidden">
              {/* Left: Images */}
              <div className="md:w-1/3 flex flex-col gap-md md:h-full overflow-y-auto">
                <div className="flex justify-start mb-md flex-shrink-0">
                  <label className="bg-primary text-textOnPrimary px-md py-1 rounded font-bold text-sm cursor-pointer">
                    Add Image
                    <input
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                </div>

                {pendingCropFile && (
                  <CropDialog
                    file={pendingCropFile}
                    onCropComplete={handleCropComplete}
                    onCancel={handleCropCancel}
                  />
                )}

                <ImagePreviewList
                  imagePreviews={imagePreviews}
                  onRemove={removeImage}
                  onSort={handleSort}
                  onLightbox={setLightboxImage}
                  isDragging={isDragging}
                  dragItem={dragItem}
                  dragOverItem={dragOverItem}
                  setIsDragging={setIsDragging}
                />
              </div>

              {/* Right: Form Fields */}
              <div className="flex-1 flex flex-col gap-md overflow-y-auto">
                {/* Name */}
                <label className="flex flex-col gap-1 text-sm font-semibold text-textSecondary">
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="px-md py-1 h-8 border border-border rounded-lg bg-input text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </label>

                {/* Price + Discount */}
                <div className="flex gap-md items-end">
                  <label className="flex-1 flex flex-col gap-1 text-sm font-semibold text-textSecondary">
                    Price
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-textSecondary">
                        $
                      </span>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                        step="0.01"
                        className="pl-6 pr-md py-1 h-8 border border-border rounded-lg bg-input text-text w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                  </label>

                  <div className="flex-1 flex gap-1 items-end">
                    <label className="flex-1 flex flex-col gap-1 text-sm font-semibold text-textSecondary">
                      Discount
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-textSecondary">
                          {discountType}
                        </span>
                        <input
                          type="number"
                          className="pl-6 pr-md py-1 h-8 border border-border rounded-lg bg-input text-text w-full focus:outline-none focus:ring-2 focus:ring-primary transition"
                          value={discountValue}
                          onChange={(e) =>
                            setDiscountValue(parseFloat(e.target.value))
                          }
                          step="0.01"
                        />
                      </div>
                    </label>
                    <select
                      className="ml-1 px-2 py-1 h-8 border border-border rounded-lg bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                      value={discountType}
                      onChange={(e) =>
                        setDiscountType(e.target.value as "%" | "$")
                      }
                    >
                      <option value="%">%</option>
                      <option value="$">$</option>
                    </select>
                  </div>
                </div>

                {/* Tags */}
                <label className="flex flex-col gap-1 text-sm font-semibold text-textSecondary">
                  Tags (comma-separated)
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="px-md py-1 h-8 border border-border rounded-lg bg-input text-text focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
                </label>

                {/* Description */}
                <label className="flex flex-col gap-1 text-sm font-semibold text-textSecondary flex-1">
                  Description
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="px-md py-1 border border-border rounded-lg bg-input text-text focus:outline-none focus:ring-2 focus:ring-primary transition flex-1 min-h-[60px]"
                  />
                </label>
              </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-end gap-2 px-4 sm:px-8 py-4 border-t border-border flex-shrink-0">
              <button
                className="btn-danger w-36 h-12"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-success w-36 h-12  whitespace-nowrap"
                disabled={isProcessingImages || isSavingProduct}
              >
                {isSavingProduct
                  ? "Saving..."
                  : isProcessingImages
                    ? "Processing Images..."
                    : product
                      ? "Save Changes"
                      : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
