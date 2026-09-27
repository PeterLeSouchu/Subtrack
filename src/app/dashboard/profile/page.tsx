'use client';

import { signOut } from 'next-auth/react';
import { Button } from '@/src/components/ui/button';
import { PageHeader } from '../components/Page-header';
import { CategoryIcon } from '../components/Category-chip';
import Image from 'next/image';
import {
  KeyRound,
  Lock,
  LogOut,
  PencilLine,
  Plus,
  ShieldAlert,
  Trash2,
} from 'lucide-react';
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
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-6 xl:p-10'>
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

      <div className='grid gap-4 md:gap-6 lg:grid-cols-5 lg:items-start'>
          <section className='overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink/5 lg:col-span-2'>
            <div className='relative isolate overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 px-5 pb-5 pt-6 md:px-6'>
              <span className='absolute -right-10 -top-12 -z-10 h-36 w-36 rounded-full bg-white/10' />
              <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl font-semibold uppercase text-white ring-1 ring-inset ring-white/25'>
                {data?.userData.email?.charAt(0)}
              </span>
              <p className='mt-4 text-xs text-brand-100'>Connecté avec</p>
              <p className='truncate font-semibold text-white'>
                {data?.userData.email}
              </p>
            </div>
            <div className='flex flex-col divide-y divide-line'>
              {!data?.userData.hasAccount && (
                <div className='flex items-center justify-between gap-3 px-5 py-4 md:px-6'>
                  <div className='flex items-center gap-3'>
                    <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-stattext ring-1 ring-inset ring-ink/5'>
                      <KeyRound className='h-4 w-4' />
                    </span>
                    <p className='text-sm font-medium text-ink'>Mot de passe</p>
                  </div>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => setEditPasswordModal(true)}
                  >
                    Modifier
                  </Button>
                </div>
              )}
              <div className='flex items-center justify-between gap-3 px-5 py-4 md:px-6'>
                <div className='flex items-center gap-3'>
                  <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-stattext ring-1 ring-inset ring-ink/5'>
                    <LogOut className='h-4 w-4' />
                  </span>
                  <p className='text-sm font-medium text-ink'>Session</p>
                </div>
                <Button variant='outline' size='sm' onClick={() => signOut()}>
                  Se déconnecter
                </Button>
              </div>
            </div>
          </section>


        <section className='overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink/5 lg:col-span-3 lg:row-span-2'>
          <div className='flex items-start justify-between gap-4 px-5 py-5 md:px-6'>
            <div>
              <h2 className='text-base font-semibold tracking-tight text-ink'>
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
              <Plus />
              <span className='hidden sm:inline'>Ajouter</span>
            </Button>
          </div>
          {data?.userData && data?.userData.limits.length > 0 ? (
            <ul className='divide-y divide-line border-t border-line'>
              {data?.userData.limits.map((limit, index) => (
                <li
                  className='group flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-brand-50/40 md:px-6'
                  key={index}
                >
                  <CategoryIcon image={limit.category.image} />
                  <div className='min-w-0 flex-1'>
                    <p className='truncate font-medium text-ink'>
                      {limit.category.name}
                    </p>
                    <p className='hidden text-xs text-stattext sm:block'>Plafond mensuel</p>
                  </div>
                  <p className='flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 font-semibold sm:px-2.5 text-ink ring-1 ring-inset ring-ink/5'>
                    <Lock className='h-3.5 w-3.5 text-stattext' />
                    {limit.price} €
                  </p>
                  <div className='flex items-center gap-0.5'>
                    <button
                      className='rounded-lg p-2 text-stattext transition-colors hover:bg-brand-50 hover:text-brand-700'
                      aria-label={`Modifier la limite ${limit.category.name}`}
                      onClick={() => handleEditLimit(limit)}
                    >
                      <PencilLine className='h-4 w-4' />
                    </button>
                    <button
                      className='rounded-lg p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600'
                      aria-label={`Supprimer la limite ${limit.category.name}`}
                      onClick={() =>
                        handleDeleteLimit(limit.categoryId, limit.category.name)
                      }
                    >
                      <Trash2 className='h-4 w-4' />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='flex flex-col items-center justify-center gap-3 border-t border-line px-4 py-14 text-center'>
              <span className='flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100'>
                <Image
                  className='w-9'
                  src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1743004270/vmbkh2o0t1i71l9kne7y.png'
                  alt=''
                  width={200}
                  height={200}
                />
              </span>
              <h3 className='text-base font-semibold tracking-normal text-ink'>
                Vous n&apos;avez pas encore de limites budgétaires.
              </h3>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setOpenCreateLimitModal(true)}
              >
                <Plus />
                Ajouter une limite
              </Button>
            </div>
          )}
        </section>

          <section className='rounded-2xl bg-white p-5 shadow-soft ring-1 ring-red-100 md:p-6 lg:col-span-2'>
            <div className='flex items-start gap-3'>
              <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-inset ring-red-100'>
                <ShieldAlert className='h-4 w-4' />
              </span>
              <div>
                <h2 className='text-base font-semibold tracking-tight text-ink'>
                  Zone sensible
                </h2>
                <p className='mt-1 text-sm text-stattext'>
                  La suppression de votre compte efface toutes vos données.
                </p>
              </div>
            </div>
            <Button
              variant='outline'
              className='mt-4 w-full text-red-600 ring-red-200 hover:bg-red-50 hover:text-red-700'
              onClick={() => {
                if (data?.userData.hasAccount) {
                  setDeleteGoogleAccountModal(true);
                } else {
                  setDeleteAccountModal(true);
                }
              }}
            >
              <Trash2 />
              Supprimer son compte
            </Button>
          </section>
      </div>
    </div>
  );
}
