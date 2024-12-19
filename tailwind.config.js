/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        'custom-2rem': '2rem',
      },
      backgroundColor: {
        teal: '#81b29a',
        darkBlue: '#264653',
        wc1: '#999',
        wc2: '#666',
        deepNavy: '#1a1a2e',
      },
    },
  },
  plugins: [],
};
