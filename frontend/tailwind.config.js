/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", "class"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			primaryDark: 'var(--color-primary-dark)',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			secondaryDark: 'var(--color-secondary-dark)',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			backgroundAlt: 'var(--color-background-alt)',
  			surface: 'var(--color-surface)',
  			surfaceAlt: 'var(--color-surface-alt)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			text: 'var(--color-text)',
  			textSecondary: 'var(--color-text-secondary)',
  			textMuted: 'var(--color-text-muted)',
  			textInverted: 'var(--color-text-inverted)',
  			border: 'hsl(var(--border))',
  			divider: 'var(--color-divider)',
  			inputBorder: 'var(--color-input-border)',
  			buttonBg: 'var(--color-button-bg)',
  			buttonHover: 'var(--color-button-hover)',
  			buttonText: 'var(--color-button-text)',
  			success: 'var(--color-success)',
  			warning: 'var(--color-warning)',
  			error: 'var(--color-error)',
  			danger: 'var(--color-danger)',
  			info: 'var(--color-info)',
  			light: 'var(--color-light)',
  			dark: 'var(--color-dark)',
  			foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		spacing: {
  			xs: 'var(--spacing-xs)',
  			sm: 'var(--spacing-sm)',
  			md: 'var(--spacing-md)',
  			lg: 'var(--spacing-lg)',
  			xl: 'var(--spacing-xl)',
  			'2xl': '3rem',
  			'3xl': '4rem'
  		},
  		borderRadius: {
  			DEFAULT: 'var(--border-radius)',
  			card: 'var(--card-border-radius)',
  			full: '9999px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-family)',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			display: [
  				'Poppins',
  				'ui-sans-serif'
  			],
  			serif: [
  				'Merriweather',
  				'serif'
  			],
  			mono: [
  				'Fira Code',
  				'monospace'
  			]
  		},
  		fontSize: {
  			base: 'var(--font-size-base)',
  			title: 'var(--font-size-title)',
  			price: 'var(--font-size-price)'
  		},
  		boxShadow: {
  			card: 'var(--box-shadow)',
  			sm: '0 1px 2px rgba(0,0,0,0.05)',
  			md: '0 4px 6px rgba(0,0,0,0.1)',
  			lg: '0 10px 15px rgba(0,0,0,0.15)',
  			xl: '0 20px 25px rgba(0,0,0,0.2)',
  			'2xl': '0 25px 50px rgba(0,0,0,0.25)'
  		},
  		transitionDuration: {
  			DEFAULT: '300ms',
  			fast: '150ms',
  			slow: '500ms'
  		},
  		transitionTimingFunction: {
  			DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  			bounce: 'cubic-bezier(.68,-0.55,.27,1.55)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
