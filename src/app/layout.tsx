import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import QueryProvider from './providers/Query-provider';
import Spinner from '../components/Spinner';
import { Suspense } from 'react';

const body = Geist({
  variable: '--font-body',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Subtrack',
  description: 'Suivez toutes vos mensualités au même endroit.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <QueryProvider>
        <html lang='fr'>
          <body
            className={`${body.variable} font-sans antialiased`}
          >
            <Suspense fallback={<Spinner />}>
              <main>{children}</main>
            </Suspense>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
