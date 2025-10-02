import type { CollectionImageSet } from "@shared/types/Catalog";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_MB = 2; // 2MB
const MAX_PREVIEW_FILE_SIZE_MB = 0.2; // 200KB
const MAX_THUMBNAIL_FILE_SIZE_MB = 0.08; // 80KB

export class CollectionImageProcessor {
  // Process banner image
  static async processBanner(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<CollectionImageSet> {
    let percent = 0;

    const bannerBlob = await imageCompression(file, {
      maxSizeMB: MAX_FILE_SIZE_MB,
      fileType: "image/webp",
      initialQuality: 0.85,
      onProgress: (p) => {
        percent = Math.round(p * 60);
        onProgress?.(percent);
      },
    });

    onProgress?.(100);

    const bannerURL = URL.createObjectURL(bannerBlob);
    return {
      banner: bannerURL,
      preview: "",
      thumbnail: "",
    };
  }

  // Process preview image
  static async processPreview(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<CollectionImageSet> {
    let percent = 0;

    const previewBlob = await imageCompression(file, {
      maxSizeMB: MAX_FILE_SIZE_MB,
      fileType: "image/webp",
      initialQuality: 0.85,
      onProgress: (p) => {
        percent = Math.round(p * 60);
        onProgress?.(percent);
      },
    });

    onProgress?.(100);

    const previewURL = URL.createObjectURL(previewBlob);
    return {
      banner: "",
      preview: previewURL,
      thumbnail: "",
    };
  }
}

export default CollectionImageProcessor;
