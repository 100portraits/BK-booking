// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        'primary-red': '#b71c1c', // Primary Red
        'primary-light-red': '#f8d7da', // Light Red Background
        'grey-background': '#f5f5f5', // Light Grey Background
      },
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    require('tailwindcss-animate')
  ]
}
