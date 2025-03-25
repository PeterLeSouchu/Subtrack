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
import { useGetYearDate } from './result.service';
import Spinner from '@/src/components/Spinner';

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
  const { data: yearData, isLoading: yearLoading } = useGetYearDate();

  if (yearLoading) return <Spinner />;
  console.log('voila les dates', yearData);
  return (
    <div className='h-full flex flex-col p-3 overflow-y-scroll'>
      {' '}
      <div className='flex    h-30   w-full overflow-x-scroll gap-3 pb-4'>
        {' '}
        <article className='flex-1 drop-shadow-md'>
          <Select>
            <SelectTrigger className='w-full h-20'>
              <SelectValue placeholder='Année' className='text-xl' />
            </SelectTrigger>
            <SelectContent>
              {yearData?.date.map((year, index) => (
                <SelectItem key={index} className='text-xl' value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </article>
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
          <span className='text-[#43669D] font-black lg:text-4xl text-lg'>
            1200 € / mois
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>Moyenne</h3>
        </article>
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
          <span className='text-[#D6A514] font-black lg:text-4xl text-lg'>
            1200 €
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>
            Montant total
          </h3>
        </article>
      </div>
      <div className='flex-1'>
        <BarChart />
      </div>
    </div>
  );
}
