import type { ProductImageSet } from "@shared/types/Product";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_MB = 2; // 2MB
const MAX_PREVIEW_FILE_SIZE_MB = 0.2; // 200KB
const MAX_THUMBNAIL_FILE_SIZE_MB = 0.08; // 80KB

export class ProductImageProcessor {
  // Process image only (no upload), returns only created blobs
  static async process(
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

  // Process image only (no upload), returns only created blobs
  static async processURL(
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
}

export default ProductImageProcessor;
