import React, { useState } from "react";
import Cropper from "react-easy-crop";

interface CropDialogProps {
  file: File;
  onCropComplete: (croppedBlob: Blob, previewUrl: string) => void;
  onCancel: () => void;
}

const CropDialog: React.FC<CropDialogProps> = ({ file, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => setImageUrl(reader.result as string);
    reader.readAsDataURL(file);
  }, [file]);

  // Set zoom to minimum (fully zoomed out) when image loads
  const cropperRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (!imageUrl) return;
    // Wait for Cropper to mount, then set zoom to min
    setTimeout(() => {
      if (cropperRef.current) {
        setZoom(1); // react-easy-crop min zoom is 1
      }
    }, 100);
  }, [imageUrl]);

  const onCropChange = (c: any) => setCrop(c);
  const onZoomChange = (z: number) => setZoom(z);
  const onCropCompleteInternal = (_: any, croppedPixels: any) => setCroppedAreaPixels(croppedPixels);

  async function getCroppedImg(imageSrc: string, cropPixels: any): Promise<{ blob: Blob, url: string }> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const size = Math.max(cropPixels.width, cropPixels.height);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('No 2d context');
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
        if (!blob) throw new Error('Canvas is empty');
        resolve({ blob, url: URL.createObjectURL(blob) });
      }, 'image/webp');
    });
  }

  function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', error => reject(error));
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
    });
  }

  const handleCrop = async () => {
    if (!imageUrl || !croppedAreaPixels) return;
    const { blob, url } = await getCroppedImg(imageUrl, croppedAreaPixels);
    onCropComplete(blob, url);
  };

  return (
    <div className="crop-dialog-modal-box">
      <div className="crop-dialog-inner">
        <div className="cropper-outer-box">
          <Cropper
            ref={cropperRef}
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteInternal}
            cropShape="rect"
            showGrid={true}
            style={{
              containerStyle: {
                width: '320px',
                height: '320px',
                border: '2px solid #4f8cff',
                borderRadius: '12px',
                boxShadow: '0 2px 12px #0002',
                overflow: 'hidden',
                background: '#f8faff',
                margin: '0 auto',
                position: 'relative',
              },
              cropAreaStyle: {
                border: '2px solid #4f8cff',
                borderRadius: '8px',
              },
            }}
          />
        </div>
        <div className="crop-dialog-actions">
          <button className="crop-cancel-btn" type="button" onClick={onCancel}>Cancel</button>
          <button className="crop-submit-btn" type="button" onClick={handleCrop}>Crop & Use Image</button>
        </div>
      </div>
      <style>{`
        .crop-dialog-modal-box {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid #4f8cff;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 8px 40px #0002;
          padding: 0;
        }
        .crop-dialog-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 32px 20px 32px;
        }
        .cropper-outer-box {
          width: 320px;
          height: 320px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .crop-dialog-actions {
          margin-top: 10px;
          display: flex;
          gap: 16px;
        }
        .crop-cancel-btn, .crop-submit-btn {
          padding: 8px 20px;
          border-radius: 6px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 500;
        }
        .crop-cancel-btn {
          background: #eee;
          color: #333;
          border: 1px solid #bbb;
        }
        .crop-submit-btn {
          background: #4f8cff;
          color: #fff;
          border: 1px solid #4f8cff;
          transition: background 0.2s;
        }
        .crop-submit-btn:hover {
          background: #3576d6;
        }
      `}</style>
    </div>
  );
};

export default CropDialog;
