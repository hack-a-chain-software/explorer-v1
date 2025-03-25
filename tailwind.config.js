/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter', ...defaultTheme.fontFamily.sans
        ],
        title: [
          'Roboto', ...defaultTheme.fontFamily.sans
        ]
      },
      fontSize: {
        'xs': ['0.75rem', '140%'],
        'sm': ['0.875rem', '140%'],
        'base': ['1rem', '140%'],
        'lg': ['1.125rem', '140%'],
        'xl': ['1.25rem', '140%'],
        '2xl': ['1.5rem', '140%'],
      },
      colors: {
        system: {
          green: {
            DEFAULT: '#38A169',
          },

          red: {
            DEFAULT: '#C6454B',
          },

        },

        kadscan: {
          400: '#66F9CD',
          500: '#00F5AB',
          600: '#00C489',
          700: '#009367',
        },

        font: {
          400: '#FFFFFF',
          450: '#B3B3B3',
          500: '#939393',
        },


        gray: {
          900: '#010101',
          800: '#1A1C1D',
          700: '#292B2C',
          600: '#343636',
          500: '#3E4041',
          400: '#484A4B',
          300: '#525454',
          200: '#555757',
          100: '#5E6060',
        },
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      bazk: '1352px',
    },
  },
}

