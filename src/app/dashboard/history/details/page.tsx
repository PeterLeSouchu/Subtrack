'use client';

import { useState } from 'react';
import { Switch } from '@/src/components/ui/switch';
import { Label } from '@/src/components/ui/label';
import { useGetCategory } from '../../dashboard.service';
import Spinner from '@/src/components/Spinner';
import { StatsHeader } from '../../components/Stats-header';
import { ChartDesktop, ChartMobile } from '../../components/Charts';
import { TableMensuality } from '../../components/Tables';
import { useSearchParams } from 'next/navigation';
import {
  useGetHistoryMensuality,
  useGetHistoryStats,
} from '../history.service';
import { filtered } from '@/src/utils/filtered';
import { PageHeader } from '../../components/Page-header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function HistoryDetail() {
  const searchParams = useSearchParams();

  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const {
    data: historyStats,
    error: historyStatsError,
    isLoading: historyStatsLoading,
  } = useGetHistoryStats({ year: Number(year), month });

  const {
    data: historyMensualities,
    error: historyMensualityError,
    isLoading: historyMensualitiesLoading,
  } = useGetHistoryMensuality({ year: Number(year), month });

  const [showGraphic, setShowGraphic] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const {
    data: categories,
    error: categoryError,
    isLoading: categoriesLoading,
  } = useGetCategory();

  const filteredMensualities = filtered(
    historyMensualities?.mensualities,
    searchValue,
    selectedCategory
  );

  if (historyMensualitiesLoading || categoriesLoading || historyStatsLoading)
    return <Spinner />;

  if (
    historyStatsError ||
    historyMensualityError ||
    categoryError ||
    historyMensualities?.mensualities.length === 0
  ) {
    return (
      <div className='mx-auto flex h-full max-w-md items-center justify-center p-6 text-center'>
        <p className='text-stattext'>
          Il semblerait qu&apos;il n&apos;y ait pas d&apos;historique pour cette
          date là !
        </p>
      </div>
    );
  }

  return (
    <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-6 p-4 md:p-6 xl:p-8'>
      <div>
        <Link
          href='/dashboard/history'
          className='mb-3 inline-flex items-center gap-1 text-sm font-medium text-stattext transition-colors hover:text-brand-700'
        >
          <ArrowLeft className='h-4 w-4' />
          Historique
        </Link>
        <PageHeader
          title={`${month ?? ''} ${year ?? ''}`.trim()}
          description='Détail des mensualités de cette période.'
        />
      </div>
      <StatsHeader statsData={historyStats?.stats} isHistory={true} />
      <div className='flex items-center gap-3 xl:hidden'>
        <Switch
          onCheckedChange={() => setShowGraphic((value) => !value)}
          id='airplane-mode'
        />
        <Label htmlFor='airplane-mode'>Voir graphique</Label>
      </div>
      <div className='flex flex-col gap-6 xl:flex-row xl:items-start'>
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
          statsCategories={historyStats?.statsCategory}
        />
        <ChartDesktop statsCategories={historyStats?.statsCategory} />
      </div>
    </div>
  );
}
