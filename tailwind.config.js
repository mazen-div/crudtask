/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JavaScript, TypeScript, and JSX/TSX files in the src folder
    "./public/index.html",        // Include the main HTML file if you are referencing Tailwind classes in it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

