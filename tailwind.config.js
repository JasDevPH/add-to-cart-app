/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.js', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // ShopCart brand tokens: mono palette + one emerald accent.
      colors: {
        ink: '#111111',
        muted: '#6B7280',
        line: '#E7E5E4',
        canvas: '#FAFAF9',
        tile: '#F2F2F0',
        accent: '#059669',
      },
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
