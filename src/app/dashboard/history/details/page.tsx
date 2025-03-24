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
  useGetDate,
  useGetHistoryMensuality,
  useGetHistoryStats,
} from '../history.service';
import { filtered } from '@/src/utils/filtered';

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

  const { data: date, error: dateError, isLoading: dateLoading } = useGetDate();
  console.log('voila les dates', date);

  const filteredMensualities = filtered(
    historyMensualities?.mensualities,
    searchValue,
    selectedCategory
  );

  if (
    historyMensualitiesLoading ||
    categoriesLoading ||
    historyStatsLoading ||
    dateLoading
  )
    return <Spinner />;

  if (
    historyStatsError ||
    historyMensualityError ||
    categoryError ||
    dateError
  ) {
    return (
      <div className='flex justify-center items-center h-full'>
        <p>
          Il semblerait qu&apos;il n&apos;y ait pas d&apos;historique pour cette
          date là !
        </p>
      </div>
    );
  }

  console.log('mensualité historique', historyMensualities);

  return (
    <div className='flex   h-full    '>
      <div className='xl:w-2/3 w-full h-full flex overflow-y-scroll  flex-col'>
        <div className=''>
          {' '}
          <StatsHeader statsData={historyStats?.stats} isHistory={true} />
        </div>
        <div className='hidden xl:flex  justify-center  mt-1 '>
          <span className='px-4 py-1   bg-blue  text-white rounded-md text-lg font-extrabold'>
            {month} {year}
          </span>
        </div>
        <div className='flex items-center justify-center xl:hidden pt-4 gap-2 '>
          <div className='flex items-center justify-center space-x-2'>
            {' '}
            <Switch
              onCheckedChange={() => setShowGraphic((value) => !value)}
              id='airplane-mode'
            />
            <Label htmlFor='airplane-mode'>Voir graphique</Label>
          </div>
          <span className='px-4 py-1  sm:text-base text-sm   bg-blue  text-white rounded-md font-extrabold'>
            {month} {year}
          </span>
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
          statsCategories={historyStats?.statsCategory}
        />
      </div>

      <ChartDesktop statsCategories={historyStats?.statsCategory} />
    </div>
  );
}
