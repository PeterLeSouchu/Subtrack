import Link from "next/link";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { Logo } from "../components/Site-nav";
import { FloatingLimit, FloatingRenewal } from "../components/Product-mockup";

function TotalCard() {
  return (
    <div className="w-72 rounded-2xl bg-white p-5 shadow-float ring-1 ring-ink/5">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-stattext">Total du mois</p>
        <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-semibold text-brand-700">
          <TrendingUp className="h-3 w-3" /> 2,4 %
        </span>
      </div>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
        1 228,89 €
      </p>
      <div className="mt-4 flex h-14 items-end gap-1">
        {[48, 55, 52, 60, 58, 66, 62, 70, 68, 74, 80, 86].map((h, i, a) => (
          <span
            key={i}
            className={`flex-1 rounded-[3px] ${
              i === a.length - 1 ? "bg-brand-600" : "bg-brand-100"
            }`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AuthHomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full bg-white p-0 lg:p-3">
      <section className="relative flex w-full flex-1 flex-col px-5 py-5 md:px-10">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-stattext transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Accueil
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center py-12">
          {children}
        </div>
        <p className="text-center text-xs text-stattext">
          En continuant, vous acceptez les{" "}
          <Link href="/cgu" className="underline underline-offset-2 hover:text-ink">
            conditions d&apos;utilisation
          </Link>
          .
        </p>
      </section>

      <section className="relative isolate hidden w-[48%] max-w-3xl flex-col justify-between overflow-hidden rounded-[1.75rem] bg-brand-950 p-12 lg:flex xl:p-14">
        <div className="bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_60%_55%,#000_25%,transparent_75%)]" />
        <div className="absolute -right-24 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand-500/50 blur-[110px]" />
        <div className="absolute -bottom-24 left-0 -z-10 h-72 w-72 rounded-full bg-sky-500/25 blur-[100px]" />

        <div className="max-w-md">
          <p className="text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.035em] text-white xl:text-[2.75rem]">
            Toutes vos mensualités, au même endroit.
          </p>
          <p className="mt-4 text-brand-200">
            Loyer, crédits, abonnements : notez-les une fois, Subtrack les
            reconduit chaque mois.
          </p>
        </div>

        <div className="relative mx-auto h-[290px] w-full max-w-md" aria-hidden="true">
          <div className="absolute left-0 top-0 -rotate-2">
            <TotalCard />
          </div>
          <div className="absolute right-0 top-[120px] rotate-2">
            <FloatingLimit />
          </div>
          <div className="absolute bottom-0 left-10 -rotate-1">
            <FloatingRenewal />
          </div>
        </div>
      </section>
    </div>
  );
}
