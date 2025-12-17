
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050508',
        surface: '#0d0d1a',
        brand: {
          blue: '#1d90ff',
          dark: '#0a192f',
        },
        primary: '#1d90ff',
        secondary: '#ffffff',
        accent: '#1d90ff',
      },
      boxShadow: {
        'neon': '0 0 15px rgba(29, 144, 255, 0.4), 0 0 30px rgba(29, 144, 255, 0.2)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
        'glow': '0 0 20px rgba(29, 144, 255, 0.3)'
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
