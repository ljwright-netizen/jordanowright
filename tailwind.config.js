/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark': '#090909',
        'primary': '#e9efff',
        'muted': '#494e5b',
        'accent': '#3f9f53',
      },
      fontFamily: {
        haas: ['"neue-haas-unica"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        eco: ['"eco"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

