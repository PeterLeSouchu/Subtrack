'use client';

import { useState } from 'react';
import { Switch } from '@/src/components/ui/switch';
import { Label } from '@/src/components/ui/label';
import {
  useGetCategory,
  useGetMensuality,
  useGetStats,
} from '../../dashboard.service';
import Spinner from '@/src/components/Spinner';
import { StatsHeader } from '../../components/Stats-header';
import { ChartDesktop, ChartMobile } from '../../components/Charts';
import { TableMensuality } from '../../components/Tables';

export default function HistoryDetail() {
  const [showGraphic, setShowGraphic] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: mensualities, isLoading: mensualitiesLoading } =
    useGetMensuality();
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: stats, isLoading: statsLoading } = useGetStats();

  const filteredMensualities = mensualities?.mensualities.filter(
    (mensuality) =>
      (selectedCategory === 'all' ||
        mensuality.category.id === selectedCategory) &&
      (mensuality.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(
          searchValue
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
        ) ||
        mensuality.price.toString().includes(searchValue) ||
        mensuality.category.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(
            searchValue
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
          ))
  );

  if (mensualitiesLoading || categoriesLoading || statsLoading)
    return <Spinner />;

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
    </div>
  );
}
