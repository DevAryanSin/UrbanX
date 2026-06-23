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
          50: '#d4d9e0',
          100: '#b0b8c9',
          200: '#8891a5',
          300: '#5a6378',
          400: '#363d49',
          500: '#252a33',
          600: '#1a1e25',
          700: '#14171c',
          800: '#0e1014',
          900: '#0a0b0d',
          950: '#060709',
        },
        surface: {
          50: '#14171c',
          100: '#1a1e25',
          200: '#252a33',
          300: '#363d49',
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
        critical: '#ef4444',
        warning: '#f59e0b',
        success: '#22c55e',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)',
        elevated: '0 4px 16px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)',
        glow: '0 0 0 4px rgba(39,176,108,0.15)',
        'glow-green': '0 0 20px rgba(39,176,108,0.15), 0 0 60px rgba(39,176,108,0.05)',
        'glow-orange': '0 0 20px rgba(249,115,22,0.15), 0 0 60px rgba(249,115,22,0.05)',
        'glow-red': '0 0 20px rgba(239,68,68,0.15), 0 0 60px rgba(239,68,68,0.05)',
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
