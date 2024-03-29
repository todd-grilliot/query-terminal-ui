/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'mono': ['Space Mono', 'ui-monospace', 'Consolas'],
      // 'mono': [ 'ui-monospace', 'Consolas'],
    },
    extend: {},
  },
  plugins: [],
}
