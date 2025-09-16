import React from "react";

interface ImagePreviewListProps {
  imagePreviews: string[];
  onRemove: (index: number) => void;
  onSort: (from: number, to: number) => void;
  onLightbox: (src: string) => void;
  isDragging: boolean;
  dragItem: React.MutableRefObject<number | null>;
  dragOverItem: React.MutableRefObject<number | null>;
  setIsDragging: (dragging: boolean) => void;
}

const ImagePreviewList: React.FC<ImagePreviewListProps> = ({
  imagePreviews,
  onRemove,
  onSort,
  onLightbox,
  isDragging,
  dragItem,
  dragOverItem,
  setIsDragging,
}) => {
  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    onSort(dragItem.current, dragOverItem.current);
    dragItem.current = null;
    dragOverItem.current = null;
    setIsDragging(false);
  };

  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    e.preventDefault();
    dragItem.current = index;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    const targetIndex = (target as HTMLElement)?.dataset.index;
    if (targetIndex) {
      dragOverItem.current = parseInt(targetIndex);
    }
  };

  return (
    <div className="image-previews">
      {imagePreviews.map((preview, index) => (
        <div
          key={preview}
          data-index={index}
          className={`image-preview ${isDragging && dragItem.current === index ? "dragging" : ""}`}
          draggable
          onDragStart={() => { dragItem.current = index; setIsDragging(true); }}
          onDragEnter={() => (dragOverItem.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
          onTouchStart={(e) => handleTouchStart(index, e)}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleSort}
          onClick={() => onLightbox(preview)}
        >
          {index === 0 && <span className="image-label">Main</span>}
          <img src={preview} alt="Product preview" />
          <button type="button" onClick={e => { e.stopPropagation(); onRemove(index); }}>&times;</button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewList;
