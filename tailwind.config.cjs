const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: 'rgb(10 26 51)',
        'on-primary': 'rgb(255 255 255)',
        surface: 'rgb(255 255 255 / 90%)',
        'on-surface': 'rgb(10 26 51)',

        'queue-state-waiting': 'rgb(255 255 255 / 70%)',
        'queue-slot-free': 'rgb(255 255 255 / 65%)',
        'queue-slot-taken': 'rgb(255 255 255 / 95%)',
      },
    },
  },
  plugins: [],
};
