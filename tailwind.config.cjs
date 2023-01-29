const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
        caption: ['Staatliches'],
      },
      colors: {
        primary: 'rgb(10 26 51)',
        'on-primary': 'rgb(255 255 255)',
        surface: 'rgb(255 255 255 / 90%)',
        'on-surface': 'rgb(10 26 51)',

        'button-primary': 'rgb(235, 21, 87)',
        'button-dot': 'rgb(255, 228, 151)',

        'queue-state-waiting': 'rgb(255 255 255)',
        'queue-slot-free': 'rgb(255 255 255 / 65%)',
        'queue-slot-taken': 'rgb(255 255 255 / 95%)',

        'team-blu': 'rgb(88 121 138)',
        'team-red': 'rgb(189 59 59)',
      },
      container: {
        screens: {
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1320px',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
