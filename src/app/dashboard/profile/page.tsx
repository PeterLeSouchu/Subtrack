'use client';

import { signOut } from 'next-auth/react';
import {
  LogoutIcon,
  AddIcon,
  TrashIcon,
  EditIcon,
} from '@/src/components/icons';
import Image from 'next/image';
import { LockIcon } from '@/src/components/icons';

export default function Profile() {
  return (
    <div className='py-3 md:px-0 px-4 flex justify-center overflow-y-scroll h-full'>
      <div className='max-w-4xl md:w-2/3 w-full flex flex-col gap-20 '>
        {' '}
        <div>
          <h2 className='text-2xl font-bold text-blue pb-2 mb-6 border-b-1 border-blue'>
            Informations personelles
          </h2>
          <div className='flex flex-col items-start gap-4'>
            <p className='text-slate-500'>
              Connecté en tant que : peter22510@gmail.com
            </p>
            <button
              className='text-white bg-[#F63F42] rounded-md px-3 py-2 font-bold md:hover:bg-[#F31418] transition'
              onClick={() => console.log('supprimer son compte')}
            >
              Supprimer son compte
            </button>
            <button
              className='text-white bg-[#FA964A] rounded-md px-3 py-2 font-bold md:hover:bg-[#FD8225] transition'
              onClick={() => console.log('modifier son mot de passe')}
            >
              Modifier son mot de passe
            </button>
            <button
              className='text-white md:hover:bg-[#202022] bg-[#343438] rounded-md px-3 py-2 font-bold flex items-center gap-1  transition'
              onClick={() => signOut()}
            >
              <LogoutIcon width='20' height='20' />
              Se déconnecter
            </button>
          </div>
        </div>
        <div>
          <section className=' flex justify-between items-center border-b-1 border-blue pb-2 mb-6'>
            <h2 className='text-2xl font-bold text-blue  '>
              Limites budgétaires
            </h2>
            <button className='p-1 rounded-full border-blue border-2 transition  md:hover:bg-[#d8d6ed] '>
              {' '}
              <AddIcon width='20' height='20' className=' text-blue ' />
            </button>
          </section>
          <div className='flex flex-col items-start gap-4 w-full pb-10'>
            <p className='text-slate-500'>
              En appuyant sur le bouton “plus”, vous avez la possibilité de
              limiter vos mensualités selon une catégorie. Ces dernières
              s’afficheront ici, vous pourrez les modifier ou les supprimer
              comme bon vous semble.
            </p>
            <section className='w-full flex flex-col gap-6'>
              <article
                className='drop-shadow-md bg-white rounded-2xl px-6 py-5 flex gap-3 items-center'
                key={Math.random()}
              >
                <span className='bg-[#E8E5FF] text-blue font-semibold py-1 px-2 flex items-center gap-2 rounded-xl'>
                  <div className='w-7 h-7 overflow-hidden'>
                    <Image
                      width={28}
                      height={28}
                      className='object-contain'
                      src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742669730/gt93ijd8pwhhtnq5rxcc.webp'
                      alt='Icone catégorie'
                    />
                  </div>
                  <p className='font-extrabold text-sm sm:text-base'>
                    Alimentation
                  </p>
                </span>

                <p className='sm:text-xl text-lg text-center font-bold break-words w-full flex items-center justify-center gap-2'>
                  <LockIcon width='20' height='20' /> 12 €
                </p>

                <div className='flex gap-2 items-center'>
                  <button
                    className='hover:bg-amber-100 transition p-1 rounded-full'
                    onClick={() => console.log('object')}
                  >
                    <EditIcon width='18' />
                  </button>
                  <button
                    className='hover:bg-red-200 transition p-1 rounded-full'
                    onClick={() => console.log('object')}
                  >
                    <TrashIcon width='20' />
                  </button>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
