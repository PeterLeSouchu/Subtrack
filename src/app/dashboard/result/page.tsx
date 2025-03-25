'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useGetYearDate, useGetYearStats } from './result.service';
import Spinner from '@/src/components/Spinner';
import { useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Ventes mensuelles',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Bar data={data} options={options} />;
};

export default function Bilan() {
  const [selectedYear, setSelectedYear] = useState('');
  const { data: yearData, isLoading: yearLoading } = useGetYearDate();
  const { data: yearStatsData, isLoading: yearStatsLoading } = useGetYearStats({
    year: Number(selectedYear),
  });

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  if (yearLoading || yearStatsLoading) return <Spinner />;

  return (
    <div className='h-full flex flex-col p-3 overflow-y-scroll'>
      {' '}
      <div className='flex    h-30   w-full overflow-x-scroll gap-3 pb-4'>
        {' '}
        <article className='flex-1 drop-shadow-md'>
          <Select
            defaultValue={yearData?.date[0].toString()}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className='w-full h-20'>
              <SelectValue
                placeholder='Année'
                className='text-xl'
                defaultValue={yearData?.date[0].toString()}
              />
            </SelectTrigger>
            <SelectContent>
              {yearData?.date.map((year, index) => (
                <SelectItem
                  key={index}
                  className='text-xl'
                  value={year.toString()}
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </article>
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
          <span className='text-[#D6A514]  font-black lg:text-4xl text-lg'>
            {yearStatsData?.stats?.totalPrice} €
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>Total</h3>
        </article>
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
          <span className='text-[#2C4A7B] font-black lg:text-4xl text-lg'>
            # {yearStatsData?.stats?.totalMensuality}
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>
            Nombre de mensualités
          </h3>
        </article>
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
          <span className='text-[#43669D] font-black lg:text-4xl text-lg'>
            {yearStatsData?.stats?.averageMonthlyPrice} € / mois
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>Moyenne</h3>
        </article>
      </div>
      <div className='flex-1'>
        <BarChart />
      </div>
    </div>
  );
}
