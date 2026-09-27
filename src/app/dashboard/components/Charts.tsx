import { StatsCategoryType } from '@/src/types/stats';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Image from 'next/image';
import { chartFontFamily, chartTooltip } from '@/src/lib/chart';

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
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderRadius: 4,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '68%',
    plugins: {
      legend: { display: false },
      tooltip: {
        ...chartTooltip,
        bodyFont: { family: chartFontFamily() },
        titleFont: { family: chartFontFamily() },
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
      <div className='flex w-full flex-col gap-6'>
        <div className='mx-auto w-full max-w-[18rem]'>
          <Doughnut data={data} options={options} />
        </div>
        <ul className='flex flex-col divide-y divide-line'>
          {statsCategories.map((category) => (
            <li
              key={category.name}
              className='flex items-center gap-3 py-2.5 text-sm'
            >
              <span
                className='h-2.5 w-2.5 shrink-0 rounded-full'
                style={{ backgroundColor: category.color }}
              />
              <span className='flex-1 font-medium text-ink'>
                {category.name}
              </span>
              <span className='tabular-nums text-stattext'>
                {category.percentage}%
              </span>
              <span className='w-16 text-right font-semibold tabular-nums text-ink'>
                {category.price} €
              </span>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className='flex flex-col items-center gap-3 py-10 text-center'>
        <Image
          className='w-24'
          src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742746412/rk1ydjczqgwruz2ye3qu.png'
          alt='icone chart'
          width={200}
          height={200}
        />
        <h2 className='max-w-56 font-sans text-base font-medium tracking-normal text-stattext'>
          Renseignez une mensualité pour voir le graphique
        </h2>
      </div>
    );

  const card = (
    <div className='flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-card'>
      <h2 className='text-lg font-semibold text-ink'>Répartition</h2>
      <div className='flex flex-1 items-center justify-center'>{content}</div>
    </div>
  );

  return isMobile ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showGraphic ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`${showGraphic ? 'block' : 'hidden'} xl:hidden`}
    >
      {card}
    </motion.div>
  ) : (
    <div className='hidden w-[22rem] shrink-0 xl:sticky xl:top-8 xl:block xl:self-start'>
      {card}
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
