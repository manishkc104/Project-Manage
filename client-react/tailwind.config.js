/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      minWidth: {
        'modal': '40rem',
      },
    },
  },
  plugins: [],
}

