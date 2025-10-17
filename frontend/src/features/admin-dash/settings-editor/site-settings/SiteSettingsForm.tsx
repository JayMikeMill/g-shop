import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
//import { zodResolver } from "@hookform/resolvers/zod";
//import { SiteSettingsSchema, SiteSettingsFormType } from "./SiteSettingsSchema";
import SiteSettingsBasicInfoForm from "./SiteSettingsBasicInfoForm";
import SiteSettingsThemeForm from "./SiteSettingsThemeForm";
import SiteSettingsSocialForm from "./SiteSettingsSocialForm";
import SiteSettingsEcommerceForm from "./SiteSettingsEcommerceForm";
import { AnimatedDropdownBox } from "@components/ui/custom/AnimatedDropdownBox";
import type { SiteSettings } from "shared/settings";

interface Props {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

const SiteSettingsForm: React.FC<Props> = ({ settings, onSave }) => {
  const methods = useForm<SiteSettings>({
    //resolver: zodResolver(SiteSettingsSchema),
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
            title="Basic Settings"
            openInitially={true}
          >
            <SiteSettingsBasicInfoForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="Theme Settings"
            openInitially={true}
          >
            <SiteSettingsThemeForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="Social Media Settings"
            openInitially={true}
          >
            <SiteSettingsSocialForm />
          </AnimatedDropdownBox>
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <AnimatedDropdownBox
            className=" gap-lg p-md w-full"
            title="E-Commerce Settings"
            openInitially={true}
          >
            <div className="flex flex-col">
              <SiteSettingsEcommerceForm />
            </div>
          </AnimatedDropdownBox>
          <button className="btn btn-primary mt-lg" type="submit">
            Save Settings
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SiteSettingsForm;
