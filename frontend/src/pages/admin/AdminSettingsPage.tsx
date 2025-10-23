import { useEffect, useState, useCallback } from "react";
import { useApi } from "@api";
import { useSiteSettings } from "@features/site-settings/useSiteSettings";

import { CircleSpinner, LoaderBar } from "@components/ui";
import SiteSettingsForm from "@features/admin-dash/settings-editor/site-settings/SiteSettingsForm";
import AdminSettingsForm from "@features/admin-dash/settings-editor/admin-settings/AdminSettingsForm";
import type {
  SiteSettings,
  AdminSettings,
  SystemSettingsScope,
  AnySystemSettings,
} from "shared/settings";

function GenericSettingsPage<T>({
  settingsScope,
  Editor,
  emptySettings,
}: {
  settingsScope: SystemSettingsScope;
  Editor: React.FC<{ settings: T; onSave: (s: T) => void }>;
  emptySettings: T;
}) {
  const { settings } = useApi();
  const { refreshSettings } = useSiteSettings();
  const [currentSettings, setCurrentSettings] = useState<T>(emptySettings);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setIsFetching(true);
    try {
      const retrieved = (await settings.getSettings(settingsScope)) as T;
      setCurrentSettings(retrieved);
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setIsFetching(false);
    }
  }, [settingsScope]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (
    newSettings: T,
    preSaveHook?: (settings: T) => Promise<T>
  ) => {
    console.log("Saving settings:", settingsScope, newSettings);
    setIsSaving(true);
    try {
      if (preSaveHook) {
        newSettings = await preSaveHook(newSettings);
      }
      await settings.updateSettings(
        settingsScope,
        newSettings as AnySystemSettings
      );
      fetchSettings();
      refreshSettings();
    } catch (err) {
      alert("Failed to save settings");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  // Simple loading bar version
  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full w-full shadow-surface border border-border rounded bg-background">
        <LoaderBar />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto relative">
      <Editor settings={currentSettings} onSave={handleSave} />

      {isSaving && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner text="Saving settings..." />
        </div>
      )}
    </div>
  );
}

export function AdminSiteSettingsPage() {
  return (
    <GenericSettingsPage<SiteSettings>
      settingsScope="SITE"
      Editor={SiteSettingsForm}
      emptySettings={{ siteName: "" }}
    />
  );
}

export function AdminAdminSettingsPage() {
  return (
    <GenericSettingsPage<AdminSettings>
      settingsScope="ADMIN"
      Editor={AdminSettingsForm}
      emptySettings={{
        adminEmail: "",
        shippingOrigin: {
          name: "",
          email: "",
          street1: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        },
      }}
    />
  );
}
