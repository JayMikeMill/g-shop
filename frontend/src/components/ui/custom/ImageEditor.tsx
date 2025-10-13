import React, { useRef, useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import { CropDialog, Input, XButton } from "@components/ui";

// --- ImageSlot Component ---
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
}

function ImageSlot({
  index,
  src,
  processing,
  onClick,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
  draggable = true,
  emptyText = "+ Add Image",
}: ImageSlotProps) {
  const emptyBorder = src ? "" : "border-2 border-dashed border-gray-300";
  return (
    <div
      key={index}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden flex-shrink-0 w-[100px] h-[100px]
			 md:w-full md:h-[100px] select-none cursor-pointer flex items-center 
			 justify-center ${emptyBorder} hover:bg-gray-100 
			 transition`}
    >
      {/* Preview */}
      {/* Preview */}
      {src ? (
        <img
          src={src}
          alt="Preview"
          className="w-full h-full object-cover block pointer-events-none transition-opacity duration-200"
          style={{ opacity: processing ? 0.5 : 1 }}
        />
      ) : (
        <span className="text-center text-sm font-medium text-gray-500">
          {emptyText}
        </span>
      )}

      {/* Spinner */}
      {processing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Remove */}
      {src && (
        <XButton
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={`absolute top-1 right-1 w-6 h-6 flex cursor-pointer z-10 
          bg-black/50 text-white p-0`}
        />
      )}
    </div>
  );
}

// --- Types ---
export interface ImageEditorProps<T extends Record<string, any>> {
  className?: string;
  images: T[];
  onImagesChange: (images: T[]) => void;
  setIsProcessingImages: (v: boolean) => void;
  processor: (file: File, onProgress?: (percent: number) => void) => Promise<T>;
  getPreview?: (item: T) => string;
  single?: boolean; // if true → single-image editor
  emptyText?: string;
}

// --- BaseImageEditor (shared) ---
function BaseImageEditor<T extends Record<string, any>>({
  className,
  images,
  onImagesChange,
  setIsProcessingImages,
  processor,
  getPreview,
  emptyText = "+ Add Image",
  single = false,
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

  // File input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) setPendingCropFiles((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!pendingCropFile && pendingCropFiles.length > 0) {
      setPendingCropFile(pendingCropFiles[0]);
      setPendingCropFiles((prev) => prev.slice(1));
    }
  }, [pendingCropFile, pendingCropFiles]);

  const handleAddClick = (index: number) => {
    setTargetSlotIndex(index);
    fileInputRef.current?.click();
  };

  // Crop
  const handleCropComplete = async (
    croppedBlob: Blob,
    originalName?: string
  ) => {
    if (targetSlotIndex === null) return;
    const index = targetSlotIndex;

    // Create a temporary URL for immediate display
    const tempUrl = URL.createObjectURL(croppedBlob);

    // Create a temporary object for parent, but keep original properties
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index] }; // keep full object
    onImagesChange(updatedImages); // triggers parent re-render

    // Set temporary preview without touching the original image object
    setPreviews((prev) => ({ ...prev, [index]: tempUrl }));

    setProcessingIndexes((prev) => [...prev, index]);
    setPendingCropFile(null);
    setIsProcessingImages(true);
    setTargetSlotIndex(null);

    try {
      const file = new File([croppedBlob], originalName || "cropped.webp", {
        type: "image/webp",
      });

      const processedItem = await processor(file);

      let updated = [...images];
      if (single) {
        updated = [processedItem];
      } else {
        updated[index] = processedItem;
      }

      onImagesChange(updated);
    } catch (err: any) {
      alert(err?.message || "Error processing cropped image");
    } finally {
      setProcessingIndexes((prev) => prev.filter((i) => i !== index));

      // Remove temporary preview
      setPreviews((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });

      setIsProcessingImages(false);
    }
  };

  const handleCropCancel = () => setPendingCropFile(null);

  // Remove
  const removeImage = (index: number) => {
    let updated = [...images];
    if (single) {
      updated = [];
    } else {
      updated.splice(index, 1);
    }
    onImagesChange(updated);
  };

  // Drag & Drop
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
    const newImages = [...images];
    const dragged = newImages.splice(dragItem.current, 1)[0];
    newImages.splice(dragOverItem.current, 0, dragged);
    onImagesChange(newImages);
    setIsDragging(false);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Render slots
  const renderSlot = (value: T | undefined, index: number) => {
    let src: string | undefined;
    if (previews[index]) {
      src = previews[index]; // temporary blob URL
    } else if (value) {
      src = getPreview ? getPreview(value) : (value as any).main;
    }

    return (
      <ImageSlot
        key={index}
        index={index}
        src={src}
        processing={processingIndexes.includes(index)}
        onClick={() => (src ? setLightboxIndex(index) : handleAddClick(index))}
        onRemove={() => removeImage(index)}
        onDragStart={() => handleDragStart(index)}
        onDragEnter={() => handleDragEnter(index)}
        onDragEnd={() => handleDragEnd()}
        draggable={!single}
        emptyText={emptyText}
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
      {pendingCropFile && (
        <CropDialog
          file={pendingCropFile}
          open={!!pendingCropFile}
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
            open
            close={() => setLightboxIndex(null)}
            slides={lightBoxSlides}
            index={lightboxIndex ?? 0}
            plugins={[Zoom]}
            styles={{ container: { backgroundColor: "rgba(0,0,0,0.5)" } }}
            controller={{ closeOnBackdropClick: true }}
            portal={{ root: document.body }}
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
        renderSlot(images[0], 0)
      ) : (
        <>
          {images.map((img, idx) => renderSlot(img, idx))}
          {/* Add button */}
          <div
            className="w-[100px] h-[100px] md:w-full md:h-[100px] flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleAddClick(images.length)}
          >
            <span className="text-center text-sm font-medium">{emptyText}</span>
          </div>
        </>
      )}
    </div>
  );
}

// --- Public Editors ---
export function MultiImageEditor<T extends Record<string, any>>(
  props: Omit<ImageEditorProps<T>, "single">
) {
  return <BaseImageEditor {...props} single={false} />;
}

// --- Single Image Editor ---
export function ImageEditor<T extends Record<string, any>>({
  image,
  onImageChange,
  ...rest
}: {
  image?: T;
  onImageChange: (image?: T) => void;
} & Omit<ImageEditorProps<T>, "images" | "onImagesChange" | "single">) {
  return (
    <BaseImageEditor
      {...rest}
      images={image ? [image] : []}
      onImagesChange={(arr) => onImageChange(arr[0])}
      single
    />
  );
}
