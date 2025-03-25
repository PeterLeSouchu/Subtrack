'use client';

import Link from 'next/link';
import { useGetDate } from './history.service';
import Spinner from '@/src/components/Spinner';
import Image from 'next/image';

export default function History() {
  const { data, isLoading } = useGetDate();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='flex justify-center h-full'>
      {' '}
      <div className='p-3 w-4/5  flex flex-col gap-10 pt-10 h-full'>
        {data?.date && data?.date?.length > 0 ? (
          data?.date.map((date, index) => (
            <section key={index}>
              <span className=' bg-blue text-white font-bold rounded-xl text-2xl p-2'>
                {date?.year}
              </span>
              <div className='mt-6 mb-10  border-t-2 flex items-center gap-3 pt-2'>
                {date.month.map((m, index) => (
                  <Link
                    href={`history/details?year=${date.year}&month=${m}`}
                    key={index}
                    className='p-2 bg-white transition hover:bg-slate-200 rounded-lg text-xl border font-semibold'
                  >
                    {m}
                  </Link>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className='flex flex-col items-center h-full justify-center'>
            <h2 className='text-xl font-semibold text-center'>
              Vous n&apos;avez pas encore d&apos;historique.
            </h2>
            <Image
              width={200}
              height={200}
              src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742933761/d82emd9fze6brfxsoxt4.webp'
              alt='empty file'
              className='w-32'
            />
          </div>
        )}
      </div>
    </div>
  );
}
