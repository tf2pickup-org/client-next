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
          // abru/light/70%
          200: '#BBB8BC',
          // abru/light/60%
          400: '#A6A0A6',
          // abru/light/25%
          500: '#564D59',
          // abru/light/35%
          550: '#6B666E',
          // abru/light/30%
          600: '#605B62',
          // abru/light/5%
          700: '#272129',
          // abru/dark/3%
          800: '#221D24',
          900: '#19161A',
          // abru/dark/29%
          950: '#131014',
        },

        'abru-dark': {
          // abru/dark/20%
          800: '#161216',

          // abru/dark/25%
          850: '#141115',
          // abru/dark/29%
          900: '#131014',
        },

        accent: {
          // main-accent/dark/25%
          600: '#B80C4D',

          // main-accent/light/25%
          400: '#F84C82',

          // main-accent/light/75%
          200: '#FDCFDE',
        },

        alert: '#FF9E1F',

        'team-blu': 'rgb(88 121 138)',
        'team-red': 'rgb(189 59 59)',
      },
      aspectRatio: {
        '3/1': '3 / 1',
      },
      keyframes: {
        rotate: {
          from: 'rotate(0deg)',
          to: 'rotate(90deg)',
        },
      },
      animation: {
        rotate: 'rotate 500ms linear',
      },
    },
  },
  plugins: [],
};
