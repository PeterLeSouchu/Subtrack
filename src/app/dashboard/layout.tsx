'use client';

import { ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BarChart3,
  History,
  LayoutDashboard as DashboardNavIcon,
  LogOut,
  Menu,
  User,
  X,
} from 'lucide-react';
import { ConfirmProvider } from '../providers/Confirm-provider';
import { ToastProvider } from '../providers/Toast-provider';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: DashboardNavIcon,
  },
  {
    name: 'Historique',
    path: '/dashboard/history',
    icon: History,
  },
  {
    name: 'Bilan',
    path: '/dashboard/result',
    icon: BarChart3,
  },
  {
    name: 'Profil',
    path: '/dashboard/profile',
    icon: User,
  },
];

function isItemActive(pathName: string, path: string) {
  if (path === '/dashboard') return pathName === path;
  return pathName === path || pathName.startsWith(`${path}/`);
}

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <div className='flex h-[100dvh] w-full overflow-hidden bg-dashboardbg'>
          <Sidebar />
          <div className='flex min-w-0 flex-1 flex-col'>
            <MobileBar />
            <main className='flex-1 overflow-y-auto'>{children}</main>
          </div>
        </div>
      </ConfirmProvider>
    </ToastProvider>
  );
}

function Brand() {
  return (
    <Link href='/dashboard' className='flex items-center gap-2.5'>
      <Image
        src='/logo.png'
        className='h-9 w-9'
        width={100}
        height={100}
        alt=''
      />
      <span className='font-display text-xl font-semibold tracking-tight text-ink'>
        Subtrack
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathName = usePathname();

  return (
    <ul className='flex flex-col gap-1'>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = isItemActive(pathName, item.path);

        return (
          <li key={item.path}>
            <Link
              href={item.path}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] font-medium transition-colors ${
                isActive
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-stattext hover:bg-slate-100 hover:text-ink'
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] ${
                  isActive ? 'text-brand-600' : ''
                }`}
                strokeWidth={2}
              />
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function Sidebar() {
  return (
    <aside className='hidden w-60 shrink-0 flex-col justify-between border-r border-line bg-white px-4 py-6 lg:flex'>
      <div className='flex flex-col gap-8'>
        <div className='px-2'>
          <Brand />
        </div>
        <nav aria-label='Navigation principale'>
          <NavLinks />
        </nav>
      </div>
      <button
        type='button'
        onClick={() => signOut()}
        className='flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.95rem] font-medium text-stattext transition-colors hover:bg-slate-100 hover:text-ink'
      >
        <LogOut className='h-[18px] w-[18px]' />
        Se déconnecter
      </button>
    </aside>
  );
}

function MobileBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  const currentItem = menuItems.find((item) =>
    isItemActive(pathName, item.path)
  );

  return (
    <header className='flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden'>
      <Brand />
      <h2 className='sr-only'>{currentItem?.name}</h2>
      <button
        type='button'
        onClick={() => setIsMenuOpen(true)}
        aria-label='Ouvrir le menu'
        className='rounded-lg p-2 text-ink transition-colors hover:bg-slate-100'
      >
        <Menu className='h-6 w-6' />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className='fixed inset-0 z-20 bg-ink/40 backdrop-blur-[2px]'
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              className='fixed right-0 top-0 z-30 flex h-full w-4/5 max-w-xs flex-col justify-between bg-white p-5 shadow-pop'
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <div className='flex flex-col gap-8'>
                <div className='flex items-center justify-between'>
                  <Brand />
                  <button
                    type='button'
                    onClick={() => setIsMenuOpen(false)}
                    aria-label='Fermer le menu'
                    className='rounded-lg p-2 text-ink transition-colors hover:bg-slate-100'
                  >
                    <X className='h-5 w-5' />
                  </button>
                </div>
                <nav aria-label='Navigation principale'>
                  <NavLinks onNavigate={() => setIsMenuOpen(false)} />
                </nav>
              </div>
              <button
                type='button'
                onClick={() => signOut()}
                className='flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-stattext transition-colors hover:bg-slate-100 hover:text-ink'
              >
                <LogOut className='h-[18px] w-[18px]' />
                Se déconnecter
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
