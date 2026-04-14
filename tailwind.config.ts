import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        "off-white": "#F9F7F2"
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"]
      }
    }
  },
  plugins: []
};
export default config;