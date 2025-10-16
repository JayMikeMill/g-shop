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
        <div key={h} className="flex flex-col">
          <Label htmlFor={h}>{h}</Label>
          <Input id={h} {...register(h)} />
        </div>
      ))}

      <div className="flex flex-col">
        <Label htmlFor="otherSocialHandles">Other Social Handles (JSON)</Label>
        <Input
          id="otherSocialHandles"
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
      </div>
    </div>
  );
};

export default SiteSettingsSocialForm;
