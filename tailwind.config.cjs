/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        "montserrat" : 'Montserrat'
      },
      colors: {
        "primary" : "#fffffe",
        "secondary" : "#90b4ce",
        "info" : "#3da9fc",
        "danger" : "#ef4565",
        "header" : "#094067",
        "paragraph" : "#5f6c7b",        
      }
    },
  },
  plugins: [],
}
