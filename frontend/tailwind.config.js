/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core palette
        primary: "var(--color-primary)",
        primaryDark: "var(--color-primary-dark)",
        secondary: "var(--color-secondary)",
        secondaryDark: "var(--color-secondary-dark)",
        accent: "var(--color-accent)",

        // Backgrounds
        background: "var(--color-background)",
        backgroundAlt: "var(--color-background-alt)",
        surface: "var(--color-surface)",
        surfaceAlt: "var(--color-surface-alt)",
        card: "var(--color-card-bg)",

        // Text
        text: "var(--color-text)",
        textSecondary: "var(--color-text-secondary)",
        textMuted: "var(--color-text-muted)",
        textInverted: "var(--color-text-inverted)",

        // Borders & dividers
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        inputBorder: "var(--color-input-border)",

        // Buttons
        buttonBg: "var(--color-button-bg)",
        buttonHover: "var(--color-button-hover)",
        buttonText: "var(--color-button-text)",

        // States
        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",

        // Old helpers
        light: "var(--color-light)",
        dark: "var(--color-dark)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "3rem",
        "3xl": "4rem",
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        card: "var(--card-border-radius)",
        full: "9999px",
      },
      fontFamily: {
        sans: ["var(--font-family)", "ui-sans-serif", "system-ui"],
        display: ["Poppins", "ui-sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      fontSize: {
        base: "var(--font-size-base)",
        title: "var(--font-size-title)",
        price: "var(--font-size-price)",
      },
      boxShadow: {
        card: "var(--box-shadow)",
        sm: "0 1px 2px rgba(0,0,0,0.05)",
        md: "0 4px 6px rgba(0,0,0,0.1)",
        lg: "0 10px 15px rgba(0,0,0,0.15)",
        xl: "0 20px 25px rgba(0,0,0,0.2)",
        "2xl": "0 25px 50px rgba(0,0,0,0.25)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
        fast: "150ms",
        slow: "500ms",
      },
      transitionTimingFunction: {
        DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
        bounce: "cubic-bezier(.68,-0.55,.27,1.55)",
      },
    },
  },
  plugins: [],
};
