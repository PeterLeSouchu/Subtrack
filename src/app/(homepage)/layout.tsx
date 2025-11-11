export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased bg-homepage-blue min-h-screen text-slate-900">
      {children}
    </div>
  );
}
