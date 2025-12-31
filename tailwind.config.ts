import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "pitch-black": "#000000",
                "premium-orange": "#ffc241",
                "deep-space": "#0a0a0a",
                charcoal: "#111111",
                "golden-glow": "#ffd700",
                "burnt-orange": "#e6ac00",
                "vegetarian-green": "#059669",
                "warm-orange": "#EA580C",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                serif: ["var(--font-playfair)", "serif"],
            },
        },
    },
    plugins: [],
};
export default config;
