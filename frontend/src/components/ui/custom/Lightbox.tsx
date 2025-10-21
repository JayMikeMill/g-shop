import { useEffect } from "react";
import YALightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

interface LightboxProps {
  open: boolean;
  index?: number;
  slides: { src: string }[];
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  open,
  index = 0,
  slides,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return;

    // Push dummy history state when lightbox opens
    history.pushState({ lightbox: true }, document.title);

    const handlePopState = (e: PopStateEvent) => {
      if (open) {
        onClose();
        // Remove dummy state to restore normal back behavior
        if (history.state?.lightbox) {
          history.back();
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <YALightbox
      open={open}
      index={index}
      slides={slides}
      close={onClose}
      plugins={[Zoom]}
      styles={{ container: { backgroundColor: "rgba(0,0,0,0.5)" } }}
      zoom={{ scrollToZoom: true, maxZoomPixelRatio: 2 }}
    />
  );
};

export { Lightbox };
