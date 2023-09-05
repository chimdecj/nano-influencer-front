import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  corePlugins: {
    preflight: false,
  },
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      ...colors,
      primary: {
        100: "#F2F8DE", // Selected background color
        200: "#E6F0BC",
        300: "#E0EDA8", // Border
        400: "#D3E58A",
        500: "#C6DE68", // Hover
        600: "#B5D43B", // Normal
        700: "#A9C92C", // Click
        800: "#8DA725",
        900: "#71861D",
        1000: "#556516",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
