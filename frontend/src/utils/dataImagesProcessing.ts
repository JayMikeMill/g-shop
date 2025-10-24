import type { Collection, Product, ProductImageSet } from "shared/types";
import imageCompression from "browser-image-compression";
import { useApi } from "@app/hooks";

const MAX_FILE_SIZE_MB = 2; // 2MB
const MAX_PREVIEW_FILE_SIZE_MB = 0.2; // 200KB
const MAX_THUMBNAIL_FILE_SIZE_MB = 0.08; // 80KB

// Process image only (no upload), returns only created blobs
export async function processProductImages(
  file: File,
  onProgress?: (percent: number) => void
): Promise<ProductImageSet> {
  let percent = 0;

  const mainBlob = await imageCompression(file, {
    maxSizeMB: MAX_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.85,
    onProgress: (p) => {
      percent = Math.round(p * 60);
      onProgress?.(percent);
    },
  });

  const previewBlob = await imageCompression(file, {
    maxWidthOrHeight: 600,
    maxSizeMB: MAX_PREVIEW_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.75,
    onProgress: (p) => {
      percent = 60 + Math.round(p * 30);
      onProgress?.(percent);
    },
  });

  const thumbBlob = await imageCompression(file, {
    maxWidthOrHeight: 200,
    maxSizeMB: MAX_THUMBNAIL_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.4,
    onProgress: (p) => {
      percent = 90 + Math.round(p * 10);
      onProgress?.(percent);
    },
  });

  onProgress?.(100);
  return {
    main: URL.createObjectURL(mainBlob),
    preview: URL.createObjectURL(previewBlob),
    thumbnail: URL.createObjectURL(thumbBlob),
  };
}

export const uploadImageURL = async (file: string, name: string) => {
  const { uploadImage } = useApi().storage;

  const blob = await fetch(file).then((r) => r.blob());
  const uploaded = await uploadImage(blob, name);

  return uploaded;
};

export const uploadProductImages = async (item: Product): Promise<Product> => {
  if (!item.images || item.images.length === 0) return item;

  try {
    for (let i = 0; i < item.images.length; i++) {
      // Remove id to preserve order on upsert
      delete item.images[i].id;
      delete item.images[i].productId;

      if (
        item.images[i].main.startsWith("blob:") ||
        !item.images[i].main.includes("supabase.co")
      ) {
        const prefix = `${item.name}_image_${i}`;

        item.images[i].main = await uploadImageURL(
          item.images[i].main,
          `${prefix}_main`
        );
        item.images[i].preview = await uploadImageURL(
          item.images[i].preview,
          `${prefix}_preview`
        );
        item.images[i].thumbnail = await uploadImageURL(
          item.images[i].thumbnail,
          `${prefix}_thumbnail`
        );
      }
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images. Please try again.");
  }
  return item;
};

export const uploadCollectionImages = async (item: Collection) => {
  if (!item.images) return item;

  console.log("Uploading collection images...", item.images);
  try {
    if (item.images.banner?.startsWith("blob:")) {
      item.images.banner = await uploadImageURL(
        item.images.banner,
        `${item.name}_banner`
      );
    }
    if (item.images.preview?.startsWith("blob:")) {
      item.images.preview = await uploadImageURL(
        item.images.preview,
        `${item.name}_preview`
      );
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Failed to upload images. Please try again.");
  }
  return item;
};
