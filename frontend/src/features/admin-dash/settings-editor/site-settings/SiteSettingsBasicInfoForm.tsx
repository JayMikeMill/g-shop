import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Textarea, Label } from "@components/ui";

const SiteSettingsBasicInfoForm: React.FC = () => {
  const { register } = useFormContext();

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
        <Label>Banner URL</Label>
        <Input {...register("bannerURL")} />
      </div>

      <div className="flex flex-col">
        <Label>Banner Message</Label>
        <Input {...register("bannerMessage")} />
      </div>

      <div className="flex flex-col">
        <Label>Logo URL</Label>
        <Input {...register("logoURL")} />
      </div>
    </div>
  );
};

export default SiteSettingsBasicInfoForm;
