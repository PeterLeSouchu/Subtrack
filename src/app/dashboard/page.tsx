'use client';

import { BalanceIcon, UpIcon } from '@/src/components/icons';
import { useSession } from 'next-auth/react';
import InputSearch from '@/src/components/Input-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import NewMensualityBtn from '@/src/components/New-mensuality';

export default function Dashboard() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='flex  h-full   '>
      <div className='xl:w-2/3 w-full h-full flex flex-col'>
        <section className='flex justify-start items-center  w-full overflow-x-scroll gap-3 p-3'>
          <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 h-20  text-nowrap '>
            <span className='text-[#D6A514] font-black lg:text-4xl text-2xl'>
              1300 €
            </span>
            <h3 className='text-stattext font-bold text-left text-sm'>
              Montant total
            </h3>
          </article>
          <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 h-20  text-nowrap'>
            <span className='text-[#2C4A7B] font-black lg:text-4xl text-2xl'>
              # 23
            </span>
            <h3 className='text-stattext font-bold text-left text-sm'>
              Nombre de mensualités
            </h3>
          </article>
          <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 h-20  text-nowrap'>
            <span className='text-[#43669D] font-black lg:text-4xl text-2xl flex gap-1 items-center'>
              <BalanceIcon width='30' height='30' /> 23
            </span>
            <h3 className='text-stattext font-bold text-left text-sm'>
              Moyenne
            </h3>
          </article>
          <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 h-20  w-auto text-nowrap'>
            <span className='text-[#17C058] font-black lg:text-4xl text-2xl flex gap-1 items-center'>
              <UpIcon width='30' height='30' className='mr-3' /> + 13%
            </span>
            <h3 className='text-stattext font-bold text-left text-sm'>
              de bénéfice par rapport au mois précédent
            </h3>
          </article>
        </section>

        <section className='flex-1 p-3 w-full'>
          <div className='bg-white drop-shadow-md w-full h-full p-2 rounded-md'>
            <div className='flex gap-2'>
              {' '}
              <InputSearch />
              <Select>
                <SelectTrigger className='w-[180px]'>
                  <SelectValue placeholder='Theme' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='light'>Light</SelectItem>
                  <SelectItem value='dark'>Dark</SelectItem>
                  <SelectItem value='system'>System</SelectItem>
                </SelectContent>
              </Select>
              <NewMensualityBtn />
            </div>
          </div>
        </section>
      </div>

      <div className='w-1/3 hidden h-full xl:block '>
        <section className='p-3 h-full rounded-md '>
          <div className='bg-white h-full w-full drop-shadow-md rounded-md '></div>
        </section>
      </div>
    </div>
  );
}
