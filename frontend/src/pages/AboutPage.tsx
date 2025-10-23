import React from "react";
import { useSiteSettings } from "@features/site-settings/useSiteSettings";

const AboutPage: React.FC = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      {siteSettings?.aboutPageContent && (
        <span
          dangerouslySetInnerHTML={{ __html: siteSettings.aboutPageContent }}
        />
      )}
    </div>
  );
};

export default AboutPage;
