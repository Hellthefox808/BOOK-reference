import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: "#f9f4ef",
          100: "#f2e7db",
          200: "#e3cdb5",
          300: "#cda57f",
          400: "#b78252",
          500: "#9a6738",
          600: "#7d512d",
          700: "#614022",
          800: "#44301a",
          900: "#2a1d13",
        },
        cream: {
          bg: "#f6efe7",
          card: "#ffffff",
        },
        espresso: {
          bg: "#100d0c",
          card: "#161210",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(28, 18, 12, 0.12)",
        glow: "0 0 25px rgba(205, 165, 127, 0.15)",
      },
      borderRadius: {
        xl2: "1.5rem",
        "3xl": "1.875rem",
      },
      fontFamily: {
        serif: ["Georgia", "Merriweather", "serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
