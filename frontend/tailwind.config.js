/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}"
	],
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

				// Text
				text: "var(--color-text)",
				textSecondary: "var(--color-text-secondary)",
				textMuted: "var(--color-text-muted)",
				textInverted: "var(--color-text-inverted)",

				// Borders & dividers
				border: "var(--color-border)",
				divider: "var(--color-divider)",

				// States
				success: "var(--color-success)",
				warning: "var(--color-warning)",
				error: "var(--color-error)",
				info: "var(--color-info)",
			},
			borderRadius: {
				none: "0",
				sm: "0.25rem",
				md: "0.5rem",
				lg: "1rem",
				xl: "1.5rem",
				full: "9999px",
			},
			spacing: {
				"2xs": "0.125rem", // 2px
				xs: "0.25rem",     // 4px
				sm: "0.5rem",      // 8px
				md: "0.75rem",     // 12px
				lg: "1rem",        // 16px
				xl: "1.5rem",      // 24px
				"2xl": "2rem",     // 32px
				"3xl": "3rem",     // 48px
				"4xl": "4rem",     // 64px
			},
			fontFamily: {
				sans: ["Inter", "ui-sans-serif", "system-ui"],
				serif: ["Merriweather", "serif"],
				mono: ["Fira Code", "monospace"],
				display: ["Poppins", "ui-sans-serif"],
			},
			boxShadow: {
				none: "none",
				sm: "0 1px 2px rgba(0,0,0,0.05)",
				md: "0 4px 6px rgba(0,0,0,0.1)",
				lg: "0 10px 15px rgba(0,0,0,0.15)",
				xl: "0 20px 25px rgba(0,0,0,0.2)",
				"2xl": "0 25px 50px rgba(0,0,0,0.25)",
			},
			transitionTimingFunction: {
				DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)",
				"bounce": "cubic-bezier(.68,-0.55,.27,1.55)",
			},
			transitionDuration: {
				DEFAULT: "300ms",
				fast: "150ms",
				slow: "500ms",
			},
		},
	},
	plugins: [],
};
