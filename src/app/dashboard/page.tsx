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

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/src/components/ui/table';
import { Trash2, Pencil } from 'lucide-react';

const data = [
  {
    category: 'Divertissement',
    icon: '🎮',
    name: 'Abonnement Netflix 4 personnes',
    price: '18€',
  },
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
  {
    category: 'Autres',
    icon: '📖',
    name: 'Abonnement Spotify 4 personnes',
    price: '20€',
  },
  {
    category: 'Divertissement',
    icon: '🎮',
    name: 'Abonnement Netflix 4 personnes',
    price: '18€',
  },
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
];

export default function Dashboard() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='flex   h-full  overflow-hidden  '>
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

        <section className='flex-1 p-3 w-full overflow-hidden'>
          <div className='bg-white drop-shadow-md w-full h-full p-2  flex flex-col gap-4 rounded-md overflow-hidden'>
            <div className='flex gap-2 w-full'>
              {' '}
              <InputSearch />
              <Select>
                <SelectTrigger className='w-auto'>
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
            <Table className='w-full  rounded-lg overflow-y-scroll'>
              <TableHeader>
                <TableRow className='bg-gray-100'>
                  <TableHead className='text-left p-4 font-extrabold text-black'>
                    Catégorie
                  </TableHead>
                  <TableHead className='text-left p-4 font-extrabold  text-black'>
                    Nom
                  </TableHead>
                  <TableHead className='text-left p-4 font-extrabold  text-black'>
                    Prix
                  </TableHead>
                  <TableHead className='text-left p-4 font-extrabold   '></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index} className='border-t border-gray-200'>
                    <TableCell className='p-4 flex items-center gap-2'>
                      <span className='text-xl'>{item.icon}</span>
                      <span className='bg-gray-100 text-gray-800 font-semibold py-1 px-2 rounded-lg'>
                        {item.category}
                      </span>
                    </TableCell>
                    <TableCell className='p-4 text-gray-700'>
                      {item.name}
                    </TableCell>
                    <TableCell className='p-4 text-gray-700 font-medium'>
                      {item.price}
                    </TableCell>
                    <TableCell className='p-4 flex justify-center gap-3'>
                      <button className='text-gray-500 hover:text-red-600'>
                        <Trash2 size={18} />
                      </button>
                      <button className='text-gray-500 hover:text-blue-600'>
                        <Pencil size={18} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
