/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['Dancing Script', 'cursive'],
      },
      screens: {
        xs: '390px', // Extra small screens
        sm: '640px', // Small screens
        md: '768px', // Medium screens
        lg: '900px', // Large screens
        xl: '1546px', // Extra large screens
        '2xl': '1600px', // 2x Extra large screens
      },
    },
  },
  plugins: [],
}