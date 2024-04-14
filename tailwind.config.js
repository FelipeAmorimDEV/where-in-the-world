/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    dropShadow: {
      '1xl': '0 0 7px 2px rgba(0,0,0,0.2)',
      '3xl': '0 2px 4px 0 rgba(0,0,0,0.5)',
      '4xl': '0 2px 9px 0 rgba(0,0,0,0.5)',
      '5xl': '0 0 7px 2px rgba(0,0,0,0.5)'
    },
    colors: {
      'white': '#FFFFFF',
      'gray-100': '#C4C4C4',
      'gray-400': '#2B3844',
      'gray-600': '#202C36',
      'gray-900': '#111517',
      'red-500': '#ef4444'
    },
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

