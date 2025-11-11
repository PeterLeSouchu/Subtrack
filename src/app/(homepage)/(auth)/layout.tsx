import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function AuthHomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-gradient-to-b from-brand-50 via-white to-brand-100">
      <section className="hidden w-1/2 min-h-screen flex-col items-center justify-center bg-gradient-to-b from-brand-50 via-brand-100/40 to-brand-100 px-12 text-brand-900 shadow-[inset_-1px_0_0_rgba(8,29,72,0.08)] lg:flex">
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
      <section className="relative flex w-full flex-1 flex-col bg-gradient-to-b from-brand-50 via-white to-brand-100 lg:bg-white">
        <Link
          href="/"
          className="absolute left-6 top-6 font-extrabold text-lg text-brand-600 transition hover:text-brand-800 lg:right-10 lg:left-auto"
        >
          Accueil
        </Link>
        <div className="flex h-full w-full items-center justify-center py-20 lg:py-0">
          {children}
        </div>
      </section>
    </div>
  );
}
