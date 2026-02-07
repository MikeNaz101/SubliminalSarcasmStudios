import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-serif)'], // Matches the variable in layout.tsx
                sans: ['var(--font-sans)'],   // Matches the variable in layout.tsx
            },
            colors: {
                gold: {
                    400: '#D4AF37',
                    500: '#C5A028',
                    600: '#B8860B',
                }
            }
        },
    },
    plugins: [],
};
export default config;