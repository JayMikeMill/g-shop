import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Button, Input, Textarea, CircleSpinner } from "@components/ui";
import { ImageEditor } from "@components/ui";
import type { SafeType, Collection, CollectionImageSet } from "shared/types";
import { processPreviewImage } from "@utils/dataImagesProcessing";

interface CollectionEditorFormProps {
  item?: Collection;
  isAdding?: boolean;
  onCreate: (data: Collection) => void;
  onModify: (data: Collection) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
  typeLabel: string;
}

const newCollection: Collection = {
  name: "",
  slug: "",
  images: { banner: "", preview: "", thumbnail: "" },
  description: "",
  seoTitle: "",
};

const CollectionEditorForm: React.FC<CollectionEditorFormProps> = ({
  item,
  isAdding,
  onCreate,
  onModify,
  onDelete,
  onCancel,
  typeLabel,
}) => {
  const [isProcessingImages, setIsProcessingImages] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const methods = useForm<SafeType<Collection>>({
    defaultValues: item ?? newCollection,
    mode: "onChange",
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    reset(item ?? newCollection);
  }, [item]);

  const handleSave = handleSubmit(async (formData) => {
    try {
      setIsSaving(true);
      if (isAdding) {
        onCreate(formData);
      } else {
        onModify(formData);
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
      <form onSubmit={handleSave} className="flex flex-col h-full min-h-0">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-md">
          <CollectionFields setIsProcessingImages={setIsProcessingImages} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-row bg-surface border-t gap-2 px-0 py-md items-center sticky bottom-0 z-10">
          <Button
            variant="destructive"
            className="w-full h-12"
            onClick={onDelete && (() => onDelete(item?.id!))}
          >
            Delete
          </Button>
          <Button variant="flat" className="w-full h-12" onClick={onCancel}>
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
}> = () => {
  const { register, setValue, watch } = useFormContext<Collection>();
  const images = watch("images") as CollectionImageSet;
  const watchSeoKeywords = watch("seoKeywords") ?? [];

  return (
    <div className="flex flex-col gap-md py-md">
      <div className="flex flex-row gap-md">
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
            className="w-full"
            required
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

        <label className="flex flex-col gap-1 text-sm font-semibold text-text">
          Description
          <Textarea
            placeholder="Description"
            {...register("description")}
            className="px-2 py-1 h-24 resize-none"
          />
        </label>
      </div>

      <div className="flex w-full gap-2 h-28">
        {/* Left: perfect square */}

        <ImageEditor
          image={images.preview ?? undefined}
          onImageChange={(img) =>
            setValue("images.preview", img ?? null, { shouldDirty: true })
          }
          processor={processPreviewImage}
          emptyText="+ Add Preview Image"
          className="w-40"
        />

        {/* Right: fills remaining space */}

        <ImageEditor
          image={images.banner ?? undefined}
          onImageChange={(img) =>
            setValue("images.banner", img ?? null, { shouldDirty: true })
          }
          processor={processPreviewImage}
          emptyText="+ Add Banner Image"
          className="w-full"
        />
      </div>
    </div>
  );
};
