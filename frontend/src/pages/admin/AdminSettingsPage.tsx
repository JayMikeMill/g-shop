// src/pages/admin/AdminSettingsPages.tsx
import { useEffect, useState } from "react";
import { useApi } from "@api";
import SiteSettingsForm from "@features/admin-dash/settings-editor/site-settings/SiteSettingsForm";
import AdminSettingsForm from "@features/admin-dash/settings-editor/admin-settings/AdminSettingsForm";
import type {
  SiteSettings,
  AdminSettings,
  SystemSettingsScope,
  AnySystemSettings,
} from "@shared/settings";

/**
 * Generic page component for any settings type
 */
function GenericSettingsPage<T>({
  apiKey,
  Editor,
  emptySettings,
}: {
  apiKey: SystemSettingsScope;
  Editor: React.FC<{ settings: T; onSave: (s: T) => void }>;
  emptySettings: T;
}) {
  const { settings } = useApi();
  const [currentSettings, setCurrentSettings] = useState<T>(emptySettings);

  useEffect(() => {
    async function fetchSettings() {
      const retrieved = (await settings.getSettings(apiKey)) as T;
      setCurrentSettings(retrieved);
    }
    fetchSettings();
  }, [apiKey]);

  const handleSave = async (newSettings: T) => {
    await settings.updateSettings(apiKey, newSettings as AnySystemSettings);
    setCurrentSettings(newSettings);
  };

  return (
    <div className="flex-1 overflow-y-auto sm:p-md">
      <Editor settings={currentSettings} onSave={handleSave} />
    </div>
  );
}

export function AdminSiteSettingsPage() {
  return (
    <GenericSettingsPage<SiteSettings>
      apiKey="SITE"
      Editor={SiteSettingsForm}
      emptySettings={{ siteName: "" }}
    />
  );
}

export function AdminAdminSettingsPage() {
  return (
    <GenericSettingsPage<AdminSettings>
      apiKey="ADMIN"
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
