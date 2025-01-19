import './globals.css';
import AuthProvider from "@/app/auth/[...nextauth]/AuthProvider";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PlaylistProvider } from './context/PlaylistContext';
import { ThemeProvider } from './context/ThemeContext';

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
                <ThemeProvider>
                    <PlaylistProvider>{children}</PlaylistProvider>
                </ThemeProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
  );
}
