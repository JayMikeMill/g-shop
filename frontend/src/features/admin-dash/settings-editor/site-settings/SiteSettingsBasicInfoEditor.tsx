import React from "react";
import { Input, Textarea, Label } from "@components/ui";
import type { SiteSettings } from "@shared/settings";

interface Props {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const SiteSettingsBasicInfoEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => (
  <div className="flex flex-col gap-md">
    <Label>
      Site Name
      <Input
        value={settings.siteName}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, siteName: e.target.value }))
        }
        required
      />
    </Label>

    <Label>
      Site Description
      <Textarea
        value={settings.siteDescription || ""}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, siteDescription: e.target.value }))
        }
      />
    </Label>

    <Label>
      Site Tagline
      <Input
        value={settings.siteTagline || ""}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, siteTagline: e.target.value }))
        }
      />
    </Label>

    <Label>
      Banner URL
      <Input
        value={settings.bannerURL || ""}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, bannerURL: e.target.value }))
        }
      />
    </Label>

    <Label>
      Banner Message
      <Input
        value={settings.bannerMessage || ""}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, bannerMessage: e.target.value }))
        }
      />
    </Label>

    <Label>
      Logo URL
      <Input
        value={settings.logoURL || ""}
        onChange={(e) =>
          setSettings((prev) => ({ ...prev, logoURL: e.target.value }))
        }
      />
    </Label>
  </div>
);

export default SiteSettingsBasicInfoEditor;
