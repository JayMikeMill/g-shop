import React from "react";
import { useSiteSettings } from "@features/site-settings/useSiteSettings";

const AboutPage: React.FC = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      {siteSettings?.aboutContentHtml && (
        <div className="max-w-3xl mx-auto py-12 px-4 prose prose-lg">
          <div
            dangerouslySetInnerHTML={{ __html: siteSettings.aboutContentHtml }}
          />
        </div>
      )}
    </div>
  );
};

export default AboutPage;
