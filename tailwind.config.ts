import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)"],
        sans: ["var(--font-dm-sans)", "sans-serif"],
      },
    },
  },
};

export default config;
