import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-primary":   "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary":  "var(--color-text-tertiary)",
        "text-medium":    "var(--color-text-medium)",
        "text-white":     "var(--color-text-white)",
        "accent":         "var(--color-accent)",
        "bg-page":        "var(--color-bg-page)",
        "bg-dark":        "var(--color-bg-dark)",
        "bg-chip":        "var(--color-bg-chip)",
        "bg-gray":        "var(--color-bg-gray)",
        "bg-muted":       "var(--color-bg-muted)",
        "bg-muted-hover": "var(--color-bg-muted-hover)",
        "bg-elevated":    "var(--color-bg-elevated)",
      },
      fontFamily: {
        sans: ["SF Pro Display", "SF Pro Text", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        "tight-xl": "-1.2px",
        "tight-lg": "-0.64px",
        "tight-tag": "-0.52px",
        "tight-body": "-0.6px",
      },
    },
  },
  plugins: [],
};
export default config;
