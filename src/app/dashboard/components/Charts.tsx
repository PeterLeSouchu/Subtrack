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
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 6,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '74%',
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

  const total =
    statsCategories?.reduce((sum, category) => sum + category.price, 0) ?? 0;

  const content =
    statsCategories && statsCategories?.length > 0 ? (
      <div className='flex w-full flex-col gap-6'>
        <div className='relative mx-auto w-full max-w-[16rem]'>
          <Doughnut data={data} options={options} />
          <div className='pointer-events-none absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-xs text-stattext'>Total</span>
            <span className='text-2xl font-semibold tracking-tight text-ink'>
              {Math.round(total * 100) / 100} €
            </span>
          </div>
        </div>
        <ul className='flex flex-col gap-3.5'>
          {statsCategories.map((category) => (
            <li key={category.name} className='text-sm'>
              <div className='flex items-center gap-2.5'>
                <span
                  className='h-2.5 w-2.5 shrink-0 rounded-full'
                  style={{ backgroundColor: category.color }}
                />
                <span className='flex-1 font-medium text-ink'>
                  {category.name}
                </span>
                <span className='text-xs text-stattext'>
                  {category.percentage}%
                </span>
                <span className='w-20 text-right font-semibold text-ink'>
                  {category.price} €
                </span>
              </div>
              <div className='ml-5 mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100'>
                <div
                  className='h-full rounded-full'
                  style={{
                    width: `${category.percentage}%`,
                    backgroundColor: category.color,
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div className='flex flex-col items-center gap-3 py-10 text-center'>
        <span className='flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100'>
          <Image
            className='w-9'
            src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742746412/rk1ydjczqgwruz2ye3qu.png'
            alt='icone chart'
            width={200}
            height={200}
          />
        </span>
        <h2 className='max-w-56 text-sm font-medium tracking-normal text-stattext'>
          Renseignez une mensualité pour voir le graphique
        </h2>
      </div>
    );

  const card = (
    <div className='flex h-full flex-col gap-5 rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink/5'>
      <div>
        <h2 className='text-base font-semibold tracking-tight text-ink'>
          Répartition
        </h2>
        <p className='mt-0.5 text-sm text-stattext'>Par catégorie</p>
      </div>
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
    <div className='hidden w-[22rem] shrink-0 xl:sticky xl:top-6 xl:block xl:self-start'>
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
