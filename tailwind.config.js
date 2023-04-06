// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        abru: {
          // abru/light/75%
          100: '#C7C4C7',
          // abru/light/60%
          400: '#A6A0A6',
          500: '#564D59',
          600: '#605B62',
          // abru/dark/3%
          900: '#221D24',
          950: '#19161A',
        },

        'team-blu': 'rgb(88 121 138)',
        'team-red': 'rgb(189 59 59)',
      },
      aspectRatio: {
        '3/1': '3 / 1',
      },
    },
  },
  plugins: [],
};
