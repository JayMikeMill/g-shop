// frontend/src/theme.ts
import twShades from "tw-color-shades";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  destructive: string;
}

/**
 * Apply the given theme colors dynamically.
 * Generates shades for each color and sets CSS variables on :root
 */
export function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;

  // Iterate over all colors
  for (const [colorName, value] of Object.entries(colors)) {
    // Set the base color
    root.style.setProperty(`--${colorName}`, value);

    // Generate shades using tw-color-shades
    const shades = twShades(value);
    for (const [key, shade] of Object.entries(shades)) {
      root.style.setProperty(`--${colorName}-${key}`, shade as string);
    }
  }
}
