import { StatsCategoryType } from '@/src/types/stats';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'next/image';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({
  statsCategories,
  showGraphic = true,
  isMobile = false,
}: {
  statsCategories: StatsCategoryType[] | undefined;
  showGraphic?: boolean;
  isMobile?: boolean;
}) => {
  const data = {
    labels: statsCategories?.map((item) => item.name) ?? [],
    datasets: [
      {
        data: statsCategories?.map((item) => item.price) ?? [],
        backgroundColor:
          statsCategories?.map((category) => category.color) ?? [],
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
              return `Prix: ${category.price}€ -  ${category.percentage}%`;
            }
            return 'Données indisponibles';
          },
        },
      },
    },
  };

  const content =
    statsCategories && statsCategories?.length > 0 ? (
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
    );

  return isMobile ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showGraphic ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`h-full w-full ${showGraphic ? 'block' : 'hidden'} xl:hidden`}
    >
      <section className='py-3 px-3 h-full rounded-md'>
        <div className='h-full w-full p-3 drop-shadow-md flex items-center justify-center rounded-md'>
          {content}
        </div>
      </section>
    </motion.div>
  ) : (
    <div className='w-1/3 hidden h-full p-3 xl:block'>
      <div className='h-full rounded-md bg-white flex items-center justify-center drop-shadow-md'>
        {content}
      </div>
    </div>
  );
};

export function ChartMobile({
  statsCategories,
  showGraphic,
}: {
  statsCategories: StatsCategoryType[] | undefined;
  showGraphic: boolean;
}) {
  return (
    <Chart
      statsCategories={statsCategories}
      showGraphic={showGraphic}
      isMobile={true}
    />
  );
}

export function ChartDesktop({
  statsCategories,
}: {
  statsCategories: StatsCategoryType[] | undefined;
}) {
  return <Chart statsCategories={statsCategories} />;
}
