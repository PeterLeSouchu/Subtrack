import { UpIcon, DownIcon } from '@/src/components/icons';
import { StatsType } from '@/src/types/stats';

export function StatsHeader({
  statsData,
  isHistory = false,
}: {
  statsData: StatsType | undefined;
  isHistory?: boolean;
}) {
  return (
    <section className='flex py-3 px-3  justify-start items-center  w-full overflow-x-scroll gap-3 '>
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap '>
        <span className='text-[#D6A514] font-black lg:text-4xl text-lg'>
          {statsData?.totalPrice || 0} €
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>
          Montant total
        </h3>
      </article>
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap'>
        <span className='text-[#2C4A7B] font-black lg:text-4xl text-lg'>
          # {statsData?.totalMensuality || 0}
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>
          Nombre de mensualités
        </h3>
      </article>
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap'>
        <span className='text-[#43669D] font-black lg:text-4xl text-lg flex gap-1 items-center'>
          {statsData?.averagePrice || 0} €
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>Moyenne</h3>
      </article>
      {!isHistory && statsData?.benefitOrLoss !== 0 && (
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  w-auto text-nowrap'>
          <span
            className={`${
              statsData?.benefitOrLoss && statsData?.benefitOrLoss > 0
                ? 'text-[#17C058]'
                : 'text-[#ca3333]'
            } font-black lg:text-4xl text-lg flex gap-1 items-center`}
          >
            {statsData?.benefitOrLoss && statsData?.benefitOrLoss > 0 ? (
              <UpIcon width='30' height='30' className='mr-3 text-[#17C058]' />
            ) : (
              <DownIcon
                width='30'
                height='30'
                className='mr-3 text-[#ca3333]'
              />
            )}
            {statsData?.benefitOrLoss} €
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>
            de{' '}
            {statsData?.benefitOrLoss && statsData?.benefitOrLoss > 0
              ? 'bénéfice'
              : 'perte'}{' '}
            par rapport au mois précédent
          </h3>
        </article>
      )}
    </section>
  );
}
