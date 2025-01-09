import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-100": "#000E57",
        "brand-200": "#1C0955",
        "brand-300": "#24033D",
        "brand-500" : "#071144",
        "brandazul-600":"#030A32",
        "brandazuloscuro-100" : "#02061B",
        "brandmorado-700" : "#590F87",
        "brandrosado-800" : "#A959FF",
        "brandfucsia-900" : "#6017AF",
        "brandmorad-600" : "#572481",
        "brandmora-500" : "#501B7A",
        "brandborder-400" : "#6300B2",
        "brandpurpura-600" : "#3E0552",
        "brandrosa-800" : "#8204E7",
        "brandrosa-500": "#7913E5",
        "brandblanco-200": "#D9D9D9",
        "brandazul-200" : "#00168B",
        "brand-morado-500" : "#170744",
        "brand-mor-600" : "#4B0582",
        "brandmora-400": "#33025A",
        "brandm-400": "#BFB5FF",
         "brandmc-100": "#8C52FF",
          "brandmo-800": "#351C99",
           "brandm-500": "#5E17EB"
      },
    },
  },
  plugins: [],
} satisfies Config;
