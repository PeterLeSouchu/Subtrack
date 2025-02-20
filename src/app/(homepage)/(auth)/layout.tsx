import Image from 'next/image';
import Link from 'next/link';

export default function AuthHomePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='w-full min-h-screen  flex'>
      <section className=' hidden lg:flex justify-center items-center flex-col w-full min-h-screen '>
        <Image
          src='/logo.png'
          width={300}
          height={300}
          alt='logo-subtrack'
          className=''
        />
        <h1 className='text-6xl font-black'>Subtrack</h1>
      </section>
      <section className='w-full min-h-screen lg:bg-white relative'>
        <Link
          href='/'
          className='absolute top-8  left-10 lg:left-auto   lg:right-10 font-extrabold text-lg transition lg:hover:text-icon '
        >
          Accueil
        </Link>
        <div className='w-full h-full  flex justify-center items-center  '>
          {' '}
          {children}
        </div>
      </section>
    </div>
  );
}
