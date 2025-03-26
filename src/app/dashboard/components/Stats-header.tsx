import { UpIcon, DownIcon } from '@/src/components/icons';
import { StatsType } from '@/src/types/stats';

export function StatsHeader({
  statsData,
  isHistory = false,
}: {
  statsData: StatsType | undefined;
  isHistory?: boolean;
}) {
  const totalPrice = statsData?.totalPrice ?? 0;
  const totalMensuality = statsData?.totalMensuality ?? 0;
  const averagePrice = statsData?.averagePrice ?? 0;

  const benefitOrLoss = statsData?.benefitOrLoss ?? 0;
  const isPositive = benefitOrLoss > 0;
  const formattedBenefitOrLoss = `${isPositive ? '+' : ''}${benefitOrLoss}`;

  return (
    <section className='flex py-3 px-3 justify-start items-center w-full overflow-x-scroll gap-3'>
      {/* Montant total */}
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
        <span className='text-[#D6A514] font-black lg:text-4xl text-lg'>
          {totalPrice} €
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>
          Montant total
        </h3>
      </article>

      {/* Nombre de mensualités */}
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
        <span className='text-[#2C4A7B] font-black lg:text-4xl text-lg'>
          # {totalMensuality}
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>
          Nombre de mensualités
        </h3>
      </article>

      {/* Moyenne */}
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 text-nowrap'>
        <span className='text-[#43669D] font-black lg:text-4xl text-lg flex gap-1 items-center'>
          {averagePrice} €
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>Moyenne</h3>
      </article>

      {/* Bénéfice/Pertes (si pas en mode historique et si différent de 0) */}
      {!isHistory && benefitOrLoss !== 0 && (
        <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20 w-auto text-nowrap'>
          <span
            className={`${
              isPositive ? 'text-[#ca3333]' : 'text-[#17C058]'
            } font-black lg:text-4xl text-lg flex gap-1 items-center`}
          >
            {isPositive ? (
              <DownIcon
                width='30'
                height='30'
                className='mr-3 text-[#ca3333]'
              />
            ) : (
              <UpIcon width='30' height='30' className='mr-3 text-[#17C058]' />
            )}
            {formattedBenefitOrLoss} €
          </span>
          <h3 className='text-stattext font-bold text-left text-sm'>
            par rapport au mois précédent
          </h3>
        </article>
      )}
    </section>
  );
}
