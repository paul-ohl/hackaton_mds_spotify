import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Musicalendar',
  description: 'Calendar to reflect on your year in music',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
