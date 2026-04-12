/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        'apple-gray': '#f5f5f7',
        'apple-dark': '#1d1d1f',
        'apple-card': '#1c1c1e',
        'apple-blue': '#2997ff',
      },
      backdropBlur: {
        xs: '2px',
        xl: '20px',
        '2xl': '40px',
        '3xl': '60px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        aurora: 'aurora 10s infinite alternate',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
        bloom: 'bloom 10s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        aurora: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(20px, -20px) scale(1.1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(41, 151, 255, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(41, 151, 255, 0.6)' },
        },
        bloom: {
          '0%, 100%': {
            opacity: '0',
            transform: 'scale(0.6)',
            filter: 'blur(80px)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.4)',
            filter: 'blur(60px)',
          },
        },
      },
    },
  },
};
