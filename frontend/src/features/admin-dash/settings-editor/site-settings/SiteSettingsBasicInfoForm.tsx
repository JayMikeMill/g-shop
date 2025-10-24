import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Input,
  Textarea,
  Label,
  ImageEditor,
  TagBox,
  XButton,
} from "@components/ui";
import { CollectionSelect } from "../../components/CollectionSelect";
import type { Collection } from "shared/types";
import type { SiteSettings } from "shared/settings";

const SiteSettingsBasicInfoForm: React.FC = () => {
  const { register, setValue, watch, control } = useFormContext<SiteSettings>();

  const logo = watch("logoURL");
  const banner = watch("bannerURL");

  const {
    fields: collections,
    append: appendCollection,
    remove: removeCollection,
  } = useFieldArray({
    control,
    name: "homePageCollections",
  });

  // Called when user selects a preset from dropdown
  const addCollection = (collection: Collection) => {
    // Prevent duplicates by name
    if (!collections.some((t) => t.name === collection.name)) {
      appendCollection(collection);
    }
  };

  const remCollection = (index: number) => removeCollection(index);

  console.log("Rendering SiteSettingsBasicInfoForm with logo and banner:", {
    logo,
    banner,
  });
  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col">
        <Label>Site Name</Label>
        <Input {...register("siteName")} required />
      </div>

      <div className="flex flex-col">
        <Label>Site Description</Label>
        <Textarea {...register("siteDescription")} />
      </div>

      <div className="flex flex-col">
        <Label>Site Tagline</Label>
        <Input {...register("siteTagline")} />
      </div>

      <div className="flex flex-col">
        <Label>Site Logo</Label>
        <ImageEditor
          image={logo ?? undefined}
          onImageChange={(img) => setValue("logoURL", img ?? undefined)}
          emptyText="Upload Site Logo"
          className="h-28"
        />
      </div>

      <div className="flex flex-col">
        <Label>Banner Image</Label>
        <ImageEditor
          image={banner ?? undefined}
          onImageChange={(img) => setValue("bannerURL", img ?? undefined)}
          emptyText="Upload Banner Image"
          className="h-28"
        />
      </div>

      <div className="flex flex-col">
        <Label>Banner Message</Label>
        <Input {...register("bannerMessage")} />
      </div>

      {/*  Home Page Collections  */}
      <div className="flex flex-col gap-sm">
        <Label>Homepage Collections</Label>
        <CollectionSelect onSelect={addCollection} />

        {collections.length > 0 && (
          <div className="flex flex-wrap gap-md">
            {collections.map((c, i) => (
              <div key={c.id ?? i} className="flex items-center gap-2">
                <TagBox className="bg-surface text-base" text={c.name}>
                  <XButton
                    className="w-5 h-5"
                    onClick={() => remCollection(i)}
                  />
                </TagBox>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <Label>About Page Content (HTML)</Label>
        <Textarea
          {...register("aboutPageContent")}
          rows={6}
          placeholder="Your content here..."
          className="h-80"
        />
      </div>
    </div>
  );
};

export default SiteSettingsBasicInfoForm;
