'use client';

import Link from 'next/link';
import { useGetDate } from './history.service';
import Spinner from '@/src/components/Spinner';

export default function History() {
  const { data, isLoading } = useGetDate();

  if (isLoading) {
    return <Spinner />;
  }

  console.log('voila les dates,', data);

  return (
    <div className='flex justify-center'>
      {' '}
      <div className='p-3 w-4/5  flex flex-col gap-10 pt-10 '>
        {data?.date.map((date, index) => (
          <section key={index}>
            <span className=' bg-navbar text-white font-bold rounded-xl text-2xl p-2'>
              {date.year}
            </span>
            <div className='mt-6 mb-10  border-t-2 flex items-center gap-3 pt-2'>
              {date.month.map((m, index) => (
                <Link
                  href={'history/month'}
                  key={index}
                  className='p-2 bg-white transition hover:bg-slate-200 rounded-lg text-xl border font-semibold'
                >
                  {m}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
