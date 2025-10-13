import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Label } from "@components/ui";

const AdminSettingsAnalyticsForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      <Label>
        Google Analytics ID
        <Input {...register("googleAnalyticsID")} />
      </Label>
      <Label>
        Facebook Pixel ID
        <Input {...register("facebookPixelID")} />
      </Label>
      <Label>
        Hotjar ID
        <Input {...register("hotjarID")} />
      </Label>
      <Label>
        Custom Tracking Scripts (JSON Array)
        <Input
          {...register("customTrackingScripts", {
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

export default AdminSettingsAnalyticsForm;
