'use client';

import { useState } from 'react';
import { Switch } from '@/src/components/ui/switch';
import { Label } from '@/src/components/ui/label';

import { useConfirm } from '../providers/Confirm-provider';
import ModalCreateMensuality from './components/Modal-create-mensuality';
import ModalEditMensuality from './components/Modal-edit-mensuality';
import {
  useDeleteMensuality,
  useGetCategory,
  useGetMensuality,
  useGetStats,
} from './dashboard.service';
import { MensualityGetType } from '@/src/types/mensuality';
import Spinner from '@/src/components/Spinner';
import { useToast } from '../providers/Toast-provider';
import { StatsHeader } from './components/Stats-header';
import { PageHeader } from './components/Page-header';
import { ChartDesktop, ChartMobile } from './components/Charts';
import { TableMensuality } from './components/Tables';
import { filtered } from '@/src/utils/filtered';

export default function Dashboard() {
  const [showGraphic, setShowGraphic] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mensualityToEdit, setMensualityToEdit] = useState<
    MensualityGetType | undefined
  >();
  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const { data: mensualities, isLoading: mensualitiesLoading } =
    useGetMensuality();
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { mutate } = useDeleteMensuality();

  const filteredMensualities = filtered(
    mensualities?.mensualities,
    searchValue,
    selectedCategory
  );

  if (mensualitiesLoading || categoriesLoading || statsLoading)
    return <Spinner />;

  async function handleDelete(mensuality: MensualityGetType) {
    if (
      await confirm({
        title: mensuality.name,
        text: ' Etes-vous sur de vouloir supprimer la mensualité suivante : ',
        confirmBtn: 'Supprimer',
      })
    ) {
      mutate(mensuality.id, {
        onSuccess: () => showToast('Mensualité supprimée', 'success'),
        onError: (error) => showToast(error?.response?.data?.message, 'error'),
      });
    }
  }

  function handleEditMensuality(mensuality: MensualityGetType) {
    setMensualityToEdit(mensuality);
    setOpenEditModal(true);
  }

  return (
    <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-6 p-4 md:p-6 xl:p-8'>
      <PageHeader
        title='Tableau de bord'
        description='Vos mensualités du mois en cours.'
      />
      <StatsHeader statsData={stats?.stats} />
      <div className='flex items-center gap-3 xl:hidden'>
        <Switch
          onCheckedChange={() => setShowGraphic((value) => !value)}
          id='airplane-mode'
        />
        <Label htmlFor='airplane-mode'>Voir graphique</Label>
      </div>
      <div className='flex flex-col gap-6 xl:flex-row xl:items-start'>
        <TableMensuality
          handleDelete={handleDelete}
          setOpenCreateModal={setOpenCreateModal}
          editMensuality={handleEditMensuality}
          mensualitiesData={filteredMensualities}
          categoriesData={categories?.categories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCategory={setSelectedCategory}
          showGraphic={showGraphic}
        />
        <ChartMobile
          showGraphic={showGraphic}
          statsCategories={stats?.statsCategory}
        />
        <ChartDesktop statsCategories={stats?.statsCategory} />
      </div>

      <ModalCreateMensuality
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      {mensualityToEdit && (
        <ModalEditMensuality
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          mensualityToEdit={mensualityToEdit}
          setMensualityToEdit={setMensualityToEdit}
        />
      )}
    </div>
  );
}
