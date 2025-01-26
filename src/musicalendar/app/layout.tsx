import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PlaylistProvider } from './context/PlaylistContext';
import { ThemeProvider } from './context/ThemeContext';
import {SessionProvider} from "@/app/context/ClientSessionProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Musicalendar',
  description: 'Your Spotify Calendar',
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen transition-colors duration-200`}>
                <ThemeProvider>
                    <SessionProvider>
                        <PlaylistProvider>
                            {children}
                        </PlaylistProvider>
                    </SessionProvider>
                </ThemeProvider>
            </body>
        </html>
  );
}
