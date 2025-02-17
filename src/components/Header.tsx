import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className=' px-6     w-full drop-shadow-xl rounded-b-sm'>
      <nav className='flex items-center gap-8  md:rounded-b-md  font-medium   justify-between'>
        <Link
          href='/'
          className='text-blue-950 md:text-2xl text-xl -mx-8 font-black  flex items-center gap-2 '
        >
          <Image
            src='/logo.png'
            alt='logo'
            className='w-24 '
            width={200}
            height={200}
          />
          Subtrack
        </Link>
        <section className='flex gap-5'>
          <Link
            href='/sign-up'
            className='text-blue-950 md:text-lg  text-base font-black md:hover:text-blue-700 md:transition'
          >
            Inscription
          </Link>
          <Link
            href='/sign-in'
            className='text-blue-950 md:text-lg  text-base font-black md:hover:text-blue-700 md:transition'
          >
            Connexion
          </Link>
        </section>
      </nav>
    </header>
  );
}
