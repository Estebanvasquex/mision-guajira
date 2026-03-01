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
        // Nueva paleta terracota
        primary: {
          DEFAULT: '#C2703A',  // Terracota cálido
          dark: '#8B4A2B',     // Terracota oscuro
          light: '#3D2A1E',    // Marrón profundo
        },
        accent: {
          DEFAULT: '#F5EDE6',  // Crema natural
          light: '#FDFBF9',    // Blanco cálido
        },
        // Mantener colores Wayuu para compatibilidad
        wayuu: {
          red: '#D32F2F',
          orange: '#C2703A',   // Actualizado a terracota
          yellow: '#FBC02D',
          green: '#388E3C',
          blue: '#1976D2',
          purple: '#7B1FA2',
          pink: '#C2185B',
          brown: '#3D2A1E',    // Actualizado a marrón profundo
          sand: '#F5EDE6',     // Actualizado a crema natural
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
