'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import Image from 'next/image';
import { MonthlyStat } from '@/src/types/stats';
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

const BarChart = ({ mensualityData }: { mensualityData: MonthlyStat[] }) => {
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];

  const pricePerMonth: number[] = Array(12).fill(0);

  mensualityData.forEach((month) => {
    const monthIndex = months.indexOf(month.month);
    if (monthIndex !== -1) {
      pricePerMonth[monthIndex] = month.price;
    }
  });

  const data = {
    labels: months,
    datasets: [
      {
        data: pricePerMonth,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 71, 0.2)',
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 255, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(255, 165, 0, 0.2)',
        ],
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            return value + ' €';
          },
          beginAtZero: true,
        },
      },
    },
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

  console.log('yearStatsData', yearStatsData);

  return (
    <>
      {yearData?.date && yearStatsData?.stats ? (
        <div className='h-full flex flex-col p-3 overflow-y-scroll'>
          {' '}
          <div className='flex    h-30   w-full overflow-x-scroll gap-3 pb-4'>
            {' '}
            <article className='flex-1 drop-shadow-md'>
              <Select
                defaultValue={yearData?.date[0].toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className='w-full h-20 lg:text-2xl text-lg font-bold mr-2 '>
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
                      className='lg:text-xl text-base'
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
              <h3 className='text-stattext font-bold text-left text-sm'>
                Total
              </h3>
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
              <h3 className='text-stattext font-bold text-left text-sm'>
                Moyenne
              </h3>
            </article>
          </div>
          <div className='flex-1'>
            <BarChart mensualityData={yearStatsData.stats.monthlyStats} />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center h-full'>
          <h2 className='text-xl font-semibold text-center pt-10'>
            Vous n&apos;avez pas encore de bilan.
          </h2>
          <Image
            className='w-32 mt-6'
            src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742935563/g9dotyrgpwn7txg4hown.png'
            alt='icone chart'
            width={200}
            height={200}
          />
        </div>
      )}
    </>
  );
}
