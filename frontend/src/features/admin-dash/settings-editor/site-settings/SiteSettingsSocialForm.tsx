import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Label } from "@components/ui";

const handles = [
  "facebookHandle",
  "twitterHandle",
  "instagramHandle",
  "linkedinHandle",
  "youtubeHandle",
  "tiktokHandle",
  "pinterestHandle",
] as const;

const SiteSettingsSocialForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      {handles.map((h) => (
        <Label key={h}>
          {h}
          <Input {...register(h)} />
        </Label>
      ))}
      <Label>
        Other Social Handles (JSON)
        <Input
          {...register("otherSocialHandles", {
            setValueAs: (v) => {
              if (Array.isArray(v)) return v;
              try {
                return JSON.parse(v);
              } catch {
                return [];
              }
            },
          })}
        />
      </Label>
    </div>
  );
};

export default SiteSettingsSocialForm;
