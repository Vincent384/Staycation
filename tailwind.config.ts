import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customWhite:"#FAF7F7",
        borderGray:"#828181",
        customGreen:"#457587",
        customOrange:"#AC5D00",
        customLightGreen:"#0B8A1E",
        customBeige:"#FCEFEF",
        customGray:"#828181",
        customBlue:"#1B14FA"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #457587, #FAF7F7)', // Lägg till din gradient här
      },
    },
  },
  plugins: [],
};

export default config;
