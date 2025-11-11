'use client';
import { signIn } from 'next-auth/react';
import { GoogleIcon } from '@/src/components/icons/google-icon';

export default function GoogleButton({
  auth,
}: {
  auth: 'Se connecter' | "S'inscrire";
}) {
  return (
    <button
      type='button'
      onClick={() => signIn('google', { redirectTo: '/dashboard' })}
      className=' bg-white py-2 px-4 w-full  text-blue hover:bg-slate-100 rounded-full flex justify-center items-center border shadow-sm mx-auto font-bold gap-2'
    >
      <GoogleIcon className=' ' />
      <p className='flex-grow'> {auth} avec Google</p>
    </button>
  );
}
