import Link from 'next/link';
import { GoHome } from 'react-icons/go';

export default function Header() {
  return (
    <header className='absolute left-0 top-0 p-6  bg-nav w-full drop-shadow-xl rounded-b-sm'>
      <nav className='flex items-center gap-8  md:rounded-b-md  font-medium   justify-between'>
        <Link
          href='/'
          className='text-blue-50 md:hover:text-blue-200 md:transition flex items-center gap-2 '
        >
          <GoHome className='text-xl' />
          Accueil
        </Link>
        <section className='flex gap-5'>
          <Link
            href='/sign-up'
            className='text-blue-50 md:hover:text-blue-200 md:transition'
          >
            Inscription
          </Link>
          <Link
            href='/sign-in'
            className='text-blue-50 md:hover:text-blue-200 md:transition'
          >
            Connexion
          </Link>
        </section>
      </nav>
    </header>
  );
}
