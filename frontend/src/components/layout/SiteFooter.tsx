import React from "react";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@features/site-settings/useSiteSettings";

const SiteFooter: React.FC = () => {
  const navigate = useNavigate();
  const { siteSettings } = useSiteSettings();
  return (
    <footer className="bg-surface text-text font-sans py-8">
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col sm:flex-row justify-between gap-8 flex-wrap">
        {/* Logo / Info */}
        <div className="flex-1 min-w-[250px] mb-6 sm:mb-0">
          <h2 className="text-title font-bold mb-4">
            {siteSettings?.siteName}
          </h2>
          <p className="text-secondary">{siteSettings?.siteTagline}</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[250px] mb-6 sm:mb-0">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => navigate("/")}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-primary transition-colors"
              >
                About
              </button>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex-1 min-w-[250px]">
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:text-primary transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-secondary text-center text-muted text-sm">
        &copy; {new Date().getFullYear()} {siteSettings?.siteName} | All Rights
        Reserved
      </div>
    </footer>
  );
};

export default SiteFooter;
