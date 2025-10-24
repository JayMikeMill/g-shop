import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Textarea, Label, ImageEditor } from "@components/ui";

const SiteSettingsBasicInfoForm: React.FC = () => {
  const { register, setValue, watch } = useFormContext();

  const logo = watch("logoURL");
  const banner = watch("bannerURL");

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
          onImageChange={(img) => setValue("logoURL", img ?? null)}
          emptyText="Upload Site Logo"
          className="h-28"
        />
      </div>

      <div className="flex flex-col">
        <Label>Banner Image</Label>
        <ImageEditor
          image={banner ?? undefined}
          onImageChange={(img) => setValue("bannerURL", img ?? null)}
          emptyText="Upload Banner Image"
          className="h-28"
        />
      </div>

      <div className="flex flex-col">
        <Label>Banner Message</Label>
        <Input {...register("bannerMessage")} />
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
