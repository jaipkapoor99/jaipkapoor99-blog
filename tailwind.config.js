/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pink-primary': '#FF69B4', // Hot Pink
        'pink-light': '#FFC0CB',   // Light Pink
        'pink-dark': '#C71585',    // Medium Violet Red
        'pink-accent': '#FF1493',  // Deep Pink
      },
    },
  },
  plugins: [],
}
