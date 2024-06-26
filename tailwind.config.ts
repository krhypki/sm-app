import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#c4b5fd',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    plugin(function ({ addVariant }) {
      addVariant('hover-focus', ['&:hover', '&:focus']);
    }),
  ],
};
export default config;
