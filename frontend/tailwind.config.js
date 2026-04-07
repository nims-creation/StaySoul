/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E25E3E', // Dark Terracotta
          hover: '#c44a2e'
        },
        dark: '#111111', // Deep charcoal / black
        lightGray: '#E5E7EB', // Subtle borders
        grayBg: '#F3F4F6'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

