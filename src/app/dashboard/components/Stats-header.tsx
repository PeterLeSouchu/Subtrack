import { Hash, Receipt, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
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
  const showDelta = !isHistory && benefitOrLoss !== 0;

  return (
    <section
      className={`grid grid-cols-2 gap-3 md:gap-4 ${
        showDelta ? 'xl:grid-cols-4' : 'lg:grid-cols-3'
      }`}
    >
      <StatCard
        featured
        className='col-span-2 sm:col-span-1'
        icon={Wallet}
        label='Montant total'
        value={`${totalPrice} €`}
        hint={isHistory ? 'Sur ce mois' : 'Ce mois-ci'}
      />
      <StatCard
        icon={Hash}
        label='Mensualités'
        value={totalMensuality}
      />
      <StatCard
        icon={Receipt}
        label='Moyenne'
        value={`${averagePrice} €`}
        hint='Par mensualité'
      />

      {/* Bénéfice/Pertes (si pas en mode historique et si différent de 0) */}
      {showDelta && (
        <StatCard
          className='col-span-2 sm:col-span-1'
          icon={isPositive ? TrendingUp : TrendingDown}
          label='Par rapport au mois précédent'
          value={
            <span className={isPositive ? 'text-red-600' : 'text-emerald-600'}>
              {formattedBenefitOrLoss} €
            </span>
          }
          hint={
            <span
              className={`inline-flex rounded-full px-2 py-0.5 font-medium ${
                isPositive
                  ? 'bg-red-50 text-red-700'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {isPositive ? 'Dépenses en hausse' : 'Dépenses en baisse'}
            </span>
          }
        />
      )}
    </section>
  );
}
