import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Textarea, Label } from "@components/ui";

const SiteSettingsBasicInfoForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      <Label>
        Site Name
        <Input {...register("siteName")} required />
      </Label>
      <Label>
        Site Description
        <Textarea {...register("siteDescription")} />
      </Label>
      <Label>
        Site Tagline
        <Input {...register("siteTagline")} />
      </Label>
      <Label>
        Banner URL
        <Input {...register("bannerURL")} />
      </Label>
      <Label>
        Banner Message
        <Input {...register("bannerMessage")} />
      </Label>
      <Label>
        Logo URL
        <Input {...register("logoURL")} />
      </Label>
    </div>
  );
};

export default SiteSettingsBasicInfoForm;
