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
import { CalendarRange, Hash, Wallet } from 'lucide-react';

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

  const maxPrice = Math.max(...pricePerMonth);

  const data = {
    labels: months,
    datasets: [
      {
        data: pricePerMonth,
        backgroundColor: pricePerMonth.map((price) =>
          price === maxPrice && price > 0 ? '#2F43E0' : '#C0CAFF'
        ),
        hoverBackgroundColor: '#2233B8',
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 40,
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
        ticks: { color: '#555E7D', font: { family: fontFamily } },
      },
      y: {
        border: { display: false },
        grid: { color: '#EEF0F6' },
        ticks: {
          color: '#555E7D',
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
        <div className='mx-auto flex w-full max-w-[90rem] flex-col gap-5 p-4 md:gap-6 md:p-6 xl:p-10'>
          <PageHeader
            title='Bilan'
            description="Vos dépenses mensuelles sur l'année."
            actions={
              <Select
                value={selectedYear || yearData?.date[0].toString()}
                onValueChange={handleYearChange}
              >
                <SelectTrigger className='h-10 w-32 bg-white font-semibold shadow-soft'>
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
          <div className='grid gap-3 sm:grid-cols-3 md:gap-4'>
            <StatCard
              featured
              icon={Wallet}
              label='Total'
              value={`${yearStatsData?.stats?.totalPrice} €`}
              hint={`Sur l'année ${selectedYear || yearData?.date[0]}`}
            />
            <StatCard
              icon={Hash}
              label='Nombre de mensualités'
              value={yearStatsData?.stats?.totalMensuality}
            />
            <StatCard
              icon={CalendarRange}
              label='Moyenne'
              value={`${yearStatsData?.stats?.averageMonthlyPrice} €`}
              hint='Par mois'
            />
          </div>
          <div className='rounded-2xl bg-white p-4 shadow-soft ring-1 ring-ink/5 md:p-6'>
            <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
              <div>
                <h2 className='text-base font-semibold tracking-tight text-ink'>
                  Dépenses par mois
                </h2>
                <p className='mt-0.5 text-sm text-stattext'>
                  Le mois le plus élevé est mis en évidence.
                </p>
              </div>
              <div className='flex items-center gap-4 text-xs text-stattext'>
                <span className='flex items-center gap-1.5'>
                  <span className='h-2.5 w-2.5 rounded-sm bg-brand-600' />
                  Mois le plus élevé
                </span>
                <span className='flex items-center gap-1.5'>
                  <span className='h-2.5 w-2.5 rounded-sm bg-brand-200' />
                  Autres mois
                </span>
              </div>
            </div>
            <div className='h-[20rem] md:h-[24rem]'>
              <BarChart mensualityData={yearStatsData.stats.monthlyStats} />
            </div>
          </div>
        </div>
      ) : (
        <div className='mx-auto flex max-w-5xl flex-col gap-6 p-4 md:p-6 xl:p-10'>
          <PageHeader title='Bilan' />
          <div className='flex flex-col items-center justify-center gap-3 rounded-2xl bg-white px-4 py-16 text-center shadow-soft ring-1 ring-ink/5'>
            <Image
              className='w-16'
              src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742935563/g9dotyrgpwn7txg4hown.png'
              alt=''
              width={200}
              height={200}
            />
            <h2 className='text-base font-semibold tracking-normal text-ink'>
              Vous n&apos;avez pas encore de bilan.
            </h2>
          </div>
        </div>
      )}
    </>
  );
}
