/** @type {import('tailwindcss').Config} */


module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  content: [],
  theme: {
    extend: {
      colors: {
      'darkYellow': '#FCBA04',
      'darkRed': '#A4000D',
      'lightBlack': '#272822',
      'greyOutline': '#F0F0F0',
      'white': '#FFFFFF'
      }
    },
    fontFamily: {
      fredoka: ['Fredoka', 'sans-serif'],
      pressstart: ['"Press Start 2P"', 'cursive'],
      monospace: ['monospace']
		},
  },
  plugins: [],
}
