/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      colors: {
        design: {
          bg: '#12141E',
          base: '#0A0A0A',
          cyan: '#06B6D4',
          cyanHover: '#0891B2',
          magenta: '#E74694',
          lime: '#D9F99D',
          purple: '#7E3AF2',
          slate: '#64748B',
          white: '#FFFFFF',
          neutral: '#E5E5E5',
          border: 'rgba(100, 116, 139, 0.3)',
          borderHover: 'rgba(100, 116, 139, 0.5)',
          nav: 'rgba(18, 20, 30, 0.85)',
          card: 'rgba(18, 20, 30, 0.6)',
          cardHover: 'rgba(18, 20, 30, 0.8)',
          item: 'rgba(18, 20, 30, 0.7)',
          input: 'rgba(0, 0, 0, 0.3)',
          error: '#E02424',
          ghost: 'rgba(0, 0, 0, 0)',
          ghostHover: 'rgba(100, 116, 139, 0.15)',
        },
      },
      boxShadow: {
        'design-raised': '0 4px 12px rgba(0, 0, 0, 0.2)',
        'design-floating': '0 8px 24px rgba(0, 0, 0, 0.3)',
        'design-glow': '0 0 10px rgba(6, 182, 212, 0.1)',
        'design-glow-magenta': '0 0 10px rgba(231, 70, 148, 0.1)',
        'design-input-focus': '0 0 0 2px rgba(6, 182, 212, 0.1)',
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

