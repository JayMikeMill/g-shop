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
  setColorShades("primary");
  setColorShades("secondary");
  setColorShades("accent");
  setColorShades("destructive");
}

// Generates and sets CSS variables for color shades
export function setColorShades(cssVarName: string) {
  const root = document.documentElement;

  // get the base color from the CSS variable
  const baseColor = getComputedStyle(root)
    .getPropertyValue(`--${cssVarName}`)
    .trim();

  const shades = twShades(baseColor);

  for (const [key, value] of Object.entries(shades)) {
    root.style.setProperty(`--${cssVarName}-${key}`, value as string);
  }

  // Also store the default primary
  root.style.setProperty(`--${cssVarName}`, baseColor);
}
