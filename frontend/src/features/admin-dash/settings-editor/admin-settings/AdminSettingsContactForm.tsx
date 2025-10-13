import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Label } from "@components/ui";

const AdminSettingsContactForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      <Label>
        Admin Email
        <Input {...register("adminEmail")} />
      </Label>
      <Label>
        Admin Phone
        <Input {...register("adminPhone")} />
      </Label>
      <Label>
        Super Admin Emails (JSON)
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
      </Label>
    </div>
  );
};

export default AdminSettingsContactForm;
