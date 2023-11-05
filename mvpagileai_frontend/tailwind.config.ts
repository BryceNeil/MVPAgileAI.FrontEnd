import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        darkestgray: '#111111',
        darkgray: '#222222',
        semidarkgray: '#2F2F2F',
        medgray: '#4C4C4C',
        icongray: '#898989',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.resize-x-expand': {
          'resize': 'horizontal',
          'right': '0',
          'top': '0',
          'bottom': '0'
        },
        '.resize-y-expand': {
          'resize': 'vertical',
          'bottom': '0',
          'left': '0',
          'right': '0'
        },
      }, ['responsive', 'hover'])
    }
  ],
}

export default config;
