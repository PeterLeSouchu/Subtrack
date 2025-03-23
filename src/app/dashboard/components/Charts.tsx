import { StatsCategoryType } from '@/src/types/stats';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'next/image';

ChartJS.register(ArcElement, Tooltip, Legend);

const backgroundColor = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 205, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(0, 255, 0, 0.8)',
  'rgba(255, 69, 0, 0.8)',
  'rgba(0, 0, 255, 0.8)',
  'rgba(255, 20, 147, 0.8)',
  'rgba(255, 215, 0, 0.8)',
];

export function ChartMobile({
  showGraphic,
  statsCategories,
}: {
  showGraphic: boolean;
  statsCategories: StatsCategoryType[] | undefined;
}) {
  const data = {
    labels: statsCategories?.map((item) => item.name) ?? [],
    datasets: [
      {
        data: statsCategories?.map((item) => item.price) ?? [],
        backgroundColor:
          statsCategories?.map(
            (_, index) => backgroundColor[index % backgroundColor.length]
          ) ?? [],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ({ dataIndex }: { dataIndex: number }) => {
            const category = statsCategories?.[dataIndex];
            if (category) {
              return `Prix: ${category.price}€ - Pourcentage: ${category.percentage}%`;
            }
            return 'Données indisponibles';
          },
        },
      },
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showGraphic ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`    h-full w-full ${
        showGraphic ? 'block' : 'hidden'
      } xl:hidden   `}
    >
      <section className='py-3 px-3 h-full rounded-md '>
        <div className=' h-full w-full p-3 drop-shadow-md flex items-center justify-center rounded-md '>
          {statsCategories && statsCategories?.length > 0 ? (
            <Doughnut data={data} options={options} />
          ) : (
            <div className='flex flex-col items-center gap-3'>
              <Image
                className='w-32'
                src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742746412/rk1ydjczqgwruz2ye3qu.png'
                alt='icone chart'
                width={200}
                height={200}
              />
              <h2 className='text-gray-500'>
                Renseignez une mensualité pour voir le graphique
              </h2>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

export function ChartDesktop({
  statsCategories,
}: {
  statsCategories: StatsCategoryType[] | undefined;
}) {
  const data = {
    labels: statsCategories?.map((item) => item.name) ?? [],
    datasets: [
      {
        data: statsCategories?.map((item) => item.price) ?? [],
        backgroundColor,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: ({ dataIndex }: { dataIndex: number }) => {
            const category = statsCategories?.[dataIndex];
            if (category) {
              return `Prix: ${category.price}€ - Pourcentage: ${category.percentage}%`;
            }
            return 'Données indisponibles';
          },
        },
      },
    },
  };
  return (
    <div className='w-1/3 hidden h-full p-3 xl:block'>
      <div className=' h-full rounded-md bg-white flex items-center justify-center drop-shadow-md'>
        {statsCategories && statsCategories?.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className='flex flex-col items-center gap-3'>
            <Image
              className='w-32'
              src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742746412/rk1ydjczqgwruz2ye3qu.png'
              alt='icone chart'
              width={200}
              height={200}
            />
            <h2 className='text-gray-500'>
              Renseignez une mensualité pour voir le graphique
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
