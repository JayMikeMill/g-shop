// src/components/CatalogDialog.tsx
import { useState, useEffect } from "react";

// UI Components

import type { Collection, Category } from "@shared/types/Catalog";

import { AnimatedDialog } from "@components/UI";
import { ImageEditor } from "@components/UI";
import { CircleSpinner } from "@components/UI";

import CollectionImageProcessor from "./CollectionImagesProcessor";

import { useApi } from "@api/useApi";

// Types
export interface CollectionImageSet {
  banner: string;
  preview: string; // used for both preview & thumbnail
}

interface CatalogDialogProps<T extends Collection> {
  open: boolean;
  item: T | null;
  onCreate: (collection: T) => void;
  onModify: (collection: T & { id: string }) => void;
  onDelete: (collectionId: T) => void;
  onCancel: () => void;
  apiKey: "categories" | "collections";
  typeLabel: "Category" | "Collection";
}

export function CatalogDialog<T extends Collection>({
  open,
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
  typeLabel: type,
}: CatalogDialogProps<T>) {
  const emptyItem: T = {
    id: undefined,
    name: "",
    slug: "",
    description: "",
    seo: {},
    images: { banner: "", preview: "" },
  } as T;

  const [localItem, setLocalItem] = useState<T>(emptyItem);
  const [isAdding, setIsAdding] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [isSavingCollection, setIsSavingCollection] = useState(false);

  const { uploadImage } = useApi();

  useEffect(() => {
    if (!open) {
      setLocalItem(emptyItem);
      setIsAdding(false);
      return;
    }
    if (!item) {
      setLocalItem(emptyItem);
      setIsAdding(true);
      return;
    }
    setLocalItem(item);
    setIsAdding(false);
  }, [open, item]);

  const clearItem = () => {
    setLocalItem(emptyItem);
    setIsAdding(false);
  };
  const handleCancel = () => {
    clearItem();
    onCancel();
  };

  const handleSave = async () => {
    try {
      setIsSavingCollection(true); // spinner for saving collection

      await uploadImages(); // we'll handle spinner for uploading separately

      if (isAdding) {
        onCreate(localItem);
      } else {
        onModify({ ...localItem, id: localItem.id! });
      }

      clearItem();
    } catch (err: any) {
      alert(err?.message || "Error saving collection");
    } finally {
      setIsSavingCollection(false);
    }
  };

  const uploadImages = async () => {
    if (!localItem.images) return;

    try {
      if (localItem.images.banner.startsWith("blob:")) {
        const blobBanner = await fetch(localItem.images.banner).then((r) =>
          r.blob()
        );
        const uploadedBanner = await uploadImage(
          blobBanner,
          `collection_banner`
        );
        localItem.images.banner = uploadedBanner.url;
      }

      if (localItem.images.preview.startsWith("blob:")) {
        const blobPreview = await fetch(localItem.images.preview).then((r) =>
          r.blob()
        );
        const uploadedPreview = await uploadImage(
          blobPreview,
          `collection_preview`
        );
        localItem.images.preview = uploadedPreview.url;
      }
    } catch (err) {
      throw new Error("Error uploading images");
    }
  };

  console.log("Rendering CatalogDialog with localItem:", localItem);

  return (
    <AnimatedDialog
      title={isAdding ? `Add ${type}` : `Edit ${type}`}
      open={open}
      onClose={handleCancel}
      className="dialog-box flex flex-col overflow-hidden rounded-none pl-2 w-full h-full 
      sm:rounded-2xl sm:max-w-3xl px-md sm:px-lg"
    >
      {/* Loading Spinner */}
      {isSavingCollection && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
          <CircleSpinner text={`Saving ${type}...`} />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 w-auto"
      >
        <div className="flex flex-row gap-md min-w-0">
          {/* Name */}
          <label className="flex flex-1 flex-col gap-1 text-sm w-auto font-semibold text-text">
            {type} Name
            <input
              type="text"
              placeholder={`${type} Name`}
              value={localItem.name}
              onChange={(e) =>
                setLocalItem((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              className="input-box px-2 py-1 h-10 w-full"
            />
          </label>

          {/* Slug */}
          <label className="flex flex-1 flex-col gap-1 text-sm font-semibold text-text">
            Slug
            <input
              type="text"
              placeholder="URL Slug"
              value={localItem.slug}
              onChange={(e) =>
                setLocalItem((prev) => ({ ...prev, slug: e.target.value }))
              }
              required
              className="input-box px-2 py-1 h-10 w-full"
            />
          </label>
        </div>

        {/* SEO */}
        <div className="flex flex-col gap-2">
          <label className="flex flex-col gap-1 text-sm font-semibold text-text">
            SEO Title
            <input
              type="text"
              placeholder="SEO Title"
              value={localItem.seo?.title ?? ""}
              onChange={(e) =>
                setLocalItem((prev) => ({
                  ...prev,
                  seo: { ...prev.seo, title: e.target.value },
                }))
              }
              className="input-box px-2 py-1 h-10"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-semibold text-text">
            Keywords (comma-separated)
            <input
              type="text"
              placeholder="keyword1, keyword2"
              value={localItem.seo?.keywords?.join(", ") ?? ""}
              onChange={(e) =>
                setLocalItem((prev) => ({
                  ...prev,
                  seo: {
                    ...prev.seo,
                    keywords: e.target.value.split(",").map((k) => k.trim()),
                  },
                }))
              }
              className="input-box px-2 py-1 h-10"
            />
          </label>
        </div>

        {/* Description */}
        <label className="flex flex-col gap-1 text-sm font-semibold text-text">
          Description
          <textarea
            placeholder="Description"
            value={localItem.description ?? ""}
            onChange={(e) =>
              setLocalItem((prev) => ({ ...prev, description: e.target.value }))
            }
            className="input-box px-2 py-1 h-24 resize-none"
          />
        </label>

        {/* Images */}
        <div className="flex flex-row gap-2">
          {/* Preview Image Editor */}
          <ImageEditor<CollectionImageSet>
            image={localItem.images}
            onImageChange={(img: CollectionImageSet | undefined) =>
              setLocalItem((prev) => ({
                ...prev,
                images: { ...prev.images, preview: img?.preview },
              }))
            }
            getPreview={(img) => img?.preview || ""}
            processor={CollectionImageProcessor.processPreview}
            setIsProcessingImages={setIsProcessingImages}
            emptyText="+ Add Preview Image"
            className="w-32 aspect-[1/1]"
          />

          {/* Banner Image Editor */}
          <ImageEditor<CollectionImageSet>
            image={localItem.images}
            onImageChange={(img: CollectionImageSet | undefined) =>
              setLocalItem((prev) => ({
                ...prev,
                images: { ...prev.images, banner: img?.banner },
              }))
            }
            getPreview={(img) => img?.banner || ""}
            processor={CollectionImageProcessor.processBanner}
            setIsProcessingImages={setIsProcessingImages}
            emptyText="+ Add Banner Image"
            className="flex-1"
          />
        </div>
        {/* Footer Buttons */}
        <div className="w-full flex flex-row gap-2 px-0 sm:px-0 items-center py-4 border-t flex-shrink-0">
          <button
            type="button"
            className="btn-cancel w-full h-12"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-normal w-full h-12"
            disabled={isProcessingImages}
          >
            {isProcessingImages
              ? "Processing..."
              : isAdding
                ? `Add ${type}`
                : `Save Changes`}
          </button>
        </div>
      </form>
    </AnimatedDialog>
  );
}

// Convenience wrappers
export const CategoryDialog = (
  props: Omit<CatalogDialogProps<Category>, "type">
) => <CatalogDialog {...props} typeLabel="Category" />;

export const CollectionDialog = (
  props: Omit<CatalogDialogProps<Collection>, "type">
) => <CatalogDialog {...props} typeLabel="Collection" />;
