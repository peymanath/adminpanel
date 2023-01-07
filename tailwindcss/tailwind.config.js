/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../**/*.html",
    "../public/js/*.js"
  ],
  theme: {
    fontFamily:{
      sans:["'Vazirmatn'"],
      serif:["'Vazirmatn'"],
      mono:["'Vazirmatn'"],
      display:["'Vazirmatn'"],
      body:["'Vazirmatn'"],
    },
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        gray: '#1F2D3D',
        primary: '#76EE59',
        headerborder: '#C4C4C4',
        input: '#CED4DA',
        'c-red': '#DC3545',
        'c-green': '#28A745',
      }
    },
  },
  plugins: [],
}
