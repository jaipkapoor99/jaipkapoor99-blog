/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette for "The Subversive Writer"
        "pink-primary": "#B1125D", // Deep magenta (brand primary)
        "pink-light": "#F7DCE8", // Soft rose for subtle backgrounds
        "pink-dark": "#7A0C40", // Dark wine for contrast
        "pink-accent": "#E03A7D", // Vivid accent for highlights
      },
    },
  },
  plugins: [],
};
