/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-heading)', 'serif'],
        accent: ['var(--font-accent)', 'serif'],
      },
    },
  },
  plugins: [],
};
