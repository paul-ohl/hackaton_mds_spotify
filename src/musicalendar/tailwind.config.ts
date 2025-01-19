import type { Config } from "tailwindcss";
import colors from 'tailwindcss/colors';

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.gray[800],
          dark: colors.white,
        },
        secondary: {
          DEFAULT: colors.gray[400],
          dark: colors.gray[400],
        },
        accent: {
          DEFAULT: colors.indigo[600],
          dark: colors.indigo[600],
        },
        border: {
          DEFAULT: colors.gray[700],
          dark: colors.gray[200],
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
