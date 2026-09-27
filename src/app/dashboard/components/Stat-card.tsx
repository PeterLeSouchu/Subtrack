import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  featured = false,
  className = '',
}: {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  hint?: ReactNode;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`relative isolate flex min-w-0 flex-col gap-4 overflow-hidden rounded-2xl p-4 md:p-5 ${
        featured
          ? 'bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-glow'
          : 'bg-white text-ink shadow-soft ring-1 ring-ink/5'
      } ${className}`}
    >
      {featured && (
        <>
          <span className='absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-white/10' />
          <span className='absolute -bottom-16 right-10 -z-10 h-32 w-32 rounded-full bg-sky-400/20 blur-2xl' />
        </>
      )}
      <div className='flex items-center justify-between gap-3'>
        <h3
          className={`text-sm font-medium tracking-normal ${
            featured ? 'text-brand-100' : 'text-stattext'
          }`}
        >
          {label}
        </h3>
        {Icon && (
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
              featured
                ? 'bg-white/15 text-white ring-1 ring-inset ring-white/20'
                : 'bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100'
            }`}
          >
            <Icon className='h-4 w-4' />
          </span>
        )}
      </div>
      <div>
        <span className='flex items-center gap-2 whitespace-nowrap text-2xl font-semibold leading-none md:text-[1.75rem] tracking-[-0.03em]'>
          {value}
        </span>
        {hint && (
          <p
            className={`mt-2 text-xs ${
              featured ? 'text-brand-100' : 'text-stattext'
            }`}
          >
            {hint}
          </p>
        )}
      </div>
    </article>
  );
}
