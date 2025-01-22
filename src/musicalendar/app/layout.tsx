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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen transition-colors duration-200`}>
        <PlaylistProvider>{children}</PlaylistProvider>
      </body>
    </html>
  );
}
