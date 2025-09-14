/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#ff6a5b',
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        londrina: ['"Londrina Solid"', 'cursive'],
      },
    },
  },
  plugins: [],
};
