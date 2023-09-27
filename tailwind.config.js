const { fontFamily } = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  darkMode: ['class'],
  content: ['./src/**/*.{tsx,css}'],
  theme: {
    colors: {
      ...colors,
      gray: {
        ...colors.gray,
        300: '#F5F5F5',
        400: '#EEEEEE',
        500: '#D9D9D9',
        600: '#BFBFBF',
        700: '#8C8C8C',
        800: '#595959',
        900: '#333333',
        1000: '#262626',
      },
      primary: {
        100: '#F2F8DE', // Selected background color
        200: '#E6F0BC',
        300: '#E0EDA8', // Border
        400: '#D3E58A',
        500: '#C6DE68', // Hover
        600: '#B5D43B', // Normal
        700: '#A9C92C', // Click
        800: '#8DA725',
        900: '#71861D',
        1000: '#556516',
      },
    },
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1360px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
