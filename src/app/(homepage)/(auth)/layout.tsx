import Image from 'next/image';

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
      <section className='w-full min-h-screen bg-white'>{children}</section>
    </div>
  );
}
