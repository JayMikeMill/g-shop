// src/components/CatalogDialog.tsx
import { useState, useEffect } from "react";

// UI Components
import { AnimatedDialog } from "@components/controls/AnimatedDialog";
import type { Collection, Category } from "@shared/types/Catalog";

import { useApi } from "@api/useApi";
import { ImagesEditor } from "@components/controls/ImageEditor";
import CollectionImageProcessor from "./CollectionImagesProcessor";

// Types
export interface CollectionImageSet {
  banner: string;
  preview: string; // used for both preview & thumbnail
}

interface CatalogDialogProps<T extends Collection> {
  open: boolean;
  item: T | null;
  onSave: () => void;
  onCancel?: () => void;
  apiKey: "categories" | "collections";
  typeLabel: "Category" | "Collection";
}

export function CatalogDialog<T extends Collection>({
  open,
  item,
  onSave,
  onCancel,
  apiKey,
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
  const api = useApi()[apiKey];

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
    onCancel?.();
  };

  const saveItem: () => boolean = () => {
    try {
      if (isAdding) {
        api.create(localItem);
      } else if (localItem.id) {
        api.update({ ...localItem, id: localItem.id });
      } else {
        throw new Error("Item ID is missing for update.");
      }
      return true;
    } catch (error) {
      console.error("Error saving item:", error);
      return false;
    }
  };

  const handleSave = () => {
    if (saveItem()) {
      clearItem();
      onSave();
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
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-text">Images</span>

          <ImagesEditor<CollectionImageSet>
            images={localItem.images ? [localItem.images] : []}
            onImagesChange={(imgs: CollectionImageSet[]) =>
              setLocalItem((prev) => ({
                ...prev,
                images: imgs[0] as CollectionImageSet,
              }))
            }
            processor={CollectionImageProcessor.processBanner}
            staticSlots={[
              {
                key: "Preview",
                processor: CollectionImageProcessor.processPreview,
                mapResult: (r) => ({ preview: r.preview }),
                getPreview: (r) => r.preview,
                className: "w-[20%]",
              },
              {
                key: "Banner",
                processor: CollectionImageProcessor.processBanner,
                mapResult: (r) => ({ banner: r.banner }),
                getPreview: (r) => r.banner,
                className: "w-[20%]",
              },
            ]}
            setIsProcessingImages={setIsProcessingImages}
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
