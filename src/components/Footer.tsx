import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='md:min-h-28   pb-10  flex items-center justify-evenly flex-col md:flex-row text-colorone md:gap-0 gap-6'>
      {' '}
      <Link
        href='mailto:p.lesouchu@gmail.com'
        className='underline  md:hover:text-blue-950 md:transition'
      >
        Contactez-nous
      </Link>
      <Link
        href='/legal-notices'
        className=' md:hover:text-blue-950 md:transition'
      >
        Mentions légales
      </Link>
      <Link href='/cgu' className=' md:hover:text-blue-950 md:transition'>
        Conditions générales d&apos;utilisation
      </Link>
    </footer>
  );
}
