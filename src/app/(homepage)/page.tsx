"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AccordionHomePage from "./components/Accordion";
import { BookIcon, ChartIcon, LockIcon } from "@/src/components/icons";
import logo from "@/public/logo.png";
import { motion } from "framer-motion";

const features = [
  {
    title: "Suivi en temps réel",
    description:
      "Regroupez toutes vos mensualités sur un tableau de bord unique, catégorisez-les et surveillez l’impact immédiat sur votre budget.",
    icon: ChartIcon,
  },
  {
    title: "Historique détaillé",
    description:
      "Visualisez l’historique complet de vos mensualités, conservez une trace précise et identifiez instantanément les variations importantes.",
    icon: BookIcon,
  },
  {
    title: "Limites budgétaires actives",
    description:
      "Fixez des plafonds par catégorie, contrôlez vos dépenses récurrentes et recevez des alertes dès que vous frôlez vos limites.",
    icon: LockIcon,
  },
];

export default function Home() {
  const pathName = usePathname();

  if (pathName === "/sign-in" || pathName === "/sign-up") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-brand-100 text-slate-900">
        <div className="relative overflow-hidden">
          {/** auth pages handled elsewhere */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white/70 to-brand-100 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.2),_transparent_70%)]" />

        <nav className="fixed top-4 left-1/2 z-40 flex w-[90%] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full border border-brand/20 bg-white/50 px-5 py-1.5 font-medium text-brand-700 shadow-[0_12px_28px_rgba(8,29,72,0.12)] backdrop-blur supports-[backdrop-filter]:bg-white/40">
          <Link href="/" className="flex items-center gap-2 text-brand-700">
            <Image
              src={logo}
              alt="logo"
              className="w-12 md:w-16"
              width={200}
              height={200}
            />
            <p className="text-base font-black md:text-lg lg:text-xl">
              Subtrack
            </p>
          </Link>

          <section className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sign-up"
              className="rounded-full border border-brand/30 bg-brand-100 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-[0_8px_18px_rgba(8,29,72,0.15)] transition hover:bg-brand-200 hover:text-brand-900 md:px-4 md:text-base"
            >
              Inscription
            </Link>
            <Link
              href="/sign-in"
              className="rounded-full border border-brand/30 bg-brand-200 px-3 py-1.5 text-xs font-semibold text-brand-900 shadow-[0_10px_20px_rgba(8,29,72,0.18)] transition hover:bg-brand-300 hover:text-brand-950 md:px-4 md:text-base"
            >
              Connexion
            </Link>
          </section>
        </nav>

        <header className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-44 md:flex-row md:items-center md:justify-between">
          <motion.div
            className="flex flex-1 flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="w-fit rounded-full border border-brand/30 bg-brand-100 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-brand-700">
              La suite SaaS pour vos finances
            </span>

            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Gardez une longueur d’avance sur vos mensualités.
              <span className="block bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 bg-clip-text font-black text-transparent">
                Décidez avec confiance.
              </span>
            </h1>

            <p className="max-w-xl text-lg text-slate-600 md:text-xl">
              Subtrack automatise le suivi de vos abonnements et met en lumière
              ce qui compte : cash-flow, échéances critiques et opportunités
              d’optimisation.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-brand-200 bg-brand-600 px-7 py-3 font-semibold text-white shadow-[0_22px_45px_rgba(8,29,72,0.28)] transition duration-500 hover:scale-[1.02] hover:border-brand-300 hover:bg-brand-700 hover:duration-500 before:absolute before:top-0 before:left-[-140%] before:h-full before:w-[170%] before:bg-white/40 before:opacity-0 before:skew-x-[-25deg] before:transition-all before:duration-700 hover:before:left-[140%] hover:before:opacity-60"
              >
                Découvrir Subtrack
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative flex flex-1 justify-end"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            <div className="absolute -left-10 top-12 h-40 w-40 rounded-full bg-brand-200/60 blur-3xl" />
            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-brand/20 bg-white p-5 shadow-[0_30px_60px_rgba(8,29,72,0.2)]">
              <div className="rounded-2xl border border-brand/10 bg-brand-50/70 p-4 shadow-inner">
                <video
                  width="220"
                  height="140"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="h-full w-full rounded-xl border border-brand/20 shadow-[0_25px_45px_rgba(8,29,72,0.25)]"
                >
                  <source src="/video/screenrecorder.mp4" type="video/mp4" />
                  <track
                    src="/path/to/captions.vtt"
                    kind="subtitles"
                    srcLang="fr"
                    label="Français"
                  />
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>
            </div>
          </motion.div>
        </header>
      </div>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-24">
        <motion.section
          className="rounded-3xl border border-brand/20 bg-white p-10 shadow-[0_18px_45px_rgba(8,29,72,0.12)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Une plateforme financière complète
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-slate-600">
            Automatisez vos reporting, détectez les risques de dépassement et
            délivrez des insights clairs à votre équipe finance.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-brand/20 bg-brand-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:bg-brand-100/70 hover:shadow-[0_15px_35px_rgba(8,29,72,0.18)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 shadow">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="rounded-3xl border border-brand/20 bg-white p-10 shadow-[0_18px_45px_rgba(8,29,72,0.12)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <h2 className="pb-8 text-center text-3xl font-semibold md:text-4xl">
            Questions fréquentes
          </h2>
          <AccordionHomePage />
        </motion.section>
      </main>

      <footer className="mt-16 flex flex-col items-center justify-evenly gap-6 py-10 text-brand-700 md:flex-row md:gap-0">
        <Link
          href="mailto:p.lesouchu@gmail.com"
          className="text-center font-semibold transition hover:text-brand-500 hover:underline hover:underline-offset-4 md:hover:text-brand-600"
        >
          Contactez-nous
        </Link>
        <Link
          href="/legal-notices"
          className="text-center font-semibold transition hover:text-brand-500 hover:underline hover:underline-offset-4 md:hover:text-brand-600"
        >
          Mentions légales
        </Link>
        <Link
          href="/cgu"
          className="text-center font-semibold transition hover:text-brand-500 hover:underline hover:underline-offset-4 md:hover:text-brand-600"
        >
          Conditions générales d&apos;utilisation
        </Link>
      </footer>
    </div>
  );
}
