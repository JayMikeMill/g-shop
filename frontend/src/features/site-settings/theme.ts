// frontend/src/theme.ts
import type { SiteSettings } from "shared/settings";
import twShades from "tw-color-shades";

/**
 * Apply the given theme colors dynamically.
 * Generates shades for each color and sets CSS variables on :root
 */
export function applyThemeColors(
  colors: Record<string, string>,
  genShades?: Record<string, boolean>
) {
  const root = document.documentElement;

  // Iterate over all colors
  for (const [colorName, value] of Object.entries(colors)) {
    // Set the base color
    root.style.setProperty(`--${colorName}`, value);

    if (genShades && colorName in genShades) {
      // Generate shades using tw-color-shades
      const shades = twShades(value);
      for (const [key, shade] of Object.entries(shades)) {
        root.style.setProperty(`--${colorName}-${key}`, shade as string);
      }
    }
  }
}

export function applySettingsTheme(settings: SiteSettings) {
  // apply default theme colors
  applyThemeColors(
    {
      background: settings?.backgroundColor || "#ffffff",
      backgroundAlt: settings?.backgroundAltColor || "#f0f0f0",
      foreground: settings?.foregroundColor || "#f5f5f5",
      foregroundAlt: settings?.foregroundAltColor || "#333333",
      surface: settings?.surfaceColor || "#ffffff",
      surfaceAlt: settings?.surfaceAltColor || "#f5f5f5",
      primary: settings?.primaryColor || "#59c2ff",
      secondary: settings?.secondaryColor || "#6D28D9",
      border: settings?.borderColor || "#e0e0e0",
      accent: settings?.accentColor || "#10B981",
      destructive: "#EF4444",
    },
    {
      primary: true,
      secondary: true,
      accent: true,
      destructive: true,
    }
  );
}
