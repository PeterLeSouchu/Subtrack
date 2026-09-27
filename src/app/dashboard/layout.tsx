'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  BarChart3,
  History,
  LayoutDashboard as DashboardNavIcon,
  LogOut,
  User,
} from 'lucide-react';
import { ConfirmProvider } from '../providers/Confirm-provider';
import { ToastProvider } from '../providers/Toast-provider';
import { LogoMark } from '@/src/components/Logo-mark';

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
          <div className='relative flex min-w-0 flex-1 flex-col'>
            <MobileBar />
            <main className='relative isolate flex-1 overflow-y-auto pb-24 lg:pb-0'>
              <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(59,91,255,0.08),transparent)]' />
              {children}
            </main>
            <MobileTabBar />
          </div>
        </div>
      </ConfirmProvider>
    </ToastProvider>
  );
}

function Brand() {
  return (
    <Link href='/dashboard' className='flex items-center gap-2'>
      <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-glow'>
        <LogoMark className='h-5 w-5' />
      </span>
      <span className='text-[1.05rem] font-semibold tracking-tight text-ink'>
        Subtrack
      </span>
    </Link>
  );
}

function Sidebar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const email = session?.user?.email ?? '';

  return (
    <aside className='hidden w-64 shrink-0 flex-col border-r border-line bg-white/70 px-3 py-5 backdrop-blur lg:flex'>
      <div className='px-2'>
        <Brand />
      </div>

      <nav aria-label='Navigation principale' className='mt-8'>
        <p className='px-3 pb-2 text-xs font-medium text-stattext'>Menu</p>
        <ul className='flex flex-col gap-1'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(pathName, item.path);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-ink shadow-soft ring-1 ring-ink/5'
                      : 'text-stattext hover:bg-ink/[0.04] hover:text-ink'
                  }`}
                >
                  <Icon
                    className={`h-[18px] w-[18px] ${
                      isActive ? 'text-brand-600' : ''
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className='mt-auto flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-soft ring-1 ring-ink/5'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 text-sm font-semibold uppercase text-white'>
          {email.charAt(0) || '?'}
        </span>
        <div className='min-w-0 flex-1'>
          <p className='text-xs text-stattext'>Connecté</p>
          <p className='truncate text-sm font-medium text-ink' title={email}>
            {email}
          </p>
        </div>
        <button
          type='button'
          onClick={() => signOut()}
          aria-label='Se déconnecter'
          title='Se déconnecter'
          className='rounded-lg p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600'
        >
          <LogOut className='h-4 w-4' />
        </button>
      </div>
    </aside>
  );
}

function MobileBar() {
  return (
    <header className='sticky top-0 z-20 flex items-center justify-between border-b border-line bg-white/80 px-4 py-3 backdrop-blur-xl lg:hidden'>
      <Brand />
      <button
        type='button'
        onClick={() => signOut()}
        aria-label='Se déconnecter'
        className='rounded-lg p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600'
      >
        <LogOut className='h-5 w-5' />
      </button>
    </header>
  );
}

function MobileTabBar() {
  const pathName = usePathname();

  return (
    <nav
      aria-label='Navigation principale'
      className='fixed inset-x-3 bottom-3 z-30 rounded-2xl bg-white/90 p-1.5 shadow-float ring-1 ring-ink/5 backdrop-blur-xl lg:hidden'
    >
      <ul className='grid grid-cols-4 gap-1'>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = isItemActive(pathName, item.path);
          return (
            <li key={item.path}>
              <Link
                href={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-stattext hover:text-ink'
                }`}
              >
                <Icon className='h-5 w-5' />
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
