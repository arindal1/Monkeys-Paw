module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '080808',
        'dark-text': '#e0e0e0',
        'accent-red': '#ff4d4d',
        'accent-blue': '#007acc',
      },
      fontFamily: {
        'creepy': ['"Creepster"', 'cursive'],
      },
    },
  },
  plugins: [],
};
