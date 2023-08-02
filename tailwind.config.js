/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      googleBlue: "#1A0DAB",
      googleGrey: "#4D5156",
      lightGrey: "#DEDEDE",
      lightestGrey: "#F8FAFC",
      green: "#D6F5CD",
      logoColor: "#6E55FF",
    },
    extend: {},
  },
  plugins: [],
};
