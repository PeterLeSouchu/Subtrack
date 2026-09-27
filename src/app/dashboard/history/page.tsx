'use client';

import Link from 'next/link';
import { useGetDate } from './history.service';
import Spinner from '@/src/components/Spinner';
import Image from 'next/image';
import { PageHeader } from '../components/Page-header';

export default function History() {
  const { data, isLoading } = useGetDate();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-8 p-4 md:p-6 xl:p-8'>
      <PageHeader
        title='Historique'
        description='Retrouvez vos mensualités mois par mois.'
      />
      {data?.date && data?.date?.length > 0 ? (
        <div className='flex flex-col gap-4'>
          {data?.date.map((date, index) => (
            <section
              key={index}
              className='flex flex-col gap-4 rounded-2xl border border-line bg-white p-5 shadow-card md:flex-row md:items-start md:gap-8 md:p-6'
            >
              <h2 className='w-24 shrink-0 text-2xl font-semibold text-ink'>
                {date?.year}
              </h2>
              <div className='flex flex-1 flex-wrap items-center gap-2'>
                {date.month.map((m, index) => (
                  <Link
                    href={`history/details?year=${date.year}&month=${m}`}
                    key={index}
                    className='rounded-lg border border-line bg-white px-3.5 py-2 font-medium capitalize text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700'
                  >
                    {m}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-input bg-white px-4 py-16 text-center'>
          <Image
            width={200}
            height={200}
            src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742933761/d82emd9fze6brfxsoxt4.webp'
            alt=''
            className='w-24'
          />
          <h2 className='font-sans text-lg font-medium tracking-normal text-ink'>
            Vous n&apos;avez pas encore d&apos;historique.
          </h2>
        </div>
      )}
    </div>
  );
}
