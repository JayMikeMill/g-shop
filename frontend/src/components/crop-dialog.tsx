import React, { useState } from "react";
import Cropper from "react-easy-crop";

interface CropDialogProps {
  file: File;
  onCropComplete: (croppedBlob: Blob, previewUrl: string) => void;
  onCancel: () => void;
}

const CropDialog: React.FC<CropDialogProps> = ({
  file,
  onCropComplete,
  onCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  const cropperRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (!imageUrl) return;
    setTimeout(() => {
      if (cropperRef.current) setZoom(1);
    }, 100);
  }, [imageUrl]);

  const onCropChange = (c: any) => setCrop(c);
  const onZoomChange = (z: number) => setZoom(z);
  const onCropCompleteInternal = (_: any, croppedPixels: any) =>
    setCroppedAreaPixels(croppedPixels);

  async function getCroppedImg(
    imageSrc: string,
    cropPixels: any
  ): Promise<{ blob: Blob; url: string }> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const size = Math.max(cropPixels.width, cropPixels.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("No 2d context");
    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      size,
      size
    );
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) throw new Error("Canvas is empty");
        resolve({ blob, url: URL.createObjectURL(blob) });
      }, "image/webp");
    });
  }

  function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", (error) => reject(error));
      img.crossOrigin = "anonymous";
      img.src = url;
    });
  }

  const handleCrop = async () => {
    if (!imageUrl || !croppedAreaPixels) return;
    const { blob, url } = await getCroppedImg(imageUrl, croppedAreaPixels);
    onCropComplete(blob, url);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 dark:bg-black/60">
      {/* Modal container */}
      <div className="bg-surface dark:bg-background rounded-lg border-2 border-primary shadow-xl p-xl flex flex-col w-[360px] sm:w-[400px] max-h-[90vh] overflow-hidden">
        {/* Title */}
        <h2 className="text-xl font-bold text-center text-text mb-lg">
          Crop Image
        </h2>

        {/* Cropper container */}
        <div className="relative w-full h-80 mb-lg border-2 border-primary rounded-md overflow-hidden bg-background">
          {imageUrl && (
            <Cropper
              ref={cropperRef}
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropCompleteInternal}
              cropShape="rect"
              showGrid={true}
              style={{
                containerStyle: {
                  width: "100%",
                  height: "100%",
                  position: "relative",
                },
                cropAreaStyle: {
                  border: "2px solid var(--color-primary)",
                  borderRadius: "0.5rem",
                },
              }}
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-md">
          <button
            type="button"
            className="px-lg py-sm rounded-md border border-border bg-surface text-textSecondary hover:bg-background transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-lg py-sm rounded-md border border-primary bg-primary text-white font-medium hover:bg-primaryDark transition"
            onClick={handleCrop}
          >
            Crop & Use Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropDialog;
