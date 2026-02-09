import type { Config } from 'tailwindcss';

/**
 * SYLA Network Design System
 * 
 * This design system follows a compact, professional layout:
 * 
 * SIDEBAR:
 * - Open width: 224px (w-sidebar-open / w-56)
 * - Closed width: 64px (w-sidebar-closed / w-16)
 * - Header height: 56px (h-sidebar-header / h-14)
 * 
 * HEADER:
 * - Height: 56px (h-header / h-14)
 * - Compact padding: px-3 sm:px-4 lg:px-6
 * 
 * TYPOGRAPHY:
 * - Navigation items: text-xs (12px)
 * - Labels/Badges: text-2xs (10px)
 * - Micro text: text-3xs (8px)
 * 
 * ICONS:
 * - Small: w-3.5 h-3.5 (14px) - Subnavigation, badges
 * - Medium: w-4 h-4 (16px) - Main navigation, header buttons
 * - Large: w-5 h-5 (20px) - Important actions
 * 
 * SPACING:
 * - Compact padding: px-2 py-2 (navigation items)
 * - Standard padding: px-3 py-2 (buttons, inputs)
 * - Gaps: gap-1.5 (2px), gap-2 (8px), gap-3 (12px)
 */

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
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
  		fontFamily: {
  			sans: [
  				'var(--font-montserrat)',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			// Design System: Compact Text Sizes
  			'xs': ['0.75rem', { lineHeight: '1rem' }], // 12px - Standard small text
  			'2xs': ['0.625rem', { lineHeight: '0.875rem' }], // 10px - Labels, badges, micro text
  			'3xs': ['0.5rem', { lineHeight: '0.75rem' }], // 8px - Tiny labels
  		},
  		spacing: {
  			// Design System: Compact Spacing Scale
  			'sidebar-open': '14rem', // 224px - Open sidebar width
  			'sidebar-closed': '4rem', // 64px - Closed sidebar width
  			'header-height': '3.5rem', // 56px - Header height
  			'sidebar-header': '3.5rem', // 56px - Sidebar header height
  			'nav-item': '0.5rem', // 8px - Navigation item padding
  			'nav-gap': '0.5rem', // 8px - Navigation item gap
  		},
  		width: {
  			// Design System: Component Widths
  			'sidebar-open': '14rem', // 224px
  			'sidebar-closed': '4rem', // 64px
  		},
  		height: {
  			// Design System: Component Heights
  			'header': '3.5rem', // 56px
  			'sidebar-header': '3.5rem', // 56px
  		},
  		size: {
  			// Design System: Icon Sizes
  			'icon-sm': '0.875rem', // 14px - Small icons (w-3.5 h-3.5)
  			'icon-md': '1rem', // 16px - Medium icons (w-4 h-4)
  			'icon-lg': '1.25rem', // 20px - Large icons (w-5 h-5)
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// Design System: Custom Utilities
  		screens: {
  			// Keep existing breakpoints
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
