import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_MB = 2; // 2MB
const MAX_PREVIEW_FILE_SIZE_MB = 0.2; // 200KB
const MAX_THUMBNAIL_FILE_SIZE_MB = 0.08; // 80KB

// Process image only (no upload), returns blobs and previewUrl
export async function processImageOnly(
  file: File,
  onProgress?: (percent: number) => void
) {
  let percent = 0;
  const mainBlob = await imageCompression(file, {
    maxSizeMB: MAX_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.85,
    onProgress: (p: number) => {
      percent = Math.round(p * 0.6);
      if (onProgress) onProgress(percent);
    },
  });

  const previewBlob = await imageCompression(file, {
    maxWidthOrHeight: 600,
    maxSizeMB: MAX_PREVIEW_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.75,
    onProgress: (p: number) => {
      percent = Math.round(60 + p * 0.3);
      if (onProgress) onProgress(percent);
    },
  });

  const thumbBlob = await imageCompression(file, {
    maxWidthOrHeight: 200,
    maxSizeMB: MAX_THUMBNAIL_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.4,
    onProgress: (p: number) => {
      percent = Math.round(90 + p * 0.1);
      if (onProgress) onProgress(percent);
    },
  });

  if (onProgress) onProgress(100);

  return { mainBlob, previewBlob, thumbBlob };
}
