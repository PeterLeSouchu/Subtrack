'use client';

import { ReactNode, useState } from 'react';
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
    icon: DashboardIcon,
  },
  {
    name: 'Historique',
    path: '/dashboard/history',
    icon: BookIcon,
  },
  {
    name: 'Bilan',
    path: '/dashboard/result',
    icon: StonkIcon,
  },
  {
    name: 'Profil',
    path: '/dashboard/profile',
    icon: ProfileIcon,
  },
];

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <div className='w-full flex flex-col h-screen bg-dashboardbg'>
          <NavBar />
          <main className='flex-1 h-full overflow-hidden'>{children}</main>
        </div>
      </ConfirmProvider>
    </ToastProvider>
  );
}

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function displayMobilePageName(pathName: string) {
    const currentItem = menuItems.find((item) => item.path === pathName);
    return currentItem ? currentItem.name : '';
  }

  return (
    <header className='w-full p-3'>
      <nav className='w-full flex items-center rounded-xl bg-gradient-to-r from-[#4670DB] to-[#3A5BA8] text-white font-semibold justify-between lg:justify-center px-4  relative shadow-md'>
        <Image
          src='/logowhite.png'
          className='w-10'
          width={100}
          height={100}
          alt='logo'
        />

        <ul className='hidden w-full justify-center gap-20 relative lg:flex'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.name === 'Historique'
                ? pathName === item.path || pathName.startsWith(`${item.path}/`)
                : pathName === item.path;

            return (
              <li key={item.path} className='relative text-lg'>
                <Link
                  className={`flex justify-center items-center gap-1 px-4 py-1 rounded-xl transition-all ${
                    isActive ? 'bg-white text-navbar' : 'hover:bg-blue'
                  }`}
                  href={item.path}
                >
                  <Icon
                    width={item.name === 'Dashboard' ? '15' : '18'}
                    height={item.name === 'Dashboard' ? '15' : '18'}
                    className={isActive ? 'text-navbar' : 'text-white'}
                  />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <h1 className='font-bold text-2xl lg:hidden'>
          {displayMobilePageName(pathName)}
        </h1>

        <button type='button' onClick={toggleMenu}>
          <MenuMobileIcon className='lg:hidden block' width='40' height='40' />
        </button>

        {isMenuOpen && (
          <div
            className='fixed inset-0 bg-black bg-opacity-50 z-20'
            onClick={toggleMenu}
          ></div>
        )}

        <motion.div
          className={`fixed md:hidden top-0 flex flex-col gap-10 rounded-l ${
            isMenuOpen ? 'right-0' : '-right-full'
          } w-3/5 h-full min-w-48 bg-navbar shadow-lg z-30`}
          initial={{ right: '-100%' }}
          animate={{ right: isMenuOpen ? '0' : '-100%' }}
          exit={{ right: '-100%' }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <div className='flex p-5 justify-end w-full'>
            <button onClick={toggleMenu}>
              <CloseIcon width='22' height='22' />
            </button>
          </div>
          <ul className='flex flex-col gap-14 font-bold items-center'>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathName === item.path;

              return (
                <li key={item.path} className='text-xl'>
                  <Link
                    href={item.path}
                    onClick={toggleMenu}
                    className='flex items-center gap-2'
                  >
                    <Icon
                      width='22'
                      height='22'
                      className={isActive ? 'text-blue-500' : 'text-white'}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </nav>
    </header>
  );
}
