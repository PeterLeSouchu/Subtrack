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
import { useDeleteLimit, useGetProfileData } from './profile.service';
import Spinner from '@/src/components/Spinner';
import { useState } from 'react';
import ModalCreateLimit from './components/Modal-create-limit';
import { useConfirm } from '../../providers/Confirm-provider';
import { useToast } from '../../providers/Toast-provider';

export default function Profile() {
  const [openLimitModal, setOpenLimitModal] = useState(false);
  const { data, isLoading } = useGetProfileData();
  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const { mutate } = useDeleteLimit();

  async function handleDelete(categoryId: string, categoryName: string) {
    if (
      await confirm({
        title: categoryName,
        text: ' Etes-vous sur de vouloir supprimer la limite pour la catégorie suivante : ',
        confirmBtn: 'Supprimer',
      })
    ) {
      mutate(categoryId, {
        onSuccess: () => showToast('Limite supprimée', 'success'),
        onError: (error) => showToast(error?.response?.data?.message, 'error'),
      });
    }
  }

  if (isLoading) return <Spinner />;

  console.log('voila les data', data?.userData);
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
              Connecté avec : {data?.userData.email}
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
            <button
              onClick={() => setOpenLimitModal(true)}
              className='p-1 rounded-full border-blue border-2 transition  md:hover:bg-[#d8d6ed] '
            >
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
            {data?.userData && data?.userData.limits.length > 0 ? (
              <section className='w-full flex flex-col gap-6'>
                {data?.userData.limits.map((limit, index) => (
                  <article
                    className='drop-shadow-md bg-white rounded-2xl px-6 py-5 flex gap-3 items-center'
                    key={index}
                  >
                    <div className='w-1/2'>
                      {' '}
                      <span className='bg-[#E8E5FF]  text-blue w-fit font-semibold py-1 px-2 flex items-center gap-2 rounded-xl'>
                        <div className='w-7 h-7 overflow-hidden'>
                          <Image
                            width={28}
                            height={28}
                            className='object-contain'
                            src={limit.category.image}
                            alt='Icone catégorie'
                          />
                        </div>
                        <p className='font-extrabold text-sm sm:text-base'>
                          {limit.category.name}
                        </p>
                      </span>{' '}
                    </div>
                    <p className='sm:text-xl text-lg text-center font-bold break-words  flex items-center justify-center gap-2'>
                      <LockIcon width='20' height='20' /> {limit.price} €
                    </p>
                    <div className='flex flex-1 gap-2 items-center justify-end'>
                      <button
                        className='hover:bg-amber-100 transition p-1 rounded-full'
                        onClick={() => console.log('object')}
                      >
                        <EditIcon width='18' />
                      </button>
                      <button
                        className='hover:bg-red-200 transition p-1 rounded-full'
                        onClick={() =>
                          handleDelete(limit.categoryId, limit.category.name)
                        }
                      >
                        <TrashIcon width='20' />
                      </button>
                    </div>
                  </article>
                ))}
              </section>
            ) : (
              <div className='flex flex-col w-full items-center justify-center h-full mt-10'>
                <h2 className='text-xl font-semibold text-center '>
                  Vous n&apos;avez pas encore de limites budgétaires.
                </h2>
                <Image
                  className='w-32 mt-6'
                  src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1743004270/vmbkh2o0t1i71l9kne7y.png'
                  alt='icone chart'
                  width={200}
                  height={200}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalCreateLimit
        open={openLimitModal}
        onClose={() => setOpenLimitModal(false)}
      />
    </div>
  );
}
