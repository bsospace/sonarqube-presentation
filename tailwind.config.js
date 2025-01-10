/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkGradient: {
          light: "#FF7EB3",
          dark: "#FF758C",
        },
      },
    },
  },
  plugins: [],
};
