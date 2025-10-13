import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Button, Input, Textarea, CircleSpinner } from "@components/ui";
import { ImageEditor } from "@components/ui";
import CollectionImageProcessor from "./CollectionImagesProcessor";
import type { SafeType, Collection, CollectionImageSet } from "@shared/types";
import { useApi } from "@api";

interface CollectionEditorFormProps {
  item?: Collection;
  isAdding?: boolean;
  onCreate: (data: Collection) => void;
  onModify: (data: Collection) => void;
  onCancel: () => void;
  typeLabel: string;
}

const newCollection: Collection = {
  name: "",
  slug: "",
};

const CollectionEditorForm: React.FC<CollectionEditorFormProps> = ({
  item,
  isAdding,
  onCreate,
  onModify,
  onCancel,
  typeLabel,
}) => {
  const [isProcessingImages, setIsProcessingImages] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const { uploadImage } = useApi().storage;

  const methods = useForm<SafeType<Collection>>({
    defaultValues: item ?? newCollection,
    mode: "onChange",
  });

  useEffect(() => {
    methods.reset(item ?? newCollection);
  }, [item]);

  const uploadImages = async (data: Collection) => {
    if (!data.images) return data;
    const newImages = { ...data.images };

    if (newImages.banner?.startsWith("blob:")) {
      const blobBanner = await fetch(newImages.banner).then((r) => r.blob());
      newImages.banner = await uploadImage(blobBanner, `collection_banner`);
    }
    if (newImages.preview?.startsWith("blob:")) {
      const blobPreview = await fetch(newImages.preview).then((r) => r.blob());
      newImages.preview = await uploadImage(blobPreview, `collection_preview`);
    }
    return { ...data, images: newImages };
  };

  const handleSave = methods.handleSubmit(async (formData) => {
    try {
      setIsSaving(true);
      const dataWithImages = await uploadImages(formData);
      if (isAdding) {
        onCreate(dataWithImages);
      } else {
        onModify({ ...dataWithImages, id: dataWithImages.id! });
      }
    } catch (err: any) {
      alert(err?.message || "Error saving collection");
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <FormProvider {...methods}>
      {isSaving && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30">
          <CircleSpinner text={`Saving ${typeLabel}...`} />
        </div>
      )}
      <form
        onSubmit={handleSave}
        className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 w-auto px-1"
      >
        <CollectionFields setIsProcessingImages={setIsProcessingImages} />
        <div className="w-full flex flex-row gap-2 px-0 sm:px-0 items-center py-4 border-t flex-shrink-0">
          <Button type="button" className="w-full h-12" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full h-12"
            disabled={isProcessingImages}
          >
            {isProcessingImages
              ? "Processing..."
              : isAdding
                ? `Add ${typeLabel}`
                : `Save Changes`}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CollectionEditorForm;

const CollectionFields: React.FC<{
  setIsProcessingImages: (v: boolean) => void;
}> = ({ setIsProcessingImages }) => {
  const { register, setValue, watch } = useFormContext<Collection>();
  const images = watch("images") as CollectionImageSet;
  const watchSeoKeywords = watch("seoKeywords") ?? [];

  return (
    <>
      <div className="flex flex-row gap-md min-w-0">
        <label className="flex flex-1 flex-col gap-1 text-sm w-auto font-semibold text-text">
          Name
          <Input
            className="w-full"
            type="text"
            placeholder="Name"
            {...register("name")}
            required
          />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm font-semibold text-text">
          Slug
          <Input
            type="text"
            placeholder="URL Slug"
            {...register("slug")}
            required
            className="w-full"
          />
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1 text-sm font-semibold text-text">
          SEO Title
          <Input
            type="text"
            placeholder="SEO Title"
            {...register("seoTitle")}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-semibold text-text">
          Keywords (comma-separated)
          <Input
            type="text"
            placeholder="keyword1, keyword2"
            value={
              Array.isArray(watchSeoKeywords) ? watchSeoKeywords.join(", ") : ""
            }
            onChange={(e) => {
              const keywords = e.target.value
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean);
              setValue("seoKeywords", keywords.join(", "), {
                shouldDirty: true,
              });
            }}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm font-semibold text-text">
        Description
        <Textarea
          placeholder="Description"
          {...register("description")}
          className="px-2 py-1 h-24 resize-none"
        />
      </label>
      <div className="flex flex-row gap-2">
        {/* Preview Image */}
        <ImageEditor<CollectionImageSet>
          image={images}
          onImageChange={(img) =>
            setValue("images.preview", img?.preview, { shouldDirty: true })
          }
          getPreview={(img) => img?.preview || ""}
          processor={CollectionImageProcessor.processPreview}
          setIsProcessingImages={setIsProcessingImages}
          emptyText="+ Add Preview Image"
          className="w-32 aspect-[1/1]"
        />
        {/* Banner Image */}
        <ImageEditor<CollectionImageSet>
          image={images}
          onImageChange={(img) =>
            setValue("images.banner", img?.banner, { shouldDirty: true })
          }
          getPreview={(img) => img?.banner || ""}
          processor={CollectionImageProcessor.processBanner}
          setIsProcessingImages={setIsProcessingImages}
          emptyText="+ Add Banner Image"
          className="flex-1"
        />
      </div>
    </>
  );
};
