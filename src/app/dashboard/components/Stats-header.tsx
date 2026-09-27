import { UpIcon, DownIcon } from '@/src/components/icons';
import { StatsType } from '@/src/types/stats';
import { StatCard } from './Stat-card';

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
    <section className='flex w-full gap-3 overflow-x-auto pb-1'>
      <StatCard featured label='Montant total' value={`${totalPrice} €`} />
      <StatCard label='Nombre de mensualités' value={totalMensuality} />
      <StatCard label='Moyenne' value={`${averagePrice} €`} />

      {/* Bénéfice/Pertes (si pas en mode historique et si différent de 0) */}
      {!isHistory && benefitOrLoss !== 0 && (
        <StatCard
          label='Par rapport au mois précédent'
          value={
            <span
              className={`flex items-center gap-2 ${
                isPositive ? 'text-red-600' : 'text-green-600'
              }`}
            >
              {isPositive ? (
                <DownIcon width='24' height='24' />
              ) : (
                <UpIcon width='24' height='24' />
              )}
              {formattedBenefitOrLoss} €
            </span>
          }
        />
      )}
    </section>
  );
}
