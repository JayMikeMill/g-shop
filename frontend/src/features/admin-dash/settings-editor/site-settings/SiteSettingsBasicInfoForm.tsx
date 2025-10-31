import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  Input,
  Textarea,
  Label,
  ImageEditor,
  TagBox,
  XButton,
  Toggle,
} from "@components/ui";
import { CollectionSelect } from "../../components/CollectionSelect";
import type { Collection } from "shared/types";
import type { SiteSettings } from "shared/settings";

const SiteSettingsBasicInfoForm: React.FC = () => {
  const { register, setValue, watch, control } = useFormContext<SiteSettings>();

  const icon = watch("siteIconURL");
  const logo = watch("logoURL");
  const banner = watch("bannerURL");

  const disclaimerEnabled = watch("demoSiteDisclaimer");

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

  return (
    <div className="flex flex-col gap-md">
      {/* Site Name */}
      <div className="flex flex-col">
        <Label>Site Name</Label>
        <Input {...register("siteName")} required />
      </div>

      {/* Site Description */}
      <div className="flex flex-col">
        <Label>Site Description</Label>
        <Textarea {...register("siteDescription")} />
      </div>

      {/* Site Tagline */}
      <div className="flex flex-col">
        <Label>Site Tagline</Label>
        <Input {...register("siteTagline")} />
      </div>

      {/* Site Icon Image */}
      <div className="flex flex-col">
        <Label>Site Icon</Label>
        <ImageEditor
          image={icon ?? undefined}
          onImageChange={(img) => setValue("siteIconURL", img ?? undefined)}
          emptyText="+Upload Site Icon"
          className="h-28 w-28"
        />
      </div>

      {/* Logo Image */}
      <div className="flex flex-col">
        <Label>Site Logo</Label>
        <ImageEditor
          image={logo ?? undefined}
          onImageChange={(img) => setValue("logoURL", img ?? undefined)}
          emptyText="Upload Site Logo"
          className="h-28"
        />
      </div>

      {/* Banner Image */}
      <div className="flex flex-col">
        <Label>Banner Image</Label>
        <ImageEditor
          image={banner ?? undefined}
          onImageChange={(img) => setValue("bannerURL", img ?? undefined)}
          emptyText="Upload Banner Image"
          className="h-28"
        />
      </div>

      {/* Banner Message */}
      <div className="flex flex-col">
        <Label>Banner Message</Label>
        <Input {...register("bannerMessage")} />
      </div>

      {/* Measurement System */}
      <div className="flex flex-col">
        <Label>Measurement System</Label>
        <div className="flex gap-md">
          <Toggle
            className="flex-1"
            checked={watch("measurementSystem") === "METRIC"}
            onToggle={() => setValue("measurementSystem", "METRIC")}
          >
            Metric (cm, kg)
          </Toggle>
          <Toggle
            className="flex-1"
            checked={watch("measurementSystem") === "IMPERIAL"}
            onToggle={() => setValue("measurementSystem", "IMPERIAL")}
          >
            Imperial (in, lbs)
          </Toggle>
        </div>
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

      {/* About Page Content */}
      <div className="flex flex-col">
        <Label>About Page Content (HTML)</Label>
        <Textarea
          {...register("aboutPageContent")}
          rows={6}
          placeholder="Your content here..."
          className="h-80"
        />
      </div>

      {/* Demo Site Disclaimer */}
      <Toggle
        checked={!!disclaimerEnabled}
        onToggle={(v) => setValue("demoSiteDisclaimer", v)}
      >
        Demo Site Disclaimer {disclaimerEnabled ? "Enabled" : "Disabled"}
      </Toggle>
    </div>
  );
};

export default SiteSettingsBasicInfoForm;
