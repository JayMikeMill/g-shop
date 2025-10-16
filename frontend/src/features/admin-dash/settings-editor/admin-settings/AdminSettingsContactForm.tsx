import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Label } from "@components/ui";

const AdminSettingsContactForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col">
        <Label>Admin Email</Label>
        <Input {...register("adminEmail")} />
      </div>
      <div className="flex flex-col">
        <Label>Admin Phone</Label>
        <Input {...register("adminPhone")} />
      </div>
      <div className="flex flex-col">
        <Label>Admin Emails</Label>
        <Input
          {...register("superAdminEmails", {
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

export default AdminSettingsContactForm;
