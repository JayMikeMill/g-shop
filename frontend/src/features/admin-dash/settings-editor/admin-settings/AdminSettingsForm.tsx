import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AdminSettingsSchema, AdminSettingsFormType } from "./AdminSettingsSchema";
import AdminSettingsContactForm from "./AdminSettingsContactForm";
import AdminSettingsShippingOriginForm from "./AdminSettingsShippingOriginForm";
import AdminSettingsFeaturesForm from "./AdminSettingsFeaturesForm";
import AdminSettingsAnalyticsForm from "./AdminSettingsAnalyticsForm";
import { AnimatedDropdownBox } from "@components/ui/custom/AnimatedDropdownBox";
import type { AdminSettings } from "shared/settings";
import type { SafeType } from "shared/types";

interface Props {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
}

const AdminSettingsForm: React.FC<Props> = ({ settings, onSave }) => {
  const methods = useForm<SafeType<AdminSettings>>({
    //resolver: zodResolver(AdminSettingsSchema),
    defaultValues: settings,
    mode: "onChange",
  });

  useEffect(() => {
    methods.reset(settings);
  }, [settings]);

  const handleSave = methods.handleSubmit(onSave);

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-sm w-full sm:flex-row sm:gap-lg"
        onSubmit={handleSave}
      >
        <div className="flex flex-col w-full sm:w-1/2">
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="Contact Settings"
            openInitially={true}
          >
            <AdminSettingsContactForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="Shipping Origin"
            openInitially={true}
          >
            <AdminSettingsShippingOriginForm />
          </AnimatedDropdownBox>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="Features Settings"
            openInitially={true}
          >
            <AdminSettingsFeaturesForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="Analytics Settings"
            openInitially={true}
          >
            <AdminSettingsAnalyticsForm />
          </AnimatedDropdownBox>
          <button className="btn btn-primary mt-lg" type="submit">
            Save Admin Settings
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminSettingsForm;
