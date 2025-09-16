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
    <div className="flex gap-2 overflow-x-auto p-2 border border-gray-300 rounded h-[120px] bg-gray-50 flex-nowrap">
      {imagePreviews.map((preview, index) => (
        <div
          key={preview}
          data-index={index}
          className={
            [
              "relative rounded overflow-hidden h-full w-[100px] flex-shrink-0 cursor-grab select-none",
              isDragging && dragItem.current === index ? "opacity-40 cursor-grabbing" : ""
            ].join(" ")
          }
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
          <button
            type="button"
            className="absolute top-0.5 right-0.5 bg-black/50 text-white border-none rounded-full w-5 h-5 text-center p-0 cursor-pointer z-10"
            onClick={e => { e.stopPropagation(); onRemove(index); }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewList;
