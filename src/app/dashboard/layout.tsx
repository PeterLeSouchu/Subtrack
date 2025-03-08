'use client';

import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  DashboardIcon,
  BookIcon,
  BilanIcon,
  ProfileIcon,
} from '@/src/components/icons';

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  const [activeDimensions, setActiveDimensions] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon width='13' height='13' />,
    },
    {
      name: 'Historique',
      path: '/dashboard/historique',
      icon: <BookIcon width='18' height='18' />,
    },
    {
      name: 'Bilan',
      path: '/dashboard/bilan',
      icon: <BilanIcon width='18' height='18' />,
    },
    {
      name: 'Profil',
      path: '/dashboard/profile',
      icon: <ProfileIcon width='22' height='22' />,
    },
  ];

  useEffect(() => {
    const activeLink = document.querySelector('.active-link');

    if (activeLink) {
      const { offsetLeft, offsetWidth } = activeLink as HTMLElement;
      setActiveDimensions({ left: offsetLeft, width: offsetWidth });
    }
  }, [pathName]); // Met à jour l'animation lors du changement de page

  return (
    <main className='p-3 w-full min-h-screen'>
      <header className='w-full rounded-xl bg-navbar text-white font-semibold border'>
        <nav className='w-full flex items-center px-2 relative'>
          <Image
            src='/logowhite.png'
            className='w-10'
            width={100}
            height={100}
            alt='logo'
          />
          <ul className='flex w-full justify-center gap-20 relative'>
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`relative flex justify-center items-center gap-1 ${
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
        </nav>
      </header>
      {children}
    </main>
  );
}
