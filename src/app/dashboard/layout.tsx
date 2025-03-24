'use client';

import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  DashboardIcon,
  BookIcon,
  StonkIcon,
  ProfileIcon,
  MenuMobileIcon,
  CloseIcon,
} from '@/src/components/icons';
import { ConfirmProvider } from '../providers/Confirm-provider';
import { ToastProvider } from '../providers/Toast-provider';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardIcon width='13' height='13' />,
  },
  {
    name: 'Historique',
    path: '/dashboard/history',
    icon: <BookIcon width='18' height='18' />,
  },
  {
    name: 'Bilan',
    path: '/dashboard/result',
    icon: <StonkIcon width='18' height='18' />,
  },
  {
    name: 'Profil',
    path: '/dashboard/profile',
    icon: <ProfileIcon width='22' height='22' />,
  },
];

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <div className=' w-full flex flex-col  h-screen bg-dashboardbg '>
          <NavBar />

          <main className='flex-1  h-full overflow-hidden '> {children}</main>
        </div>
      </ConfirmProvider>
    </ToastProvider>
  );
}

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDimensions, setActiveDimensions] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const pathName = usePathname();

  function displayMobilePageName(pathName: string) {
    switch (pathName) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/history':
        return 'Historique';
      case '/dashboard/history/details':
        return 'Historique';
      case '/dashboard/result':
        return 'Bilan';

      case '/dashboard/profile':
        return 'Profil';
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const activeLink = document.querySelector('.active-link');

    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
      setActiveDimensions({ left: offsetLeft, width: offsetWidth });
    }
  }, [pathName]);
  return (
    <header className='w-full p-3  '>
      <nav className='w-full flex items-center rounded-xl   bg-navbar text-white font-semibold  justify-between lg:justify-center px-2 relative'>
        <Image
          src='/logowhite.png'
          className='w-10'
          width={100}
          height={100}
          alt='logo'
        />
        <ul className='hidden w-full justify-center gap-20 relative lg:flex '>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`relative  text-lg ${
                pathName === item.path ? 'active-link' : ''
              }`}
            >
              <Link
                className='flex justify-center items-center gap-1'
                href={item.path}
              >
                {' '}
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
          {activeDimensions && (
            <motion.div
              className='absolute h-1 bg-white -bottom-2 rounded-2xl'
              initial={false}
              animate={{
                left: activeDimensions.left,
                width: activeDimensions.width,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </ul>
        <h1 className='font-bold text-2xl lg:hidden'>
          {displayMobilePageName(pathName)}
        </h1>
        <button type='button' onClick={toggleMenu}>
          {' '}
          <MenuMobileIcon className='lg:hidden block' width='40' height='40' />
        </button>
        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-20'
            onClick={toggleMenu}
          ></div>
        )}
        <motion.div
          className={`fixed top-0 flex flex-col gap-10 rounded-l  ${
            isMenuOpen ? 'right-0' : '-right-full'
          } w-3/5 h-full min-w-48 bg-navbar shadow-lg z-30`}
          initial={{ right: '-100%' }}
          animate={{ right: isMenuOpen ? '0' : '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className='flex p-5 justify-end w-full'>
            {' '}
            <button onClick={toggleMenu}>
              <CloseIcon width='22' height='22' />
            </button>
          </div>
          <ul className='flex flex-col gap-14 font-bold items-center '>
            {menuItems.map((item) => (
              <li key={item.path} className='text-xl'>
                <Link
                  href={item.path}
                  onClick={toggleMenu}
                  className='flex items-center gap-2'
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}
