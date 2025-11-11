import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function AuthHomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <section className="hidden w-1/2 min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-100/70 to-blue-200 px-12 text-blue-900 lg:flex">
        <Image
          src={logo}
          width={300}
          height={300}
          alt="logo-subtrack"
          className=""
        />
        <h1 className="mt-6 text-center text-6xl font-black leading-tight">
          Subtrack
        </h1>
      </section>
      <section className="relative flex w-full flex-1 flex-col bg-gradient-to-b from-blue-50 via-white to-blue-100 lg:bg-white">
        <Link
          href="/"
          className="absolute left-6 top-6 font-extrabold text-lg text-blue-600 transition hover:text-blue-800 lg:right-10 lg:left-auto lg:pb-0 pb-72"
        >
          Accueil
        </Link>
        <div className="flex h-full w-full items-center justify-center py-14 lg:py-0">
          {children}
        </div>
      </section>
    </div>
  );
}
