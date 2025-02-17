import { nextui } from '@nextui-org/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(accordion|divider).js',
  ],
  theme: {
    extend: {
      colors: {
        colorone: '#2C4A7B',
      },
      borderWidth: {
        b1: '1px',
      },
      backgroundColor: {
        question: '#ECEBFD',
        nav: '#253145',
      },
      backgroundImage: {
        'custom-gradient1': 'linear-gradient(to bottom, #2f4159, #253145)',
        'custom-gradient2': 'linear-gradient(to top, #2f4159, #253145)',
        'homepage-blue':
          'radial-gradient(circle, rgba(91, 143, 208, 0.3), rgba(33, 55, 87, 0.1)), /* Background de base */' +
          'radial-gradient(circle at center, rgba(91, 143, 208, 0.4) 0%, rgba(33, 55, 87, 0) 25%), ' +
          'radial-gradient(circle at left 20%, rgba(91, 143, 208, 0.4) 0%, rgba(33, 55, 87, 0) 25%), ' +
          'radial-gradient(circle at right 30%, rgba(91, 143, 208, 0.3) 0%, rgba(33, 55, 87, 0) 25%)',

        'bubble-blue':
          'radial-gradient(circle, rgba(91, 143, 208, 0.6) 0%, rgba(33, 55, 87, 0.1) 70%), url("/path-to-your-image.jpg")' /* optionel : si tu veux ajouter une image */,
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
