/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Brand tokens come from src/theme/colors.js (also used by components).
      colors: require('./src/theme/colors'),
      // Inter weights loaded with useFonts in App.js. Each weight is its own
      // font file on Android, so we pick the family instead of fontWeight.
      fontFamily: {
        inter: ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
      },
    },
  },
  plugins: [],
};
