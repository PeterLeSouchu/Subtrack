import FooterHomePage from './components/Footer';
import HeaderHomePage from './components/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`  antialiased bg-homepage-blue min-h-screen flex flex-col `}
    >
      <HeaderHomePage />
      <main className=' text-blue flex-grow '>{children}</main>
      <FooterHomePage />
    </div>
  );
}
