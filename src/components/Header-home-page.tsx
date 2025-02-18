'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function HeaderHomePage() {
  const pathName = usePathname();

  if (pathName === '/sign-in' || pathName === '/sign-up') {
    return null;
  }

  return (
    <header className=' px-6     w-full drop-shadow-xl rounded-b-sm'>
      <nav className='flex items-center gap-8  md:rounded-b-md  font-medium   justify-between'>
        <Link
          href='/'
          className='text-blue-950 -mx-8 font-black  flex items-center gap-2 '
        >
          <Image
            src='/logo.png'
            alt='logo'
            className='w-24 '
            width={200}
            height={200}
          />
          <p className='-mx-6 md:text-2xl sm:text-xl  text-base'> Subtrack</p>
        </Link>
        <section className='flex sm:gap-5 gap-2'>
          <Link
            href='/sign-up'
            className='text-blue-950 md:text-lg  sm:text-base text-sm  font-bold md:hover:text-icon md:transition'
          >
            Inscription
          </Link>
          <Link
            href='/sign-in'
            className='text-blue-950 md:text-lg  sm:text-base  text-sm font-bold md:hover:text-icon md:transition'
          >
            Connexion
          </Link>
        </section>
      </nav>
    </header>
  );
}
