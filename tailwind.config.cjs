/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'messenger-blue': '#1877f2',
        'messenger-blue-hover': '#166fe5',
        'messenger-gray': '#f0f2f5',
        'messenger-text': '#1c1e21',
        'messenger-secondary': '#65676b',
        'messenger-border': '#e4e6ea',
      },
      animation: {
        'slideIn': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

