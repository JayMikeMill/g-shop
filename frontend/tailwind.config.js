/** @type {import('tailwindcss').Config} */
const twShades = require("tw-color-shades");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      colors: {
        /* Base / Background */
        background: "var(--background)",
        foreground: "var(--foreground)",

        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },

        /* Primary & Accent */
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",

          /* Generated using tw-color-shades at runtime */
          10: "var(--primary-10)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",

          /* Generated at runtime */
          10: "var(--secondary-10)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",

          /* Generated at runtime */
          10: "var(--accent-10)",
          50: "var(--accent-50)",
          100: "var(--accent-100)",
          200: "var(--accent-200)",
          300: "var(--accent-300)",
          400: "var(--accent-400)",
          500: "var(--accent-500)",
          600: "var(--accent-600)",
          700: "var(--accent-700)",
          800: "var(--accent-800)",
          900: "var(--accent-900)",
          950: "var(--accent-950)",
        },

        /* Alerts / States */
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",

          /* Generated at runtime */
          10: "var(--destructive-10)",
          50: "var(--destructive-50)",
          100: "var(--destructive-100)",
          200: "var(--destructive-200)",
          300: "var(--destructive-300)",
          400: "var(--destructive-400)",
          500: "var(--destructive-500)",
          600: "var(--destructive-600)",
          700: "var(--destructive-700)",
          800: "var(--destructive-800)",
          900: "var(--destructive-900)",
          950: "var(--destructive-950)",
        },

        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        danger: "var(--color-danger)",
        info: "var(--color-info)",

        /* Borders & Inputs */
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        /* Charts */
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
      },
      borderRadius: {
        DEFAULT: "var(--radius-small)",
        card: "var(--radius-card)",
        small: "var(--radius-small)",
        medium: "var(--radius-medium)",
        large: "var(--radius-large)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        DEFAULT: "var(--box-shadow)",
        small: "var(--box-shadow-small)",
        medium: "var(--box-shadow-medium)",
        large: "var(--box-shadow-large)",
        xlarge: "var(--box-shadow-xlarge)",
        "2xl": "var(--box-shadow-2xl)",
      },
      fontFamily: {
        sans: ["var(--font-family)", "ui-sans-serif", "system-ui"],
      },
      fontSize: {
        base: "var(--font-size-base)",
        title: "var(--font-size-title)",
        price: "var(--font-size-price)",
      },
      transitionDuration: {
        DEFAULT: "var(--trans-dur)",
        fast: "var(--trans-dur-fast)",
        medium: "var(--trans-dur-medium)",
        slow: "var(--trans-dur-slow)",
        xslow: "var(--trans-dur-xslow)",
      },
      transitionTimingFunction: {
        DEFAULT: "var(--trans-func)",
        bounce: "var(--trans-func-bounce)",
        ease: "var(--trans-func-ease)",
        "ease-in": "var(--trans-func-ease-in)",
        "ease-out": "var(--trans-func-ease-out)",
        linear: "var(--trans-func-ease-linear)",
        "ease-in-out": "var(--trans-func-ease-in-out)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
