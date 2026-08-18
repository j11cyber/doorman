/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      colors: {
        obsidian: '#0A0A0A',
        basalt: '#121212',
        charcoal: '#1A1A1A',
        graphite: '#262626',
        'stone-dark': '#333333',
        limestone: '#F9F9F8',
        alabaster: '#F3F3F1',
        sand: '#EAE6DF',
        champagne: {
          light: '#D8C2A2',
          DEFAULT: '#C5A880',
          dark: '#AC8E67',
        },
        bronze: {
          light: '#A3845B',
          DEFAULT: '#8C6D46',
          dark: '#6F5331',
        },
        brass: {
          light: '#B59969',
          DEFAULT: '#9E8255',
          dark: '#7F673E',
        },
        walnut: '#3D2E24',
      },
      letterSpacing: {
        'arch': '0.15em',
        'widest-arch': '0.25em',
        'ultra-wide': '0.35em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}