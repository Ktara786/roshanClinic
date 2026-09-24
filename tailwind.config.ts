import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#23452F",
          light: "#2F5A3D",
          dark: "#1A3423",
        },
        sage: {
          DEFAULT: "#A8B9A5",
          light: "#C3D0C0",
        },
        ivory: "#F7F5EE",
        surface: "#FFFFFF",
        charcoal: "#26302A",
        muted: "#6B7A70",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        organic: "60% 40% 55% 45% / 45% 55% 45% 55%",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
