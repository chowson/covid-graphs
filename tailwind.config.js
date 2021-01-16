const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    color: {
      blue: colors.lightBlue,
      gray: colors.gray,
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      cyan: colors.cyan
    }),
    textColor: theme => ({
      ...theme('colors'),
      primary: '#444',
    }),
    container: {
      padding: {
        DEFAULT: '0.5rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '4rem',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
