import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Misión Guajira - Cuadros Personalizados",
  description: "Apoya nuestra misión cristiana en La Guajira con un cuadro personalizado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
