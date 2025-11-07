import React from "react";
import { useSiteSettings } from "@features/site-settings/useSiteSettings";

const FAQPage: React.FC = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <div className="max-w-3xl mx-auto py-lg text-center">
      {siteSettings?.FAQContentHtml && (
        <div
          dangerouslySetInnerHTML={{ __html: siteSettings.FAQContentHtml }}
        />
      )}
    </div>
  );
};

export default FAQPage;
