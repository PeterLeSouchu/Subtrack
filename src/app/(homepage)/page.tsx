'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  ArrowRight,
  Car,
  Check,
  GraduationCap,
  HeartPulse,
  Home as HomeIcon,
  Landmark,
  PiggyBank,
  Shield,
  ShoppingBasket,
  Sparkles,
  Wifi,
} from 'lucide-react';
import AccordionHomePage from './components/Accordion';
import SiteNav from './components/Site-nav';
import SiteFooter from './components/Site-footer';
import FeaturesBento from './components/Features-bento';
import ProductMockup, {
  FloatingLimit,
  FloatingRenewal,
} from './components/Product-mockup';

const categories = [
  { name: 'Logement', icon: HomeIcon },
  { name: 'Transport', icon: Car },
  { name: 'Santé', icon: HeartPulse },
  { name: 'Crédits', icon: Landmark },
  { name: 'Assurances', icon: Shield },
  { name: 'Alimentation', icon: ShoppingBasket },
  { name: 'Éducation', icon: GraduationCap },
  { name: 'Épargne', icon: PiggyBank },
  { name: 'Services', icon: Wifi },
  { name: 'Autres', icon: Sparkles },
];

const steps = [
  {
    title: 'Créez votre compte',
    description:
      'Avec votre email ou votre compte Google. C’est gratuit et ça prend moins d’une minute.',
  },
  {
    title: 'Ajoutez vos mensualités',
    description:
      'Un nom, un prix, une catégorie. Loyer, crédit, abonnements : tout y passe.',
  },
  {
    title: 'Laissez Subtrack suivre',
    description:
      'Vos mensualités sont reconduites chaque mois. Consultez le bilan quand vous voulez.',
  },
];

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className='mx-auto max-w-2xl text-center'>
      <span className='inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100'>
        {badge}
      </span>
      <h2 className='mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-ink md:text-[2.75rem] md:leading-[1.1]'>
        {title}
      </h2>
      <p className='mt-4 text-balance text-lg text-stattext'>{description}</p>
    </div>
  );
}

export default function Home() {
  const mockupRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mockupRef,
    offset: ['start end', 'start 0.35'],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <MotionConfig reducedMotion='user'>
      <div className='min-h-screen overflow-x-clip bg-white text-ink'>
        <SiteNav />

        {/* Hero */}
        <header className='relative isolate pt-32 md:pt-40'>
          <div className='bg-grid mask-fade-b absolute inset-0 -z-10' />
          <div className='absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,91,255,0.22),transparent)] blur-2xl' />

          <motion.div
            className='mx-auto max-w-4xl px-5 text-center'
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href='/sign-up'
              className='group inline-flex items-center gap-2 rounded-full bg-white/80 py-1 pl-1 pr-3 text-sm text-stattext shadow-soft ring-1 ring-ink/5 backdrop-blur transition hover:ring-brand-200'
            >
              <span className='rounded-full bg-brand-600 px-2 py-0.5 text-xs font-semibold text-white'>
                Gratuit
              </span>
              Sans carte bancaire, sans publicité
              <ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
            </Link>

            <h1 className='mt-7 text-balance text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-6xl md:text-7xl'>
              Reprenez le contrôle de vos{' '}
              <span className='text-gradient'>mensualités</span>
            </h1>
            <p className='mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-stattext md:text-xl'>
              Loyer, crédits, abonnements, assurances : Subtrack réunit tout ce
              que vous payez chaque mois et vous montre où part votre argent.
            </p>

            <div className='mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <Link
                href='/sign-up'
                className='group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-brand-500 to-brand-600 px-6 text-[0.95rem] font-semibold text-white shadow-glow transition hover:from-brand-600 hover:to-brand-700 sm:w-auto'
              >
                Créer mon compte gratuit
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
              </Link>
              <Link
                href='/sign-in'
                className='inline-flex h-12 w-full items-center justify-center rounded-xl bg-white px-6 text-[0.95rem] font-semibold text-ink shadow-soft ring-1 ring-ink/10 transition hover:bg-slate-50 sm:w-auto'
              >
                J&apos;ai déjà un compte
              </Link>
            </div>

            <ul className='mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stattext'>
              {[
                'Connexion avec Google',
                'Reconduction automatique',
                'Mobile et desktop',
              ].map((item) => (
                <li key={item} className='flex items-center gap-1.5'>
                  <Check
                    className='h-4 w-4 text-brand-600'
                    strokeWidth={2.5}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Product */}
          <div
            ref={mockupRef}
            className='relative mx-auto mt-16 max-w-6xl px-3 [perspective:1600px] md:mt-20 md:px-8'
          >
            <div className='absolute inset-x-10 top-10 -z-10 h-2/3 rounded-full bg-brand-500/25 blur-[100px]' />
            <motion.div
              style={{ rotateX, scale, transformOrigin: 'top center' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className='relative rounded-[1.4rem] bg-white/40 p-1.5 ring-1 ring-ink/5 backdrop-blur md:p-2'
            >
              <ProductMockup />
            </motion.div>

            <motion.div
              className='absolute -bottom-7 left-16 hidden lg:block'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <FloatingRenewal />
            </motion.div>
            <motion.div
              className='absolute -right-2 -top-10 hidden lg:block'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
            >
              <FloatingLimit />
            </motion.div>
          </div>
        </header>

        {/* Categories marquee */}
        <section className='py-16 md:py-20'>
          <p className='text-center text-sm font-medium text-stattext'>
            Toutes vos dépenses récurrentes, rangées dans 10 catégories
          </p>
          <div className='mask-fade-x mt-6 overflow-hidden'>
            <ul className='flex w-max animate-marquee gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none'>
              {[...categories, ...categories].map(({ name, icon: Icon }, i) => (
                <li
                  key={`${name}-${i}`}
                  aria-hidden={i >= categories.length}
                  className='flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm font-medium text-ink shadow-soft ring-1 ring-ink/5'
                >
                  <span className='flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-600'>
                    <Icon className='h-3.5 w-3.5' />
                  </span>
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <main>
          {/* Features */}
          <section
            id='fonctionnalites'
            className='scroll-mt-24 bg-gradient-to-b from-white via-dashboardbg to-dashboardbg py-20 md:py-28'
          >
            <div className='mx-auto max-w-6xl px-5 md:px-8'>
              <SectionHeading
                badge='Fonctionnalités'
                title='Tout ce qu’il faut pour suivre vos mensualités'
                description='Quatre écrans simples : tableau de bord, historique, bilan et profil. Rien de superflu.'
              />
              <div className='mt-14'>
                <FeaturesBento />
              </div>
            </div>
          </section>

          {/* Steps */}
          <section
            id='comment-ca-marche'
            className='scroll-mt-24 py-20 md:py-28'
          >
            <div className='mx-auto max-w-6xl px-5 md:px-8'>
              <SectionHeading
                badge='Comment ça marche'
                title='Prêt en trois étapes'
                description='Pas de synchronisation bancaire, pas de configuration. Vous notez, Subtrack s’occupe du reste.'
              />
              <div className='relative mt-14'>
                <div className='absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-brand-100 via-brand-300 to-brand-100 md:block' />
                <ol className='relative grid gap-4 md:grid-cols-3 md:gap-6'>
                  {steps.map((step, i) => (
                    <li
                      key={step.title}
                      className='rounded-3xl bg-white p-6 text-center shadow-soft ring-1 ring-ink/5 md:bg-transparent md:p-2 md:shadow-none md:ring-0'
                    >
                      <span className='mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-brand-600 shadow-soft ring-1 ring-brand-100'>
                        {i + 1}
                      </span>
                      <h3 className='mt-5 text-lg font-semibold tracking-tight'>
                        {step.title}
                      </h3>
                      <p className='mx-auto mt-2 max-w-xs text-[0.95rem] leading-relaxed text-stattext'>
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className='px-3 md:px-8'>
            <div className='relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-16 text-center md:py-24'>
              <div className='bg-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]' />
              <div className='absolute -top-40 left-1/2 -z-10 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand-500/50 blur-[100px]' />
              <div className='absolute -bottom-40 left-1/2 -z-10 h-72 w-[500px] -translate-x-1/2 rounded-full bg-sky-500/25 blur-[100px]' />
              <h2 className='mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.1]'>
                Combien payez-vous vraiment chaque mois ?
              </h2>
              <p className='mx-auto mt-4 max-w-lg text-balance text-lg text-brand-200'>
                Créez votre compte et ayez la réponse en quelques minutes.
              </p>
              <Link
                href='/sign-up'
                className='group mt-9 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-6 text-[0.95rem] font-semibold text-brand-800 shadow-float transition hover:bg-brand-50'
              >
                Créer mon compte gratuit
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-0.5' />
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section id='faq' className='scroll-mt-24 py-20 md:py-28'>
            <div className='mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1fr_1.5fr] md:gap-16 md:px-8'>
              <div>
                <span className='inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100'>
                  FAQ
                </span>
                <h2 className='mt-4 text-3xl font-semibold tracking-[-0.03em] md:text-[2.75rem] md:leading-[1.1]'>
                  Questions fréquentes
                </h2>
                <p className='mt-4 max-w-sm text-stattext'>
                  Une autre question ?{' '}
                  <a
                    href='mailto:p.lesouchu@gmail.com'
                    className='font-medium text-brand-600 underline-offset-4 hover:underline'
                  >
                    Écrivez-nous
                  </a>
                  .
                </p>
              </div>
              <div className='rounded-3xl bg-white px-6 shadow-soft ring-1 ring-ink/5 md:px-8'>
                <AccordionHomePage />
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
