// AdminSettingsPage.tsx
import { Outlet } from "react-router-dom";
import { NavButton } from "@components/ui";

// API
import { useEffect, useState } from "react";
import { useApi } from "@api";

// Editors
import SiteSettingsForm from "@features/admin-dash/settings-editor/site-settings/SiteSettingsForm";
import AdminSettingsForm from "@features/admin-dash/settings-editor/admin-settings/AdminSettingsForm";

// Types
import type {
  SiteSettings,
  AdminSettings,
  SystemSettingsScope,
  AnySystemSettings,
} from "@shared/settings";

/**
 * Wrapper with secondary navigation for settings sections
 */
export default function AdminSettingsPageWrapper() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Secondary Settings Navigation */}
      <nav className="flex justify-center h-12 overflow-x-auto whitespace-nowrap">
        <NavButton
          to="/admin/settings/site"
          label="Site Settings"
          className=" w-1/2 sm:w-60"
        />
        <NavButton
          to="/admin/settings/admin"
          label="Admin Settings"
          className=" w-1/2 sm:w-60"
        />
      </nav>

      {/* Nested settings content */}
      <div className="flex-grow overflow-y-auto p-2 max-w-6xl mx-auto w-full">
        <Outlet />
      </div>
    </div>
  );
}

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

  return <Editor settings={currentSettings} onSave={handleSave} />;
}

/**
 * Individual pages for each settings section
 */
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
