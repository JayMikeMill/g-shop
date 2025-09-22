import React, { useRef, useState, useEffect } from "react";
import CropDialog from "../dialogs/CropDialog";
import { processImageOnly } from "@utils/image-processing";

interface ImagePreviewListProps {
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  setProcessedImages: React.Dispatch<React.SetStateAction<any[]>>;
  setIsProcessingImages: React.Dispatch<React.SetStateAction<boolean>>;
  onLightbox: (src: string) => void;
}

const ImageListEditor: React.FC<ImagePreviewListProps> = ({
  imagePreviews,
  setImagePreviews,
  setProcessedImages,
  setIsProcessingImages,
  onLightbox,
}) => {
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [pendingCropFiles, setPendingCropFiles] = useState<File[]>([]);
  const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);
  const [processingIndexes, setProcessingIndexes] = useState<number[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPendingCropFiles((prev) => [...prev, ...files]);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Queue crop files
  useEffect(() => {
    if (!pendingCropFile && pendingCropFiles.length > 0) {
      setPendingCropFile(pendingCropFiles[0]);
      setPendingCropFiles((prev) => prev.slice(1));
    }
  }, [pendingCropFile, pendingCropFiles]);

  // Crop complete → add preview instantly & start spinner
  const handleCropComplete = async (
    croppedBlob: Blob,
    previewUrl: string,
    originalName?: string
  ) => {
    const index = imagePreviews.length;

    // Add preview immediately
    setImagePreviews((prev) => [...prev, previewUrl]);
    setProcessingIndexes((prev) => [...prev, index]);
    setPendingCropFile(null); // close dialog immediately
    setIsProcessingImages(true);

    try {
      const croppedFile = new File(
        [croppedBlob],
        originalName || "cropped.webp",
        { type: "image/webp" }
      );

      const { mainBlob, previewBlob, thumbBlob } =
        await processImageOnly(croppedFile);

      setProcessedImages((prev) => [
        ...prev,
        {
          mainBlob,
          previewBlob,
          thumbBlob,
          previewUrl,
          name: croppedFile.name,
        },
      ]);
    } catch (err: any) {
      alert(err?.message || "Error processing cropped image");
      // Remove failed image
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    } finally {
      setProcessingIndexes((prev) => prev.filter((i) => i !== index));
      setIsProcessingImages(false);
    }
  };

  const handleCropCancel = () => setPendingCropFile(null);

  const removeImage = (index: number) => {
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      const removedPreview = newPreviews.splice(index, 1)[0];
      setProcessedImages((prevProcessed) =>
        prevProcessed.filter((img) => img && img.previewUrl !== removedPreview)
      );
      return newPreviews;
    });
    setProcessingIndexes((prev) => prev.filter((i) => i !== index));
  };

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    if (dragItem.current === dragOverItem.current) {
      dragItem.current = null;
      dragOverItem.current = null;
      setIsDragging(false);
      return;
    }

    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      const dragged = newPreviews.splice(dragItem.current!, 1)[0];
      newPreviews.splice(dragOverItem.current!, 0, dragged);

      setProcessedImages((prevProcessed) =>
        newPreviews
          .map((preview) =>
            prevProcessed.find((img) => img && img.previewUrl === preview)
          )
          .filter(Boolean)
      );

      return newPreviews;
    });

    dragItem.current = null;
    dragOverItem.current = null;
    setIsDragging(false);
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="input-box flex gap-2 p-2 overflow-x-auto h-[120px] flex-nowrap items-center md:grid md:grid-cols-2 md:auto-rows-min md:h-full md:overflow-y-auto">
      {pendingCropFile && (
        <CropDialog
          file={pendingCropFile}
          onCropComplete={(blob, url) =>
            handleCropComplete(blob, url, pendingCropFile?.name)
          }
          onCancel={handleCropCancel}
        />
      )}

      {imagePreviews.map((preview, index) => (
        <div
          key={preview + index}
          data-index={index}
          className={[
            "relative rounded-lg overflow-hidden flex-shrink-0 cursor-grab select-none",
            isDragging && dragItem.current === index ? "cursor-grabbing" : "",
            "w-[100px] h-[100px] md:w-full md:h-[100px]",
          ].join(" ")}
          draggable
          onDragStart={() => {
            dragItem.current = index;
            setIsDragging(true);
          }}
          onDragEnter={() => {
            if (isDragging) dragOverItem.current = index;
          }}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => onLightbox(preview)}
        >
          {index === 0 && (
            <span className="absolute top-1 left-1 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none">
              Main
            </span>
          )}
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-full object-cover block pointer-events-none"
          />

          {/* Remove button */}
          <button
            type="button"
            className="btn-circle-x absolute top-1 right-1 w-6 h-6 flex items-center 
            justify-center rounded-full cursor-pointer z-10 bg-black/50 
            text-white p-0 text-md font-mono"
            onClick={(e) => {
              e.stopPropagation();
              removeImage(index);
            }}
          >
            X
          </button>

          {/* Spinner if processing */}
          {processingIndexes.includes(index) && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
            </div>
          )}
        </div>
      ))}

      <div
        className="
					w-[100px] h-[100px] md:w-full md:h-[100px] flex-shrink-0 
					rounded-lg border-2 border-dashed border-gray-300 
					flex items-center justify-center text-gray-500 
					cursor-pointer hover:bg-gray-100 transition
				"
        onClick={handleAddImageClick}
      >
        <span className="text-center text-sm font-medium">
          + Add <br /> Image
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          multiple
        />
      </div>
    </div>
  );
};

export default ImageListEditor;
