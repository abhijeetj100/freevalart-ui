import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Artist Portfolio and Business Site',
  description: 'A portfolio, shop, commissions, and teaching website for an independent artist.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
