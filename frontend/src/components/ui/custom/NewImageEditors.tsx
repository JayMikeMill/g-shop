import React, { useRef, useState } from "react";
import { Input, XButton, Image } from "@components/ui";

/** -------------------- MultiImageEditor -------------------- */
export interface MultiImageEditorProps<T extends Record<string, any>> {
  images: T[];
  onImagesChange: (images: T[]) => void;
  processor: (file: File) => Promise<T>;
  getPreview?: (item: T) => string;
  emptyText?: string;
  className?: string;
}

function ImageSlot({
  src,
  processing,
  onClick,
  onRemove,
  emptyText = "+ Add Image",
}: {
  src?: string;
  processing: boolean;
  onClick: () => void;
  onRemove: () => void;
  emptyText?: string;
}) {
  const emptyBorder = src ? "" : "border-2 border-dashed border-gray-300";
  return (
    <div
      onClick={onClick}
      className={`relative rounded-lg overflow-hidden flex-shrink-0 w-[100px] h-[100px] select-none cursor-pointer flex items-center justify-center ${emptyBorder} hover:bg-gray-100 transition`}
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
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
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

export function MultiImageEditor<T extends Record<string, any>>({
  images,
  onImagesChange,
  processor,
  getPreview,
  emptyText = "+ Add Image",
  className = "",
}: MultiImageEditorProps<T>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  // Removed unused previews state
  const [processingIndexes, setProcessingIndexes] = useState<number[]>([]);

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previewItems = files.map(
      (file) =>
        ({ __preview: true, url: URL.createObjectURL(file) }) as unknown as T
    );
    onImagesChange([...images, ...previewItems]);
    const startIdx = images.length;
    setProcessingIndexes((prev) => [
      ...prev,
      ...files.map((_, i) => startIdx + i),
    ]);
    try {
      const processedItems = await Promise.all(
        files.map((file) => processor(file))
      );
      const updatedImages = [...images, ...processedItems];
      onImagesChange(updatedImages);
    } catch (err: any) {
      alert(err?.message || "Error processing image(s)");
    } finally {
      setProcessingIndexes((prev) => prev.filter((i) => i < images.length));
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const renderSlot = (value: T | undefined, index: number) => {
    const src =
      value && (value as any).__preview
        ? (value as any).url
        : getPreview
          ? getPreview(value as T)
          : (value as any)?.main;
    return (
      <ImageSlot
        key={index}
        src={src}
        processing={processingIndexes.includes(index)}
        onClick={() => {}}
        onRemove={() => removeImage(index)}
        emptyText={emptyText}
      />
    );
  };

  return (
    <div
      className={`border border-border rounded flex gap-2 p-2 overflow-x-auto h-[120px] flex-nowrap items-center ${className}`}
    >
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
        multiple
      />
      {images.map((img, idx) => renderSlot(img, idx))}
      <div
        className="h-full aspect-[1/1] flex-shrink-0 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-100 transition"
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="text-center text-sm font-medium">{emptyText}</span>
      </div>
    </div>
  );
}

/** -------------------- ImageEditor (Single) -------------------- */
export interface ImageEditorProps {
  image?: string;
  onImageChange: (url?: string) => void;
  emptyText?: string;
  className?: string;
}

export function ImageEditor({
  image,
  onImageChange,
  emptyText = "+ Add Image",
  className = "",
}: ImageEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>(image);
  const [processing, setProcessing] = useState(false);

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setProcessing(true);
    try {
      // Simulate async processing
      await new Promise((resolve) => setTimeout(resolve, 800));
      onImageChange(url);
    } finally {
      setProcessing(false);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = () => {
    setPreview(undefined);
    onImageChange(undefined);
  };

  return (
    <div
      className={`relative w-full h-[200px] border border-border rounded flex items-center justify-center ${className}`}
    >
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileInputChange}
      />
      <ImageSlot
        src={preview}
        processing={processing}
        onClick={() => fileInputRef.current?.click()}
        onRemove={handleRemove}
        emptyText={emptyText}
      />
    </div>
  );
}
