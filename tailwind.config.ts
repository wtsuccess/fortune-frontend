import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xl: { max: '1535px' },
      lg: { max: '1279px' },
      md: { max: '991px' },
      sm: { max: '767px' },
      xs: { max: '575px' },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#27AAE1',
        text: '#ECECEC',
        background: '#191C2C',
        blue: {
          DEFAULT: '#2A9CDA'
        }
      },
      keyframes: {
        skew: {
          '0%, 100%': { transform: 'skew(0deg, 0deg)' },
          '50%': { transform: 'skew(-10deg) rotate(40deg) scale(125%)' },
        },
      },
      animation: {
        skew: 'skew 1800ms ease-in-out infinite',
        "skew-once": 'skew 1800ms ease-in-out',
      },
    },
  },
  plugins: [],
}
export default config
