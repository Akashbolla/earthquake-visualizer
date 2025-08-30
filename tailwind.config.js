/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        quake: {
          50: '#fff8f3',
          100: '#ffefdf',
          200: '#ffd6b3',
          500: '#ff8c00',
          700: '#b22222'
        }
      }
    }
  },
  plugins: [],
};

