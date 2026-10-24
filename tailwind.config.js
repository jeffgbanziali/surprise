/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bordeaux: "#6d1230", nuit: "#10030a", blush: "#f6cbd5", ivoire: "#fbf3e4", or: "#dcb76d", rose: "#e8456f" },
    fontFamily: { script: ['"Great Vibes"', "cursive"], serif: ['"Cormorant Garamond"', "Georgia", "serif"] }
  } },
  plugins: []
};
