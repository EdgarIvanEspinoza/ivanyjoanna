import type { Metadata } from "next";
import { Montaga } from "next/font/google";
import "./globals.css";
import { ScreenSizeProvider } from "@/Contexts/ScreenContext";

const montaga = Montaga({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joanna & Ivan",
  description: "Wedding of Joanna and Ivan",
  openGraph: {
    title: "Ivan & Joanna - Boda 10 de Octubre 2025",
    description: "Revive el momento mágico",
    images: [
      {
        url: "assets/photos/best.jpg",
        height: 1200,
        width: 630,
        alt: "Ivan y Joanna",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#515d38",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montaga.className}>
        <ScreenSizeProvider>{children}</ScreenSizeProvider>
      </body>
    </html>
  );
}
