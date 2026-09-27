'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '/#fonctionnalites', label: 'Fonctionnalités' },
  { href: '/#comment-ca-marche', label: 'Comment ça marche' },
  { href: '/#faq', label: 'FAQ' },
];

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 32 32' fill='none' className={className} aria-hidden='true'>
      <path
        d='M5.2 12.5A11.5 11.5 0 0 1 26.8 12.5M26.8 19.5A11.5 11.5 0 0 1 5.2 19.5'
        stroke='currentColor'
        strokeWidth='2.6'
        strokeLinecap='round'
      />
      <circle cx='3.6' cy='16' r='1.9' fill='currentColor' />
      <circle cx='28.4' cy='16' r='1.9' fill='currentColor' />
      <path
        d='M19.2 12.6c-.6-1-1.8-1.6-3.2-1.6-1.9 0-3.2 1-3.2 2.4 0 3.2 6.6 1.8 6.6 5.2 0 1.5-1.4 2.5-3.4 2.5-1.5 0-2.8-.6-3.4-1.8'
        stroke='currentColor'
        strokeWidth='2.4'
        strokeLinecap='round'
      />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href='/' className='flex items-center gap-2'>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${
          light
            ? 'bg-white/10 ring-1 ring-inset ring-white/20'
            : 'bg-gradient-to-b from-brand-500 to-brand-700 shadow-glow'
        }`}
      >
        <LogoMark className='h-5 w-5' />
      </span>
      <span
        className={`text-[1.05rem] font-semibold tracking-tight ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        Subtrack
      </span>
    </Link>
  );
}

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className='fixed inset-x-0 top-0 z-50 px-3 pt-3'>
      <nav
        className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-3 transition-all duration-300 md:px-4 ${
          scrolled || open
            ? 'bg-white/75 shadow-soft ring-1 ring-ink/5 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <Logo />

        <ul className='hidden items-center gap-1 md:flex'>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='rounded-lg px-3 py-2 text-sm font-medium text-stattext transition-colors hover:text-ink'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className='hidden items-center gap-2 md:flex'>
          <Link
            href='/sign-in'
            className='rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-ink/5'
          >
            Connexion
          </Link>
          <Link
            href='/sign-up'
            className='inline-flex h-9 items-center rounded-lg bg-gradient-to-b from-brand-500 to-brand-600 px-4 text-sm font-semibold text-white shadow-glow transition hover:from-brand-600 hover:to-brand-700'
          >
            Commencer
          </Link>
        </div>

        <button
          type='button'
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className='rounded-lg p-2 text-ink transition-colors hover:bg-ink/5 md:hidden'
        >
          {open ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className='mx-auto mt-2 max-w-6xl rounded-2xl bg-white/95 p-2 shadow-float ring-1 ring-ink/5 backdrop-blur-xl md:hidden'
          >
            <ul className='flex flex-col'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className='block rounded-lg px-3 py-3 text-[0.95rem] font-medium text-ink hover:bg-brand-50'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3'>
              <Link
                href='/sign-in'
                className='flex h-11 items-center justify-center rounded-xl text-sm font-semibold text-ink ring-1 ring-inset ring-line'
              >
                Connexion
              </Link>
              <Link
                href='/sign-up'
                className='flex h-11 items-center justify-center rounded-xl bg-brand-600 text-sm font-semibold text-white'
              >
                Commencer
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
