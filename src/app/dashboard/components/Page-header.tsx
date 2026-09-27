import { ReactNode } from 'react';

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className='flex flex-wrap items-end justify-between gap-4'>
      <div>
        <h1 className='text-2xl font-semibold tracking-[-0.03em] text-ink first-letter:uppercase md:text-[2rem] md:leading-tight'>
          {title}
        </h1>
        {description && (
          <p className='mt-1.5 text-[0.95rem] text-stattext'>{description}</p>
        )}
      </div>
      {actions && <div className='flex items-center gap-3'>{actions}</div>}
    </div>
  );
}
