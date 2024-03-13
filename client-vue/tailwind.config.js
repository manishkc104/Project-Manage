/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minWidth: {
        'modal': '40rem',
      },
      backgroundColor: {
        'mainDiv': '#f0f0f0',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

