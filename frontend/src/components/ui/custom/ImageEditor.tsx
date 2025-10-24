import React, { useRef, useState, useEffect } from "react";
import { CropDialog, Input, XButton, Lightbox, Image } from "@components/ui";

/** -------------------- Types -------------------- */
interface ImageSlotProps {
  index: number;
  src?: string;
  processing: boolean;
  onClick: () => void;
  onRemove: () => void;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
  draggable?: boolean;
  emptyText?: string;
  single?: boolean;
}

export interface ImageEditorProps<T extends Record<string, any>> {
  className?: string;
  images: T[];
  onImagesChange: (images: T[]) => void;
  processor: (file: File, onProgress?: (percent: number) => void) => Promise<T>;
  getPreview?: (item: T) => string;
  single?: boolean;
  emptyText?: string;
  cropping?: boolean; // default false
}

/** -------------------- ImageSlot -------------------- */
function ImageSlot({
  src,
  processing,
  onClick,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  draggable = true,
  emptyText = "+ Add Image",
  single = false,
}: ImageSlotProps) {
  const emptyBorder = src ? "" : "border-2 border-dashed border-gray-300";
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden flex-shrink-0 ${single ? "w-full h-full" : "w-[100px] h-[100px]"}
				 select-none cursor-pointer flex items-center 
				justify-center ${emptyBorder} hover:bg-gray-100 transition`}
    >
      {src ? (
        <Image
          src={src}
          alt="Preview"
          className="w-full h-full object-contain pointer-events-none transition-opacity duration-200"
          style={{ opacity: processing ? 0.3 : 1 }}
        />
      ) : (
        <span className="text-center text-sm font-medium text-gray-500">
          {emptyText}
        </span>
      )}

      {processing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {src && (
        <XButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute top-1 right-1 w-6 h-6 flex cursor-pointer z-10 bg-black/50 text-white p-0"
        />
      )}
    </div>
  );
}

/** -------------------- BaseImageEditor -------------------- */
function BaseImageEditor<T extends Record<string, any>>({
  className,
  images,
  onImagesChange,
  processor,
  getPreview,
  emptyText = "+ Add Image",
  single = false,
  cropping = false,
}: ImageEditorProps<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const [targetSlotIndex, setTargetSlotIndex] = useState<number | null>(null);
  const [pendingCropFiles, setPendingCropFiles] = useState<File[]>([]);
  const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const [processingIndexes, setProcessingIndexes] = useState<number[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  /** -------------------- Generic file processor -------------------- */
  const processFile = async (file: File, index: number) => {
    setProcessingIndexes((prev) => [...prev, index]);
    setPreviews((prev) => ({ ...prev, [index]: URL.createObjectURL(file) }));

    try {
      const processedItem = await processor(file);

      // If the index already exists, replace it; else append
      let updated = [...images];
      if (index < updated.length) updated[index] = processedItem;
      else updated = [...updated, processedItem];

      onImagesChange(updated);
    } catch (err: any) {
      alert(err?.message || "Error processing image");
    } finally {
      setProcessingIndexes((prev) => prev.filter((i) => i !== index));
      setPreviews((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
    }
  };

  /** -------------------- File input -------------------- */
  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (cropping) {
      setPendingCropFiles((prev) => [...prev, ...files]);
    } else {
      // Add preview items instantly to images array
      const previewItems = files.map(
        (file) =>
          ({
            __preview: true,
            url: URL.createObjectURL(file),
          }) as unknown as T
      );
      onImagesChange([...images, ...previewItems]);

      // Mark indexes as processing
      const startIdx = images.length;
      setProcessingIndexes((prev) => [
        ...prev,
        ...files.map((_, i) => startIdx + i),
      ]);

      try {
        const processedItems = await Promise.all(
          files.map((file) => processor(file))
        );
        // Replace preview items with processed items
        const updatedImages = [...images, ...processedItems];
        onImagesChange(updatedImages);
      } catch (err: any) {
        alert(err?.message || "Error processing image(s)");
      } finally {
        setProcessingIndexes((prev) => prev.filter((i) => i < images.length));
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!pendingCropFile && pendingCropFiles.length > 0) {
      setPendingCropFile(pendingCropFiles[0]);
      setPendingCropFiles((prev) => prev.slice(1));
    }
  }, [pendingCropFile, pendingCropFiles]);

  /** -------------------- Crop -------------------- */
  const handleCropComplete = (croppedBlob: Blob, originalName?: string) => {
    if (targetSlotIndex === null) return;
    const file = new File([croppedBlob], originalName || "cropped.webp", {
      type: "image/webp",
    });
    processFile(file, targetSlotIndex);
    setTargetSlotIndex(null);
  };

  const handleCropCancel = () => setPendingCropFile(null);

  /** -------------------- Remove -------------------- */
  const removeImage = (index: number) => {
    const updated = single ? [] : images.filter((_, i) => i !== index);
    onImagesChange(updated);
  };

  /** -------------------- Drag & Drop -------------------- */
  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setIsDragging(true);
  };
  const handleDragEnter = (index: number) => {
    if (isDragging) dragOverItem.current = index;
  };
  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) {
      setIsDragging(false);
      return;
    }
    if (dragItem.current === dragOverItem.current) {
      setIsDragging(false);
      dragItem.current = null;
      dragOverItem.current = null;
      return;
    }
    // Reorder images
    const updated = [...images];
    const dragged = updated.splice(dragItem.current, 1)[0];
    updated.splice(dragOverItem.current, 0, dragged);
    onImagesChange(updated);
    setIsDragging(false);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  /** -------------------- Slot rendering -------------------- */
  const renderSlot = (value: T | undefined, index: number, single: boolean) => {
    // If value is a preview item, use its url
    const src =
      value && (value as any).__preview
        ? (value as any).url
        : (previews[index] ??
          (value
            ? getPreview
              ? getPreview(value)
              : (value as any).main
            : undefined));
    return (
      <ImageSlot
        key={index}
        index={index}
        src={src}
        processing={processingIndexes.includes(index)}
        onClick={() => {
          if (src) setLightboxIndex(index);
          else {
            setTargetSlotIndex(index);
            fileInputRef.current?.click();
          }
        }}
        onRemove={() => removeImage(index)}
        onDragStart={() => handleDragStart(index)}
        onDragEnter={() => handleDragEnter(index)}
        onDragEnd={() => handleDragEnd()}
        draggable={!single}
        emptyText={emptyText}
        single={single}
      />
    );
  };

  const lightBoxSlides = images.map((img) => ({
    src: getPreview ? getPreview(img) : (img as any).main,
  }));

  const multiClass = `border border-border rounded flex gap-2 p-2 overflow-x-auto h-[120px] flex-nowrap items-center sm:grid sm:grid-cols-2 sm:auto-rows-min sm:h-full sm:overflow-y-auto ${className}`;
  const singleClass = `items-center ${className}`;

  return (
    <div className={single ? singleClass : multiClass}>
      {/* Crop dialog */}
      {pendingCropFile && cropping && (
        <CropDialog
          file={pendingCropFile}
          open
          onCropComplete={(blob) =>
            handleCropComplete(blob, pendingCropFile?.name)
          }
          onCancel={handleCropCancel}
        />
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9999 }}
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.preventDefault()}
        >
          <Lightbox
            open={lightboxIndex !== null}
            index={lightboxIndex ?? 0}
            slides={lightBoxSlides}
            onClose={() => setLightboxIndex(null)}
          />
        </div>
      )}

      {/* Hidden file input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
        multiple={!single}
      />

      {/* Render slots */}
      {single ? (
        renderSlot(images[0], 0, true)
      ) : (
        <>
          {images.map((img, idx) => renderSlot(img, idx, false))}
          <div
            className="h-full aspect-[1/1]  flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => {
              setTargetSlotIndex(images.length);
              fileInputRef.current?.click();
            }}
          >
            <span className="text-center text-sm font-medium">{emptyText}</span>
          </div>
        </>
      )}
    </div>
  );
}

/** -------------------- Public Editors -------------------- */
export function MultiImageEditor<T extends Record<string, any>>(
  props: Omit<ImageEditorProps<T>, "single">
) {
  return <BaseImageEditor {...props} single={false} />;
}

// Single image editor
export function ImageEditor({
  image: url,
  onImageChange: onUrlChange,
  ...rest
}: {
  image?: string;
  onImageChange: (url?: string) => void;
} & Omit<
  ImageEditorProps<any>,
  "images" | "onImagesChange" | "single" | "processor" | "getPreview"
>) {
  return (
    <BaseImageEditor
      {...rest}
      className={`${rest.className} ${url ? "w-full border-2 rounded-lg" : ""}`}
      images={url ? [{ url }] : []}
      onImagesChange={(arr) => onUrlChange(arr[0]?.url)}
      single
      getPreview={(item) => item.url as string}
      processor={async (file) => {
        // Convert File to URL string
        return { url: URL.createObjectURL(file) };
      }}
    />
  );
}
