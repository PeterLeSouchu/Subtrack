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

  console.log('voila les stats', stats);

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
    <div className='flex   h-full    '>
      <div className='xl:w-2/3 w-full h-full flex overflow-y-scroll  flex-col'>
        <div className=''>
          {' '}
          <StatsHeader statsData={stats?.stats} />
        </div>
        <div className='flex items-center justify-center space-x-2 xl:hidden pt-4 '>
          <Switch
            onCheckedChange={() => setShowGraphic((value) => !value)}
            id='airplane-mode'
          />

          <Label htmlFor='airplane-mode'>Voir graphique</Label>
        </div>{' '}
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
      </div>

      <ChartDesktop statsCategories={stats?.statsCategory} />

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
