/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: { fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
      homemade: ['"Homemade Apple"', 'cursive'],
      satisfy: ['Satisfy', 'cursive'],
       playwrite: ['"Playwrite NO"', 'cursive'],


    },
  },
  },
  plugins: [],
}