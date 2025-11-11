import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-5xl font-bold text-gray-800'>404</h1>
      <p className='text-xl text-gray-600 mt-4'>
        Oups ! Vous vous êtes perdus.
      </p>
      <Link
        href='/'
        className='mt-6 px-4 py-2 text-white rounded-lg bg-brand-600 transition hover:bg-brand-700'
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
