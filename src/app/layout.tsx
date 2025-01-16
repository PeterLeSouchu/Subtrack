import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='fr'>
        <body
          className={`${nunitoSans.className}  antialiased bg-classy-dotted min-h-screen flex flex-col `}
        >
          <Header />

          <main className=' text-colorone flex-grow '>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
