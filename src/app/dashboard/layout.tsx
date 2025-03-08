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
    <div className='p-3 w-full min-h-screen '>
      <header className='w-full rounded-xl bg-navbar text-white font-semibold '>
        <NavBar />
      </header>
      {children}
    </div>
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
    <nav className='w-full flex items-center justify-between lg:justify-center px-2 relative'>
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
            className={`relative flex justify-center items-center gap-1 text-lg ${
              pathName === item.path ? 'active-link' : ''
            }`}
          >
            {item.icon}
            <Link href={item.path}>{item.name}</Link>
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
  );
}
