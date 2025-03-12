// tailwind.config.js
const theme = require('./styles/theme');

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        shark: theme.colors.shark,
        lochinvar: theme.colors.lochinvar,
        verdes: theme.colors.verdes,
        grises: theme.colors.grises,
        blancos: theme.colors.blancos,
        semaforo: theme.colors.semaforo,
      },
      fontFamily: {
        heading: [ 'Montserrat', 'sans-serif' ],
        body: [ 'Roboto', 'sans-serif' ],
      },
      fontSize: {
        h1: theme.fontSizes.h1,
        h2: theme.fontSizes.h2,
        h3: theme.fontSizes.h3,
        body: theme.fontSizes.body,
        small: theme.fontSizes.small,
      },
      fontOpticalSizing: {
        'auto': 'auto',
      },
    },
  },
  plugins: [],
}
