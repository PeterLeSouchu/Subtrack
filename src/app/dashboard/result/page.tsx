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
import { PageHeader } from '../components/Page-header';
import { StatCard } from '../components/Stat-card';
import { chartFontFamily, chartTooltip } from '@/src/lib/chart';

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
        backgroundColor: '#2C74FF',
        hoverBackgroundColor: '#1F5CD4',
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 36,
      },
    ],
  };

  const fontFamily = chartFontFamily();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        ...chartTooltip,
        titleFont: { family: fontFamily },
        bodyFont: { family: fontFamily },
        displayColors: false,
        callbacks: {
          label: ({ parsed }: { parsed: { y: number | null } }) =>
            `${parsed.y ?? 0} €`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#5A6883', font: { family: fontFamily } },
      },
      y: {
        border: { display: false },
        grid: { color: '#E3E8F1' },
        ticks: {
          color: '#5A6883',
          font: { family: fontFamily },
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

  return (
    <>
      {yearData?.date && yearStatsData?.stats ? (
        <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-6 p-4 md:p-6 xl:p-8'>
          <PageHeader
            title='Bilan'
            description="Vos dépenses mensuelles sur l'année."
            actions={
              <Select
                value={selectedYear || yearData?.date[0].toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className='w-28 font-semibold'>
                  <SelectValue
                    placeholder='Année'
                    defaultValue={yearData?.date[0].toString()}
                  />
                </SelectTrigger>
                <SelectContent>
                  {yearData?.date.map((year, index) => (
                    <SelectItem key={index} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
          />
          <div className='flex w-full gap-3 overflow-x-auto pb-1'>
            <StatCard
              featured
              label='Total'
              value={`${yearStatsData?.stats?.totalPrice} €`}
            />
            <StatCard
              label='Nombre de mensualités'
              value={yearStatsData?.stats?.totalMensuality}
            />
            <StatCard
              label='Moyenne'
              value={`${yearStatsData?.stats?.averageMonthlyPrice} € / mois`}
            />
          </div>
          <div className='h-[22rem] rounded-2xl border border-line bg-white p-4 shadow-card md:h-[26rem] md:p-6'>
            <BarChart mensualityData={yearStatsData.stats.monthlyStats} />
          </div>
        </div>
      ) : (
        <div className='mx-auto flex max-w-4xl flex-col gap-8 p-4 md:p-6 xl:p-8'>
          <PageHeader title='Bilan' />
          <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-input bg-white px-4 py-16 text-center'>
            <Image
              className='w-24'
              src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742935563/g9dotyrgpwn7txg4hown.png'
              alt=''
              width={200}
              height={200}
            />
            <h2 className='font-sans text-lg font-medium tracking-normal text-ink'>
              Vous n&apos;avez pas encore de bilan.
            </h2>
          </div>
        </div>
      )}
    </>
  );
}
