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
        fogra: {
          900: '#030811',
          800: '#061123',
          700: '#0A1833',
          600: '#13274E',
          500: '#203A6B',
          400: '#324F85',
          300: '#416098',
          200: '#5777B1',
        },
        jasmine: {
          900: '#171202',
          800: '#382D09',
          700: '#594814',
          600: '#7A6525',
          500: '#9B833A',
          400: '#BDA255',
          300: '#DEC374',
          200: '#FFE498',
        },
        amaranth: {
          600: '#EB1557',
          500: '#EE316B',
          400: '#F04D7F',
          300: '#F36A94',
          200: '#F688AA',
          100: '#F9A6BF',
          50: '#FBC5D5',
        },

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
      keyframes: {
        pulsate: {
          '0%, 100%': { transform: 'scale3d(1, 1, 1)' },
          '50%': { transform: 'scale3d(1.1, 1.1, 1.1)' },
        },
      },
      animation: {
        pulsate: 'pulsate 150ms ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
