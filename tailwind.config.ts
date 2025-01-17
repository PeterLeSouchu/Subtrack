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
        colorone: '#253145',
      },
      borderWidth: {
        b1: '1px',
      },
      backgroundColor: {
        question: '#ECEBFD',
        nav: '#253145',
      },
      backgroundImage: {
        'classy-dotted':
          'radial-gradient(circle, rgba(230, 240, 255, 0.8) 1px, transparent 1px), #F9FAFB',
        'custom-gradient1': 'linear-gradient(to bottom, #2f4159, #253145)',
        'custom-gradient2': 'linear-gradient(to top, #2f4159, #253145)',
      },
    },
  },
  plugins: [nextui()],
} satisfies Config;
