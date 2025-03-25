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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Données pour le graphique
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], // Labels de l'axe X
    datasets: [
      {
        label: 'Ventes mensuelles', // Légende du graphique
        data: [65, 59, 80, 81, 56], // Données des barres
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur des barres
        borderColor: 'rgba(75, 192, 192, 1)', // Couleur du bord des barres
        borderWidth: 1, // Largeur de la bordure
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default function Bilan() {
  return (
    <div className='h-full p-3 overflow-y-scroll'>
      {' '}
      <div className='flex    w-full overflow-x-scroll gap-3 pb-4'>
        {' '}
        <article className='flex-1 drop-shadow-md'>
          <Select>
            <SelectTrigger className='w-full h-20'>
              <SelectValue placeholder='Theme' className='text-xl' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className='text-xl' value='light'>
                Light
              </SelectItem>
              <SelectItem className='text-xl' value='dark'>
                Dark
              </SelectItem>
              <SelectItem className='text-xl' value='system'>
                System
              </SelectItem>
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
      <div>
        <BarChart />
      </div>
    </div>
  );
}
