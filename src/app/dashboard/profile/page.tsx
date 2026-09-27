'use client';

import { signOut } from 'next-auth/react';
import {
  AddIcon,
  TrashIcon,
  EditIcon,
} from '@/src/components/icons';
import { Button } from '@/src/components/ui/button';
import { PageHeader } from '../components/Page-header';
import { CategoryChip } from '../components/Category-chip';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
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
import ModalDeleteAccount from './components/Modal-account-delete';

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
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-8 p-4 md:p-6 xl:p-8'>
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

      <PageHeader title='Profil' description='Votre compte et vos limites.' />

      <section className='overflow-hidden rounded-2xl border border-line bg-white shadow-card'>
        <div className='border-b border-line px-5 py-4 md:px-6'>
          <h2 className='text-lg font-semibold text-ink'>
            Informations personelles
          </h2>
        </div>
        <div className='flex flex-col divide-y divide-line'>
          <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-6'>
            <p className='text-stattext'>Connecté avec</p>
            <p className='font-semibold text-ink'>{data?.userData.email}</p>
          </div>
          {!data?.userData.hasAccount && (
            <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-6'>
              <p className='text-stattext'>Mot de passe</p>
              <Button variant='outline' onClick={() => setEditPasswordModal(true)}>
                Modifier son mot de passe
              </Button>
            </div>
          )}
          <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-6'>
            <p className='text-stattext'>Session</p>
            <Button variant='outline' onClick={() => signOut()}>
              <LogOut />
              Se déconnecter
            </Button>
          </div>
          <div className='flex flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-6'>
            <p className='text-stattext'>Zone sensible</p>
            <Button
              variant='outline'
              className='border-red-200 text-red-600 hover:bg-red-50'
              onClick={() => {
                if (data?.userData.hasAccount) {
                  setDeleteGoogleAccountModal(true);
                } else {
                  setDeleteAccountModal(true);
                }
              }}
            >
              Supprimer son compte
            </Button>
          </div>
        </div>
      </section>

      <section className='overflow-hidden rounded-2xl border border-line bg-white shadow-card'>
        <div className='flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6'>
          <div>
            <h2 className='text-lg font-semibold text-ink'>
              Limites budgétaires
            </h2>
            <p className='mt-1 max-w-md text-sm text-stattext'>
              Plafonnez vos mensualités par catégorie. Elles s&apos;affichent
              ici, vous pouvez les modifier ou les supprimer à tout moment.
            </p>
          </div>
          <Button
            onClick={() => setOpenCreateLimitModal(true)}
            aria-label='Ajouter une limite'
            className='shrink-0'
          >
            <AddIcon width='14' height='14' />
            <span className='hidden sm:inline'>Ajouter</span>
          </Button>
        </div>
        {data?.userData && data?.userData.limits.length > 0 ? (
          <ul className='divide-y divide-line'>
            {data?.userData.limits.map((limit, index) => (
              <li
                className='flex items-center gap-3 px-5 py-3.5 md:px-6'
                key={index}
              >
                <div className='flex-1'>
                  <CategoryChip
                    name={limit.category.name}
                    image={limit.category.image}
                  />
                </div>
                <p className='flex items-center gap-2 font-display text-lg font-semibold tabular-nums text-ink'>
                  <LockIcon width='16' height='16' className='text-stattext' />
                  {limit.price} €
                </p>
                <div className='flex items-center gap-1'>
                  <button
                    className='rounded-md p-2 text-stattext transition-colors hover:bg-brand-50 hover:text-brand-700'
                    aria-label={`Modifier la limite ${limit.category.name}`}
                    onClick={() => handleEditLimit(limit)}
                  >
                    <EditIcon width='16' height='16' />
                  </button>
                  <button
                    className='rounded-md p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600'
                    aria-label={`Supprimer la limite ${limit.category.name}`}
                    onClick={() =>
                      handleDeleteLimit(limit.categoryId, limit.category.name)
                    }
                  >
                    <TrashIcon width='16' height='16' />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='flex flex-col items-center justify-center gap-3 px-4 py-14 text-center'>
            <Image
              className='w-24'
              src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1743004270/vmbkh2o0t1i71l9kne7y.png'
              alt=''
              width={200}
              height={200}
            />
            <h3 className='font-sans text-base font-medium tracking-normal text-ink'>
              Vous n&apos;avez pas encore de limites budgétaires.
            </h3>
          </div>
        )}
      </section>
    </div>
  );
}
