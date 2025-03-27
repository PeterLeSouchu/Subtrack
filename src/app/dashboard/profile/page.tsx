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
import ModalEditLimit from './components/Modal-edit-limit';
import { Limit } from '@/src/types/category';
import ModalEditPassword from './components/Modal-edit-password';

import ModalDeleteGoogleAccount from './components/Modal-delete-google-account';
import ModalDeleteAccount from './components/Modal-test-account';

export default function Profile() {
  const [openCreateLimitModal, setOpenCreateLimitModal] = useState(false);
  const [openEditLimitModal, setOpenEditLimitModal] = useState(false);
  const [editPasswordModal, setEditPasswordModal] = useState(false);
  const [deleteAccountModal, setDeleteAccountModal] = useState(false);
  const [deleteGoogleAccountModal, setDeleteGoogleAccountModal] =
    useState(false);
  const [limitToEdit, setLimitToEdit] = useState<Limit | undefined>();
  const { data, isLoading } = useGetProfileData();
  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const { mutate } = useDeleteLimit();

  console.log('object');

  async function handleDeleteLimit(categoryId: string, categoryName: string) {
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

  function handleEditLimit(limit: Limit) {
    setLimitToEdit(limit);
    setOpenEditLimitModal(true);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className='py-3 md:px-0 px-4 flex justify-center overflow-y-scroll h-full'>
      <div className='max-w-4xl md:w-2/3 w-full flex flex-col gap-20 '>
        <ModalCreateLimit
          open={openCreateLimitModal}
          onClose={() => setOpenCreateLimitModal(false)}
        />
        <ModalEditPassword
          open={editPasswordModal}
          onClose={() => setEditPasswordModal(false)}
        />

        <ModalDeleteAccount
          open={deleteAccountModal}
          onClose={() => setDeleteAccountModal(false)}
        />
        <ModalDeleteGoogleAccount
          open={deleteGoogleAccountModal}
          onClose={() => setDeleteGoogleAccountModal(false)}
        />

        {limitToEdit && (
          <ModalEditLimit
            open={openEditLimitModal}
            onClose={() => setOpenEditLimitModal(false)}
            limitToEdit={limitToEdit}
            setLimitToEdit={setLimitToEdit}
          />
        )}
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
              onClick={() => {
                if (data?.userData.hasAccount) {
                  setDeleteGoogleAccountModal(true);
                } else {
                  setDeleteAccountModal(true);
                }
              }}
            >
              Supprimer son compte
            </button>
            {!data?.userData.hasAccount && (
              <button
                className='text-white bg-[#FA964A] rounded-md px-3 py-2 font-bold md:hover:bg-[#FD8225] transition'
                onClick={() => setEditPasswordModal(true)}
              >
                Modifier son mot de passe
              </button>
            )}
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
              onClick={() => setOpenCreateLimitModal(true)}
              className='p-1 rounded-full border-blue border-2 transition md:mr-0 mr-4  md:hover:bg-[#d8d6ed] '
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
                        onClick={() => handleEditLimit(limit)}
                      >
                        <EditIcon width='18' />
                      </button>
                      <button
                        className='hover:bg-red-200 transition p-1 rounded-full'
                        onClick={() =>
                          handleDeleteLimit(
                            limit.categoryId,
                            limit.category.name
                          )
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
    </div>
  );
}
