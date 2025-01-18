import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PlaylistProvider } from './context/PlaylistContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Musicalendar',
  description: 'Your Spotify Calendar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PlaylistProvider>{children}</PlaylistProvider>
      </body>
    </html>
  );
}
