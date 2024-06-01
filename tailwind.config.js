/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "manrope": "'Manrope', sans-serif"
      },
      colors: {
        "primary_color": "#775954",
        // "primary_bg_color": "#C9BB9F",
        // "primary_card_color": "#f8f8f8",
      }
    },
  },
  plugins: [require('daisyui')],
}

