// frontend/src/theme.ts
export const applyTheme = (theme: "light" | "dark" | "pastel") => {
  const root = document.documentElement;
  root.classList.remove("dark", "theme-pastel");

  if (theme === "dark") root.classList.add("dark");
  if (theme === "pastel") root.classList.add("theme-pastel");
};
