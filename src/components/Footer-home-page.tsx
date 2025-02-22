'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FooterHomePage() {
  const pathName = usePathname();

  if (pathName === '/sign-in' || pathName === '/sign-up') {
    return null;
  }
  return (
    <footer className='md:min-h-28 pt-28   pb-10  flex items-center justify-evenly flex-col md:flex-row text-blue md:gap-0 gap-6'>
      {' '}
      <Link
        href='mailto:p.lesouchu@gmail.com'
        className='underline  md:hover:text-blue-950 font-semibold md:transition'
      >
        Contactez-nous
      </Link>
      <Link
        href='/legal-notices'
        className=' md:hover:text-blue-950 font-semibold md:transition'
      >
        Mentions légales
      </Link>
      <Link
        href='/cgu'
        className=' md:hover:text-blue-950 font-semibold md:transition'
      >
        Conditions générales d&apos;utilisation
      </Link>
    </footer>
  );
}
