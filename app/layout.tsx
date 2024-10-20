import type { Metadata } from 'next';
import { Montaga } from 'next/font/google';
import './globals.css';

const montaga = Montaga({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Joanna & Ivan',
  description: 'Wedding of Joanna and Ivan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={montaga.className}>{children}</body>
    </html>
  );
}
