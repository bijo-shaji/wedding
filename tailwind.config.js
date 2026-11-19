/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FAF4E9',
          200: '#F4E8D3',
          300: '#EBD8B8',
          400: '#DFC499',
          500: '#CCA774',
        },
        burgundy: {
          50: '#FAF0F2',
          100: '#F5DBE0',
          200: '#EAB7C1',
          300: '#D58696',
          400: '#B64A62',
          500: '#9B2039',
          600: '#7C1024',
          700: '#640D1D',
          800: '#4D0A16',
          900: '#34050E',
        },
        gold: {
          50: '#FBF8F1',
          100: '#F7EEDC',
          200: '#EED9B2',
          300: '#E4C488',
          400: '#D7AB63',
          500: '#C59546',
          600: '#A6772E',
          700: '#7D571E',
          800: '#5A3D14',
        },
        blush: {
          50: '#FDF8F8',
          100: '#F9EDED',
          200: '#F3D9D8',
          300: '#EAC0BD',
          400: '#DC9D99',
          500: '#CA7570',
        },
        sage: {
          50: '#F6F7F5',
          100: '#ECEFEA',
          200: '#D9DFD5',
          300: '#BAC5B3',
          400: '#8E9E82',
          500: '#59654C',
          600: '#47513C',
          700: '#353D2D',
        },
      },
      fontFamily: {
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(215, 171, 99, 0.25)',
        'gold-subtle': '0 4px 20px -2px rgba(215, 171, 99, 0.15)',
        'card-lux': '0 10px 40px -10px rgba(124, 16, 36, 0.08), 0 2px 10px -2px rgba(0, 0, 0, 0.04)',
        'envelope': '0 20px 50px -10px rgba(60, 20, 25, 0.25), 0 10px 20px -5px rgba(0,0,0,0.1)',
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
      },
    },
  },
  plugins: [],
}
