'use client';

import {
  BalanceIcon,
  TrashIcon,
  UpIcon,
  EditIcon,
} from '@/src/components/icons';
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
import { useState } from 'react';

const data = [
  {
    category: 'Divertissement',
    icon: '🎮',
    name: 'Abonnement Netflix 4 personnes  ',
    price: '18000€',
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
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
];

export default function Dashboard() {
  const [showGraphic, setShowGraphic] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='flex   h-full  overflow-hidden  '>
      <div className='xl:w-2/3 w-full h-full flex  flex-col'>
        <div className=''>
          {' '}
          <section className='flex py-3 px-3  justify-start items-center  w-full overflow-x-scroll gap-3 '>
            <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap '>
              <span className='text-[#D6A514] font-black lg:text-4xl text-lg'>
                1300 €
              </span>
              <h3 className='text-stattext font-bold text-left text-sm'>
                Montant total
              </h3>
            </article>
            <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap'>
              <span className='text-[#2C4A7B] font-black lg:text-4xl text-lg'>
                # 23
              </span>
              <h3 className='text-stattext font-bold text-left text-sm'>
                Nombre de mensualités
              </h3>
            </article>
            <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap'>
              <span className='text-[#43669D] font-black lg:text-4xl text-lg flex gap-1 items-center'>
                <BalanceIcon width='30' height='30' /> 23
              </span>
              <h3 className='text-stattext font-bold text-left text-sm'>
                Moyenne
              </h3>
            </article>
            <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  w-auto text-nowrap'>
              <span className='text-[#17C058] font-black lg:text-4xl text-lg flex gap-1 items-center'>
                <UpIcon width='30' height='30' className='mr-3' /> + 13%
              </span>
              <h3 className='text-stattext font-bold text-left text-sm'>
                de bénéfice par rapport au mois précédent
              </h3>
            </article>
          </section>
        </div>

        <button
          onClick={() => setShowGraphic((value) => !value)}
          className='xl:hidden'
        >
          {showGraphic ? 'afficher graphic' : 'masquer graphic'}
        </button>

        <section
          className={`xl:flex-1 md:p-3 px-3 pt-3 pb-0 w-full overflow-hidden ${
            showGraphic ? 'hidden' : 'flex'
          } xl:block`}
        >
          <div className='md:bg-white md:drop-shadow-md w-full h-full p-4  flex flex-col gap-4 rounded-md md:overflow-hidden overflow-y-scroll'>
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
            <Table className='w-full  rounded-lg overflow-y-scroll md:table hidden  '>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-left   p-4 font-extrabold text-[#253145]'>
                    Catégorie
                  </TableHead>
                  <TableHead className='text-left   p-4 font-extrabold  text-[#253145]'>
                    Nom
                  </TableHead>
                  <TableHead className='text-left   p-4 font-extrabold  text-[#253145]'>
                    Prix
                  </TableHead>
                  <TableHead className='text-left  p-4 font-extrabold   '></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow
                    key={index}
                    className='border-t p-0 border-gray-200'
                  >
                    <TableCell className='p-4 flex items-center gap-2'>
                      <span className='bg-[#E8E5FF] text-blue  font-semibold py-1 px-2 flex gap-2 items-center rounded-xl'>
                        <span className='text-xl'>{item.icon}</span>
                        <p className='font-extrabold'> {item.category}</p>
                      </span>
                    </TableCell>
                    <TableCell className='p-4 text-gray-700 font-semibold'>
                      {item.name}
                    </TableCell>
                    <TableCell className='p-4 text-gray-700 font-medium'>
                      {item.price}
                    </TableCell>
                    <TableCell className='p-4 flex justify-center gap-3'>
                      <button className=' hover:bg-red-200 transition p-1 rounded-full'>
                        <TrashIcon width='18' />
                      </button>
                      <button className=' hover:bg-amber-100 transition p-1 rounded-full'>
                        <EditIcon width='16' />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {data.map((mensuality) => (
              <article
                className=' md:hidden drop-shadow-md flex  bg-white rounded-2xl px-6 gap-2 py-3'
                key={Math.random()}
              >
                <div className='w-4/5 flex flex-col gap-4 justify-center'>
                  <p className='font-bold text-sm sm:text-base '>
                    {' '}
                    {mensuality.name}
                  </p>
                  <span className='bg-[#E8E5FF] text-blue font-semibold py-1 px-2 inline-flex w-fit gap-2 items-center rounded-xl'>
                    <span className='text-xl'>{mensuality.icon}</span>
                    <p className='font-extrabold text-sm sm:text-base'>
                      {' '}
                      {mensuality.category}
                    </p>
                  </span>
                </div>
                <div className='w-1/5 flex flex-col items-center gap-4'>
                  <p className='sm:text-xl text-lg text-center font-bold break-words w-full '>
                    {' '}
                    {mensuality.price}
                  </p>
                  <div>
                    <button className=' p-1'>
                      <TrashIcon width='20' />
                    </button>
                    <button className=' p-1'>
                      <EditIcon width='18' />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div
          className={`    h-full w-full ${
            showGraphic ? 'block' : 'hidden'
          } xl:hidden   `}
        >
          <section className='py-3 px-3 h-full rounded-md '>
            <div className='h-full w-full drop-shadow-md rounded-md '>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
                obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto
                impedit atque et facilis?
              </div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
                obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto
                impedit atque et facilis?
              </div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
                tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
                obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto
                impedit atque et facilis?
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className='w-1/3 hidden  bg-red-600 h-full    xl:block'>
        <section className='py-3 px-3 h-full rounded-md '>
          <div className='bg-white h-full w-full drop-shadow-md rounded-md '>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
              tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
              obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto
              impedit atque et facilis?
            </div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
              tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
              obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto
              impedit atque et facilis?
            </div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
              tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
              obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto
              impedit atque et facilis?
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
