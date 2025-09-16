import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE_MB = 2; // 2MB
const MAX_PREVIEW_FILE_SIZE_MB = 0.2; // 200KB
const MAX_THUMBNAIL_FILE_SIZE_MB = 0.08; // 80KB

// Process image only (no upload), returns blobs and previewUrl
export async function processImageOnly(file: File, onProgress?: (percent: number) => void) {
  let percent = 0;
  const mainBlob = await imageCompression(file, {
    maxWidthOrHeight: 1200,
    maxSizeMB: MAX_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 1.0,
    onProgress: (p: number) => { percent = Math.round(p * 0.6); if (onProgress) onProgress(percent); }
  });
  const previewBlob = await imageCompression(file, {
    maxWidthOrHeight: 400,
    maxSizeMB: MAX_PREVIEW_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 1.0,
    onProgress: (p: number) => { percent = Math.round(60 + p * 0.3); if (onProgress) onProgress(percent); }
  });
  const thumbBlob = await imageCompression(file, {
    maxWidthOrHeight: 150,
    maxSizeMB: MAX_THUMBNAIL_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 1.0,
    onProgress: (p: number) => { percent = Math.round(90 + p * 0.1); if (onProgress) onProgress(percent); }
  });
  if (onProgress) onProgress(100);
  const previewUrl = URL.createObjectURL(previewBlob);
  return { mainBlob, previewBlob, thumbBlob, previewUrl, name: file.name };
}

export interface ProcessedImageUrls {
  main: string;
  preview: string;
  thumbnail: string;
}

export async function processAndUploadImage(
  file: File,
  uploadFn: (file: Blob, filename: string, onProgress?: (percent: number) => void) => Promise<{ url: string }>,
  onProgress?: (percent: number) => void
): Promise<ProcessedImageUrls> {
  // Main (webp, compressed, max 1200px)
  const mainBlob = await imageCompression(file, {
    maxWidthOrHeight: 1200,
    maxSizeMB: MAX_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.85,
  });
  let lastMain = 0;
  const mainUrl = (await uploadFn(mainBlob, file.name.replace(/\.[^.]+$/, "") + ".webp", p => {
    lastMain = p;
    if (onProgress) onProgress(Math.round(p * 0.6)); // Main is 60% of total
  })).url;

  // Preview (webp, compressed, max 400px)
  const previewBlob = await imageCompression(file, {
    maxWidthOrHeight: 400,
    maxSizeMB: MAX_PREVIEW_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.7,
  });
  let lastPreview = 0;
  const previewUrl = (await uploadFn(previewBlob, file.name.replace(/\.[^.]+$/, "") + "_preview.webp", p => {
    lastPreview = p;
    if (onProgress) onProgress(Math.round(60 + p * 0.3)); // Preview is next 30%
  })).url;

  // Thumbnail (webp, compressed, max 80px)
  const thumbBlob = await imageCompression(file, {
    maxWidthOrHeight: 80,
    maxSizeMB: MAX_THUMBNAIL_FILE_SIZE_MB,
    fileType: "image/webp",
    initialQuality: 0.6,
  });
  const thumbUrl = (await uploadFn(thumbBlob, file.name.replace(/\.[^.]+$/, "") + "_thumb.webp", p => {
    if (onProgress) onProgress(Math.round(90 + p * 0.1)); // Thumb is last 10%
  })).url;

  if (onProgress) onProgress(100);
  return {
    main: mainUrl,
    preview: previewUrl,
    thumbnail: thumbUrl,
  };
}
