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
import { Button } from "@components/ui";

interface Props {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

const SiteSettingsForm: React.FC<Props> = ({ settings, onSave }) => {
  // settings.backgroundColor = "#F5F6F2"; // soft off-white for main background
  // settings.backgroundAlt = "#E6E8DE"; // subtle light olive for cards/sections
  // settings.foregroundColor = "#2B3A2F";
  // settings.surfaceColor = "#FFFFFF"; // clean white for panels/modals
  // settings.primaryColor = "#4B6330"; // muted military green for primary buttons/links
  // settings.secondaryColor = "#6B8450"; // softer green for secondary buttons/accents
  // settings.borderColor = "#D7D9C9"; // light earthy border
  // settings.accentColor = "#9CBF88"; // lighter army green for highlights/buttons

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
      <form className="flex flex-col gap-sm w-full p-sm sm:p-md sm:flex-row sm:gap-lg">
        <div className="flex flex-col w-full gap-sm sm:w-1/2 sm:gap-md">
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
        <div className="flex flex-col w-full gap-sm sm:w-1/2 sm:gap-md">
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

      {/* Action buttons */}

      <form
        className="sticky flex justify-center bg-transparent bottom-0 h-20 py-md"
        onSubmit={handleSave}
      >
        <Button className="flex h-full w-auto text-xl" type="submit">
          Save Site Settings
        </Button>
      </form>
    </FormProvider>
  );
};

export default SiteSettingsForm;
