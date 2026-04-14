/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EEF2FF",
        primary: "#7C3AED",
        secondary: "#3B82F6",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'purple-gradient': 'linear-gradient(to right, #7C3AED, #3B82F6)',
      }
    },
  },
  plugins: [],
}
