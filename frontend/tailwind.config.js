/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        idrx: {
          brand: {
            primary: '#0F56E6',
            hover: '#0A3DB8',
            active: '#062E8C',
            ghostHover: 'rgba(15, 86, 230, 0.08)',
            ghostActive: 'rgba(15, 86, 230, 0.16)',
          },
          text: {
            primary: '#333333',
            secondary: '#6D6D6D',
            tertiary: '#8D8D8D',
            muted: '#B1B1B1',
            deep: '#2D2D2D',
          },
          surface: {
            white: '#FFFFFF',
            50: '#FAFAFA',
            100: '#F9F9F9',
            200: '#F5F5F5',
            300: '#ECECEC',
            400: '#E0E0E0',
          },
          border: {
            light: '#D9D9D9',
            medium: '#C5C5C5',
            soft: '#E8E8E8',
          },
        },
      },
      boxShadow: {
        'idrx-base': '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        'idrx-elevated': '0px 4px 12px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
        'idrx-high': '0px 8px 20px rgba(0, 0, 0, 0.15), 0px 4px 8px rgba(0, 0, 0, 0.1)',
        'idrx-max': '0px 12px 32px rgba(0, 0, 0, 0.18), 0px 6px 12px rgba(0, 0, 0, 0.12)',
        'idrx-focus': '0px 0px 0px 3px rgba(15, 86, 230, 0.1)',
      },
      animation: {
        'fade-up': 'fadeInUp 0.3s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

