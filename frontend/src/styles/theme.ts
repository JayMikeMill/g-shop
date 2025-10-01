// frontend/src/theme.ts

// Manages theme application and dynamic color shades
import twShades from "tw-color-shades";

// Applies the selected theme by updating CSS classes and variables
export const applyTheme = (theme: "light" | "dark" | "pastel") => {
  const root = document.documentElement;
  root.classList.remove("dark", "theme-pastel");

  if (theme === "dark") root.classList.add("dark");
  if (theme === "pastel") root.classList.add("theme-pastel");

  root.style.setProperty("--theme", theme);

  refreshTheme();
};

// Refreshes the theme by recalculating color shades
export function refreshTheme() {
  const root = document.documentElement;

  const originalPrimary = getComputedStyle(root)
    .getPropertyValue("--primary")
    .trim();
  const originalSecondary = getComputedStyle(root)
    .getPropertyValue("--secondary")
    .trim();
  const originalAccent = getComputedStyle(root)
    .getPropertyValue("--accent")
    .trim();

  setColorShades("primary", originalPrimary);
  setColorShades("secondary", originalSecondary);
  setColorShades("accent", originalAccent);
}

// Generates and sets CSS variables for color shades
export function setColorShades(varName: string, baseColor: string) {
  const root = document.documentElement;

  const shades = twShades(baseColor);
  console.log(`Setting shades for --${varName}:`, shades);

  for (const [key, value] of Object.entries(shades)) {
    root.style.setProperty(`--${varName}-${key}`, value as string);
  }

  // Also store the default primary
  root.style.setProperty(`--${varName}`, baseColor);
}
