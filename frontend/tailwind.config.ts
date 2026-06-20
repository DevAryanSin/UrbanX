import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f8',
          100: '#eceef1',
          200: '#d4d9df',
          300: '#aeb6c2',
          400: '#7d8798',
          500: '#5d6778',
          600: '#495160',
          700: '#3b424f',
          800: '#323742',
          900: '#1a1d24',
          950: '#0e1014',
        },
        brand: {
          50: '#eef9f4',
          100: '#d6f1e3',
          200: '#a9e3c5',
          300: '#7ad4a6',
          400: '#4cc587',
          500: '#27b06c',
          600: '#1d8c55',
          700: '#1a6e45',
          800: '#185739',
          900: '#154830',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        critical: '#dc2626',
        warning: '#f59e0b',
        success: '#16a34a',
        info: '#2563eb',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,23,42,0.06), 0 1px 3px rgba(15,23,42,0.08)',
        elevated: '0 4px 12px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.06)',
        glow: '0 0 0 4px rgba(39,176,108,0.15)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
