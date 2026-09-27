import { ReactNode } from 'react';

export function StatCard({
  label,
  value,
  featured = false,
  className = '',
}: {
  label: string;
  value: ReactNode;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`flex min-w-[9.5rem] flex-1 flex-col justify-between gap-6 rounded-2xl p-5 text-nowrap ${
        featured
          ? 'bg-brand-700 text-white'
          : 'border border-line bg-white text-ink shadow-card'
      } ${className}`}
    >
      <h3
        className={`font-sans text-sm font-medium tracking-normal ${
          featured ? 'text-brand-100' : 'text-stattext'
        }`}
      >
        {label}
      </h3>
      <span className='flex items-center gap-1 font-display text-2xl font-semibold tabular-nums lg:text-[2rem] lg:leading-none'>
        {value}
      </span>
    </article>
  );
}
