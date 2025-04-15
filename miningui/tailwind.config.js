/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Updated from ./app/ to ./src/app/
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Updated to src/components/
  ],
  theme: {
    extend: {
      colors: {
        solana: {
          dark: "#0F172A",
          teal: "#14F195",
          purple: "#9945FF",
          pink: "#F472B6",
          gray: "#D1D5DB",
        },
      },
      backgroundImage: {
        "gradient-solana": "linear-gradient(120deg, #14F195, #9945FF)",
      },
      boxShadow: {
        "glow": "0 0 15px rgba(20, 241, 149, 0.5)",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-slow': 'pulseSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%': { transform: 'scale(1)', opacity: 0.7 },
          '50%': { transform: 'scale(1.2)', opacity: 0.3 },
          '100%': { transform: 'scale(1)', opacity: 0.7 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};