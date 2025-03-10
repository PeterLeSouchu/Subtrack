'use client';

import { BalanceIcon, UpIcon } from '@/src/components/icons';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='flex  h-full  '>
      <div className='lg:w-2/3 w-full  '>
        <section className='flex justify-start items-center   w-full overflow-x-scroll gap-3 p-3'>
          <article className=' flex flex-col bg-white drop-shadow-lg  rounded-2xl p-3 h-20 text-nowrap '>
            <span className='text-[#D6A514] font-black text-4xl'>1300 €</span>
            <h3 className='text-stattext font-bold text-left'>Montant total</h3>
          </article>
          <article className=' flex flex-col bg-white drop-shadow-lg  rounded-2xl p-3 h-20  text-nowrap'>
            <span className='text-[#2C4A7B] font-black text-4xl'># 23</span>
            <h3 className='text-stattext font-bold text-left'>
              Nombre de mensualités
            </h3>
          </article>
          <article className=' flex flex-col bg-white drop-shadow-lg  rounded-2xl p-3 h-20 text-nowrap '>
            <span className='text-[#43669D] font-black text-4xl flex gap-1 items-center'>
              <BalanceIcon width='30' height='30' /> 23
            </span>
            <h3 className='text-stattext font-bold text-left'>Moyenne</h3>
          </article>
          <article className=' flex flex-col bg-white drop-shadow-lg  rounded-2xl p-3 h-20 w-auto text-nowrap'>
            <span className='text-[#17C058] font-black text-4xl flex gap-1 items-center'>
              <UpIcon width='30' height='30' className='mr-3' /> + 13%
            </span>
            <h3 className='text-stattext font-bold text-left'>
              de bénéfice par rapport au mois précédent
            </h3>
          </article>
        </section>
        <section></section>
      </div>
      <div className='w-1/3 hidden lg:block'></div>
    </div>
  );
}
