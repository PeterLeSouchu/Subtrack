'use client';

import Link from 'next/link';
import { useGetDate } from './history.service';
import Spinner from '@/src/components/Spinner';
import Image from 'next/image';
import { PageHeader } from '../components/Page-header';
import { CalendarDays, ChevronRight } from 'lucide-react';

export default function History() {
  const { data, isLoading } = useGetDate();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6 xl:p-10'>
      <PageHeader
        title='Historique'
        description='Retrouvez vos mensualités mois par mois.'
      />
      {data?.date && data?.date?.length > 0 ? (
        <div className='flex flex-col gap-4'>
          {data?.date.map((date, index) => (
            <section
              key={index}
              className='rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink/5 md:p-6'
            >
              <div className='flex items-center justify-between gap-4'>
                <h2 className='text-2xl font-semibold tracking-[-0.03em] text-ink'>
                  {date?.year}
                </h2>
                <span className='rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-stattext'>
                  {date.month.length} mois
                </span>
              </div>
              <div className='mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {date.month.map((m, index) => (
                  <Link
                    href={`history/details?year=${date.year}&month=${m}`}
                    key={index}
                    className='group flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3.5 py-3 text-sm font-medium capitalize text-ink ring-1 ring-inset ring-ink/5 transition hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200'
                  >
                    <span className='flex items-center gap-2'>
                      <CalendarDays className='h-4 w-4 text-stattext transition-colors group-hover:text-brand-600' />
                      {m}
                    </span>
                    <ChevronRight className='h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500' />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3 rounded-2xl bg-white px-4 py-16 text-center shadow-soft ring-1 ring-ink/5'>
          <span className='flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100'>
            <Image
              width={200}
              height={200}
              src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742933761/d82emd9fze6brfxsoxt4.webp'
              alt=''
              className='w-9'
            />
          </span>
          <h2 className='text-base font-semibold tracking-normal text-ink'>
            Vous n&apos;avez pas encore d&apos;historique.
          </h2>
          <p className='max-w-sm text-sm text-stattext'>
            Chaque mois écoulé apparaîtra ici avec le détail de vos
            mensualités.
          </p>
        </div>
      )}
    </div>
  );
}
