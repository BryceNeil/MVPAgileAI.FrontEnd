import type { Config } from 'tailwindcss'

const config: Config = {
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
