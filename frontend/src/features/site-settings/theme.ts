// frontend/src/theme.ts
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
