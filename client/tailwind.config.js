// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // This line is crucial for Tailwind to scan your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}