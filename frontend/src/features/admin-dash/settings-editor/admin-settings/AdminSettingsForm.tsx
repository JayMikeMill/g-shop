import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { AdminSettingsSchema, AdminSettingsFormType } from "./AdminSettingsSchema";

// Import sub-forms and components
import { Button } from "@components/ui";

// Import sub-forms
import AdminSettingsContactForm from "./AdminSettingsContactForm";
import AdminSettingsShippingOriginForm from "./AdminSettingsShippingOriginForm";
import AdminSettingsFeaturesForm from "./AdminSettingsFeaturesForm";
import AdminSettingsAnalyticsForm from "./AdminSettingsAnalyticsForm";
import { AnimatedDropdownBox } from "@components/ui/custom/AnimatedDropdownBox";

// Import types
import type { AdminSettings } from "shared/settings";
import type { Address, SafeType } from "shared/types";

import { useApi } from "@app/hooks";

interface Props {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
}

const AdminSettingsForm: React.FC<Props> = ({ settings, onSave }) => {
  const { verifyAddress } = useApi().shipping;
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const methods = useForm<SafeType<AdminSettings>>({
    //resolver: zodResolver(AdminSettingsSchema),
    defaultValues: settings,
    mode: "onChange",
  });

  useEffect(() => {
    methods.reset(settings);
  }, [settings]);

  const verifyOriginAddress = async (settings: AdminSettings) => {
    const result = await verifyAddress(settings.shippingOrigin);
    if (!result.valid) {
      throw new Error();
    }
    return { ...settings, shippingOrigin: result.normalizedAddress! };
  };

  const handleSave = async (settings: AdminSettings) => {
    try {
      const verifiedSettings = await verifyOriginAddress(settings);
      onSave(verifiedSettings);
    } catch {
      setErrorMsg("Failed to verify origin address");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-sm w-full p-sm sm:p-md sm:flex-row sm:gap-lg"
        onSubmit={methods.handleSubmit(handleSave)}
      >
        <div className="flex flex-col w-full gap-sm sm:w-1/2 sm:gap-md">
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
        <div className="flex flex-col w-full gap-sm sm:w-1/2 sm:gap-md">
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
      {/* Action buttons */}
      <form
        className="sticky flex z-20 justify-center bg-transparent bottom-0 py-md pointer-events-none"
        onSubmit={methods.handleSubmit(handleSave)}
      >
        <div className="flex flex-col h-full rounded-xl border shadow-md bg-surface p-sm pointer-events-auto">
          {errorMsg && (
            <p className="text-destructive text-center py-sm ">{errorMsg}</p>
          )}
          <Button className="text-2xl h-full px-xl" type="submit">
            Save Admin Settings
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminSettingsForm;
