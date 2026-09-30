/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: {
          950: '#0C0907',
          900: '#120E0B', // Primary Deep Velvet Dark
          850: '#18130E', // Surface Layer 1 (Header/Cards)
          800: '#201913', // Surface Layer 2 (Elevated)
          750: '#282019', // Card hover / Borders
          700: '#342A22',
          600: '#4D3F33',
          500: '#756353',
          400: '#A38E7D',
          300: '#C7B6A6',
          200: '#E4D8CC',
          100: '#F2ECE4',
          50: '#FAF7F3',
        },
        amber: {
          300: '#F8D8A8',
          400: '#F3C082',
          500: '#E5A967', // Signature Golden Caramel
          600: '#D48B46', // Warm Amber
          700: '#B66F2C',
          800: '#94541B',
        },
        cream: {
          50: '#FFFDF9',
          100: '#F9F4EB', // Warm Ivory Text
          200: '#F0E6D4',
          300: '#E2D1B8',
          400: '#CFBA9A',
        },
        copper: {
          400: '#DF8467',
          500: '#C86D51',
          600: '#AA5237',
        },
        forest: {
          500: '#3D523C',
          600: '#2D3E2C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card': '0 8px 24px -4px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(229, 169, 103, 0.1)',
        'elevated': '0 16px 36px -6px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(229, 169, 103, 0.18)',
        'luxury': '0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 35px -5px rgba(229, 169, 103, 0.2)',
        'glow': '0 0 25px -4px rgba(229, 169, 103, 0.35)',
        'glow-sm': '0 0 15px -3px rgba(229, 169, 103, 0.25)',
      },
      backgroundImage: {
        'amber-gradient': 'linear-gradient(135deg, #F3C082 0%, #D48B46 100%)',
        'dark-gradient': 'linear-gradient(180deg, #18130E 0%, #120E0B 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(229, 169, 103, 0.15) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
