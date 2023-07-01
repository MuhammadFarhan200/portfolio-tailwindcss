/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        'primary': {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2', 
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        'dark': '#0f172a',
        'secondary': '#475569',
        'aliceblue': {
          50: '#f7f9fc',
          100: '#eaf0f6',
          200: '#d3dce7',
          300: '#b6c1d1',
          400: '#9da9c0',
          500: '#8291af',
          600: '#687a9e',
          700: '#52648a',
          800: '#3e4b6f',
          900: '#323e5a',
          950: '#1f2940',
        },
      },
      screens: {
        '2xl': '1320px', 
      },
    },
  },
  plugins: [],
}

