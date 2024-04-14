/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
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

