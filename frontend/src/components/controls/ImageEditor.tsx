import React, { useRef, useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import CropDialog from "@components/dialogs/CropDialog";

// --- Types ---
// Represents a static slot in the editor (like fixed positions)
export interface StaticSlot<T extends Record<string, any>> {
  key: string; // unique slot key
  mapResult?: (result: T) => Partial<T>; // map processed result to main image
  className?: string; // optional class for styling
  getPreview?: (item: T) => string; // custom preview extractor
  processor?: (
    file: File,
    onProgress?: (percent: number) => void
  ) => Promise<T>; // custom processor for this slot
}

// Props for the main ImagesEditor component
export interface ImagesEditorProps<T extends Record<string, any>> {
  className?: string;
  images: T[];
  onImagesChange: (images: T[]) => void;
  setIsProcessingImages: React.Dispatch<React.SetStateAction<boolean>>;
  processor: (file: File, onProgress?: (percent: number) => void) => Promise<T>;
  getPreview?: (item: T) => string;
  staticSlots?: StaticSlot<T>[];
}

// --- ImageSlot Component ---
// Handles rendering of each image or empty slot
interface ImageSlotProps<T extends Record<string, any>> {
  index: number;
  value?: T;
  slot?: StaticSlot<T>;
  isStatic?: boolean;
  src?: string;
  processing: boolean;
  onClick: () => void;
  onRemove: () => void;
  onDragStart?: () => void;
  onDragEnter?: () => void;
  onDragEnd?: () => void;
}

function ImageSlot<T extends Record<string, any>>({
  index,
  slot,
  isStatic = false,
  src,
  processing,
  onClick,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
}: ImageSlotProps<T>) {
  // Text shown if the slot is empty
  const emptyText = isStatic ? `+ Add ${slot?.key}` : "+ Add Image";

  return (
    <div
      key={isStatic ? slot!.key : index}
      draggable={!isStatic} // only dynamic images are draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden flex-shrink-0 w-[100px] h-[100px] md:w-full md:h-[100px] select-none cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-100 transition ${slot?.className || ""}`}
    >
      {/* Image preview or empty text */}
      {src ? (
        <img
          src={src}
          alt="Preview"
          className="w-full h-full object-cover block pointer-events-none"
        />
      ) : (
        <span className="text-center text-sm font-medium text-gray-500">
          {emptyText}
        </span>
      )}

      {/* Spinner overlay when processing */}
      {processing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Remove button */}
      {src && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering click on slot
            onRemove();
          }}
          className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full cursor-pointer z-10 bg-black/50 text-white p-0 text-md font-mono"
        >
          X
        </button>
      )}
    </div>
  );
}

// --- Main ImagesEditor Component ---
export function ImagesEditor<T extends Record<string, any>>({
  className,
  images,
  onImagesChange,
  setIsProcessingImages,
  processor,
  getPreview,
  staticSlots,
}: ImagesEditorProps<T>) {
  // --- Refs ---
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // --- State ---
  const [targetSlotIndex, setTargetSlotIndex] = useState<number | null>(null);
  const [pendingCropFiles, setPendingCropFiles] = useState<File[]>([]);
  const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);
  const [processingIndexes, setProcessingIndexes] = useState<number[]>([]);
  const [progressMap, setProgressMap] = useState<Record<number, number>>({});
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const staticCount = staticSlots?.length || 0;
  const isStaticEditor = staticCount > 0;

  // --- File Input Handling ---
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) setPendingCropFiles((prev) => [...prev, ...files]);
    if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
  };

  // Automatically process next pending crop file
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

  // --- Crop Handling ---
  const handleCropComplete = async (
    croppedBlob: Blob,
    originalName?: string
  ) => {
    if (targetSlotIndex === null) return;
    const index = targetSlotIndex;

    setProcessingIndexes((prev) => [...prev, index]);
    setPendingCropFile(null);
    setIsProcessingImages(true);
    setTargetSlotIndex(null);

    try {
      // Convert cropped blob into File
      const file = new File([croppedBlob], originalName || "cropped.webp", {
        type: "image/webp",
      });

      // Use slot-specific processor if exists, otherwise default
      const slotProcessor = staticSlots?.[index]?.processor ?? processor;
      const processedItem = await slotProcessor(file, (percent) =>
        setProgressMap((prev) => ({ ...prev, [index]: percent }))
      );

      const updatedImages = [...images];

      // Handle static slot mapping
      if (staticSlots && staticSlots[index]?.mapResult) {
        updatedImages[0] = {
          ...(updatedImages[0] || {}),
          ...staticSlots[index]!.mapResult!(processedItem),
        };
      } else {
        updatedImages[index] = processedItem;
      }

      onImagesChange(updatedImages);
    } catch (err: any) {
      alert(err?.message || "Error processing cropped image");

      // Rollback changes
      const copy = [...images];
      if (index < staticCount && staticSlots) {
        const slot = staticSlots[index];
        if (slot?.mapResult) {
          const current = { ...copy[0] };
          Object.keys(slot.mapResult(current)).forEach(
            (field) => delete current[field]
          );
          copy[0] = current;
        } else {
          copy[0] = undefined as any;
        }
      } else {
        copy[index] = undefined as any;
      }
      onImagesChange(copy);
    } finally {
      setProcessingIndexes((prev) => prev.filter((i) => i !== index));
      setProgressMap((prev) => {
        const copy = { ...prev };
        delete copy[index];
        return copy;
      });
      setIsProcessingImages(false);
    }
  };

  const handleCropCancel = () => setPendingCropFile(null);

  // --- Remove Image ---
  const removeImage = (index: number) => {
    const updated = [...images];

    if (index < staticCount && staticSlots) {
      const slot = staticSlots[index];
      if (slot?.mapResult) {
        const current = { ...updated[0] };
        const mappedFields = Object.keys(slot.mapResult(current));
        mappedFields.forEach((field) => delete current[field]);
        updated[0] = current;
      } else {
        updated[0] = undefined as any;
      }
    } else {
      updated.splice(index, 1);
    }

    onImagesChange(updated);

    setProcessingIndexes((prev) => prev.filter((i) => i !== index));
    setProgressMap((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  // --- Drag & Drop for dynamic images ---
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
    const newImages = [...images];
    const dragged = newImages.splice(dragItem.current, 1)[0];
    newImages.splice(dragOverItem.current, 0, dragged);
    onImagesChange(newImages);

    setIsDragging(false);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // --- Render each slot ---
  const renderSlot = (
    value: T | undefined,
    index: number,
    slot?: StaticSlot<T>,
    isStatic = false
  ) => {
    let src: string | undefined;
    const obj = isStatic ? images[0] : value;

    if (obj) {
      if (slot?.getPreview && isStatic) src = slot.getPreview(obj);
      else if (getPreview) src = getPreview(obj);
      else src = (obj as any).main;
    }

    return (
      <ImageSlot
        index={index}
        slot={slot}
        isStatic={isStatic}
        src={src}
        processing={processingIndexes.includes(index)}
        onClick={() => (src ? setLightboxIndex(index) : handleAddClick(index))}
        onRemove={() => removeImage(index)}
        onDragStart={() => !isStatic && handleDragStart(index)}
        onDragEnter={() => !isStatic && handleDragEnter(index)}
        onDragEnd={() => !isStatic && handleDragEnd()}
      />
    );
  };

  return (
    <div
      className={`input-box flex gap-2 p-2 overflow-x-auto h-[120px] flex-nowrap items-center sm:grid sm:grid-cols-2 sm:auto-rows-min sm:h-full sm:overflow-y-auto ${className}`}
    >
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
            slides={images.map((img) => ({
              src: getPreview ? getPreview(img) : (img as any).main,
            }))}
            index={lightboxIndex ?? 0}
            plugins={[Zoom]}
            styles={{ container: { backgroundColor: "rgba(0,0,0,0.5)" } }}
            controller={{ closeOnBackdropClick: true }}
            portal={{ root: document.body }}
          />
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Render static or dynamic slots */}
      {isStaticEditor ? (
        staticSlots!.map((slot, idx) =>
          renderSlot(images[idx], idx, slot, true)
        )
      ) : (
        <>
          {images.map((img, idx) => renderSlot(img, idx))}
          {/* Global Add Button */}
          <div
            className="w-[100px] h-[100px] md:w-full md:h-[100px] flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition"
            onClick={() => handleAddClick(images.length)}
          >
            <span className="text-center text-sm font-medium">+ Add Image</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
              multiple
            />
          </div>
        </>
      )}
    </div>
  );
}
