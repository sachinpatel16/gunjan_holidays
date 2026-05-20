/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};
