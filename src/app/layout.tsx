import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import QueryProvider from './providers/Query-provider';
import Spinner from '../components/Spinner';
import { Suspense } from 'react';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Subtrack',
  description: 'Generated by create next app',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
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
          <body className={`${nunitoSans.className} antialiased `}>
            <Suspense fallback={<Spinner />}>
              <main>{children}</main>
            </Suspense>
          </body>
        </html>
      </QueryProvider>
    </SessionProvider>
  );
}
