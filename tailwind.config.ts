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
        wayuu: {
          red: '#D32F2F',      // Rojo vibrante
          orange: '#FF6F00',   // Naranja intenso
          yellow: '#FBC02D',   // Amarillo dorado
          green: '#388E3C',    // Verde esmeralda
          blue: '#1976D2',     // Azul cielo
          purple: '#7B1FA2',   // Morado profundo
          pink: '#C2185B',     // Rosa fucsia
          brown: '#5D4037',    // Marrón tierra
          sand: '#F5E6D3',     // Arena del desierto
        },
      },
    },
  },
  plugins: [],
};
export default config;
