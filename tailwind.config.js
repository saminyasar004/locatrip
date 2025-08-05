/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },

      colors: {
        primary: '#F86241',
        accent: '#f8dcd7',
        foreground: '#0F0F0F',
        background: '#FBFEFE',
        'dark-gray': '#6A707C',
      },
    },
  },
  plugins: [],
};
