/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
	darkMode: "class", // enables toggling dark mode via a "dark" class
	theme: {
		extend: {
			colors: {
				// Primary and secondary colors
				primary: "var(--color-primary)",
				primaryDark: "var(--color-primary-dark)",
				secondary: "var(--color-secondary)",
				secondaryDark: "var(--color-secondary-dark)",

				// Backgrounds
				background: "var(--color-background)",
				surface: "var(--color-surface)",

				// Text
				text: "var(--color-text)",
				textSecondary: "var(--color-text-secondary)",
				textMuted: "var(--color-text-muted)",

				// Borders
				border: "var(--color-border)",

				// States
				success: "var(--color-success)",
				warning: "var(--color-warning)",
				error: "var(--color-error)",
				info: "var(--color-info)",

				// Accent colors
				accent: "var(--color-accent)",
			},
			borderRadius: {
				sm: "0.25rem",
				md: "0.5rem",
				lg: "1rem",
				full: "9999px",
			},
			spacing: {
				"2xs": "0.25rem",
				xs: "0.5rem",
				sm: "0.75rem",
				md: "1rem",
				lg: "1.5rem",
				xl: "2rem",
				"2xl": "3rem",
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui"],
				serif: ["Merriweather", "serif"],
				mono: ["Fira Code", "monospace"],
			},
			boxShadow: {
				sm: "0 1px 2px rgba(0,0,0,0.05)",
				md: "0 4px 6px rgba(0,0,0,0.1)",
				lg: "0 10px 15px rgba(0,0,0,0.15)",
				xl: "0 20px 25px rgba(0,0,0,0.2)",
			},
			transitionTimingFunction: {
				DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
			},
			transitionDuration: {
				DEFAULT: "300ms",
			},
		},
	},
  plugins: [],
}

