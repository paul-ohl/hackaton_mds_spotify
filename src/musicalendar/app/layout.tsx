import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import {SessionProvider} from "@/app/context/ClientSessionProvider";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
        <html lang="en">
        <body>
        <SessionProvider>
            <main>{children}</main>
            <footer>
                <p>Powered by Next.js and Spotify API</p>
            </footer>
        </SessionProvider>
        </body>
        </html>
    );
}
