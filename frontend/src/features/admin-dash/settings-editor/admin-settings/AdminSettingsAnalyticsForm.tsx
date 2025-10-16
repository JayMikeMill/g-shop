import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Label } from "@components/ui";

const AdminSettingsAnalyticsForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col">
        <Label>Admin Emails</Label>
        <Input {...register("googleAnalyticsID")} />
      </div>

      <div className="flex flex-col">
        <Label>Facebook Pixel ID</Label>
        <Input {...register("facebookPixelID")} />
      </div>

      <div className="flex flex-col">
        <Label>Hotjar ID</Label>
        <Input {...register("hotjarID")} />
      </div>

      <div className="flex flex-col">
        <Label>Custom Tracking Scripts (JSON Array)</Label>
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
      </div>
    </div>
  );
};

export default AdminSettingsAnalyticsForm;
