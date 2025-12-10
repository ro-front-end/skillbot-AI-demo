import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f1e",
        darker: "#0a0a14",
        purple: "#a855f7",
        "purple-light": "#d8b4fe",
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(135deg, #0f0f1e 0%, #1a0f2e 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
