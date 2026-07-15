/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#05050A',
        violet: '#7C3AED',
        cyan: '#22D3EE',
        hot: '#FF3DAA',
        ink: '#0A0A12',
        mist: '#8A8AA3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'nexora-gradient': 'linear-gradient(90deg, #7C3AED 0%, #22D3EE 100%)',
        'nexora-radial': 'radial-gradient(circle at 50% 0%, rgba(124,58,237,0.25) 0%, rgba(5,5,10,0) 60%)',
      },
      animation: {
        'bounce-slow': 'bounce 2.4s infinite',
        marquee: 'marquee 32s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
