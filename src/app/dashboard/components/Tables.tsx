import { CategoryType } from '@/src/types/category';
import { MensualityGetType } from '@/src/types/mensuality';
import { EditIcon, SearchIcon, TrashIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import Image from 'next/image';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/src/components/ui/table';
import { AddIcon } from '@/src/components/icons';
import { motion } from 'framer-motion';

export function TableMensuality({
  handleDelete,
  setOpenCreateModal,
  mensualitiesData,
  categoriesData,
  searchValue,
  setSearchValue,
  setSelectedCategory,
  editMensuality,
  showGraphic,
}: {
  handleDelete: (id: string) => void;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  mensualitiesData: MensualityGetType[] | undefined;
  categoriesData: CategoryType[] | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  editMensuality: (mensuality: MensualityGetType) => void;
  showGraphic: boolean;
}) {
  return (
    <section className={`flex-1 p-3 w-full overflow-hidden block `}>
      <div className='xl:bg-white xl:drop-shadow-md w-full h-full p-4 flex flex-col gap-4 rounded-md md:overflow-hidden overflow-y-scroll'>
        <NavBar
          setOpenCreateModal={setOpenCreateModal}
          categoriesData={categoriesData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCategory={setSelectedCategory}
        />
        <Table className='w-full rounded-lg overflow-y-scroll md:table hidden'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-left p-4 font-extrabold text-[#253145]'>
                Catégorie
              </TableHead>
              <TableHead className='text-left p-4 font-extrabold text-[#253145]'>
                Nom
              </TableHead>
              <TableHead className='text-left p-4 font-extrabold text-[#253145]'>
                Prix
              </TableHead>
              <TableHead className='text-left p-4 font-extrabold'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mensualitiesData && mensualitiesData.length > 0 ? (
              mensualitiesData.map((mensuality, index) => (
                <TableRow key={index} className='border-t p-0 border-gray-200'>
                  <TableCell className='p-4 flex items-center gap-2'>
                    <span className='bg-[#E8E5FF] text-blue font-semibold py-1 px-2 flex gap-2 items-center rounded-xl'>
                      <Image
                        width={450}
                        height={450}
                        className='w-7'
                        src={mensuality.category.image}
                        alt='Icone catégorie'
                      />
                      <p className='font-extrabold'>
                        {mensuality.category.name}
                      </p>
                    </span>
                  </TableCell>
                  <TableCell className='p-4 text-gray-700 font-semibold'>
                    {mensuality.name}
                  </TableCell>
                  <TableCell className='p-4 text-gray-700 font-medium'>
                    {mensuality.price} €
                  </TableCell>
                  <TableCell className='p-4 flex justify-center gap-3'>
                    <button
                      className='hover:bg-red-200 transition p-1 rounded-full'
                      onClick={() => handleDelete(mensuality.id)}
                    >
                      <TrashIcon width='18' />
                    </button>
                    <button
                      onClick={() => editMensuality(mensuality)}
                      className='hover:bg-amber-100 transition p-1 rounded-full'
                    >
                      <EditIcon width='16' />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className='text-center p-4 text-gray-500'
                >
                  Aucune mensualité.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {mensualitiesData && mensualitiesData.length > 0 ? (
          mensualitiesData?.map((mensuality) => (
            <motion.article
              initial={{ opacity: 0 }}
              animate={{ opacity: showGraphic ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className=' md:hidden drop-shadow-md flex  bg-white rounded-2xl px-6 gap-2 py-3'
              key={Math.random()}
            >
              <div className='w-4/5 flex flex-col gap-4 justify-center'>
                <p className='font-bold text-sm sm:text-base '>
                  {' '}
                  {mensuality.name}
                </p>
                <span className='bg-[#E8E5FF] text-blue font-semibold py-1 px-2 inline-flex w-fit gap-2 items-center rounded-xl'>
                  <Image
                    width={450}
                    height={450}
                    className='w-7'
                    src={mensuality.category.image}
                    alt={'Icone catégorie '}
                  />
                  <p className='font-extrabold text-sm sm:text-base'>
                    {' '}
                    {mensuality.category.name}
                  </p>
                </span>
              </div>
              <div className='w-1/5 flex flex-col items-center gap-4'>
                <p className='sm:text-xl text-lg text-center font-bold break-words w-full '>
                  {' '}
                  {mensuality.price} €
                </p>
                <div>
                  <button
                    className=' p-1'
                    onClick={() => handleDelete(mensuality.id)}
                  >
                    <TrashIcon width='20' />
                  </button>
                  <button
                    onClick={() => editMensuality(mensuality)}
                    className=' p-1'
                  >
                    <EditIcon width='18' />
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <p className='text-center md:hidden text-gray-500'>
            Aucune mensualité.
          </p>
        )}
      </div>
    </section>
  );
}

function NavBar({
  setOpenCreateModal,

  categoriesData,
  searchValue,
  setSearchValue,
  setSelectedCategory,
}: {
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  categoriesData: CategoryType[] | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className='flex gap-2 w-full'>
      <div className='flex flex-1 bg-white border items-center rounded-full w-full p-1'>
        <input
          id='search'
          placeholder='Cherchez une mensualité'
          type='text'
          className='rounded-full bg-transparent flex-1 outline-none px-3 w-full min-w-[120px]'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <label htmlFor='search'>
          <SearchIcon width='20' height='20' />
        </label>
      </div>
      <Select onValueChange={setSelectedCategory}>
        <SelectTrigger className='w-auto'>
          <SelectValue placeholder='Catégorie' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'all'} className='cursor-pointer border-b'>
            <p>Toutes</p>
          </SelectItem>
          {categoriesData?.map((category, categoryIndex) => (
            <SelectItem
              key={category.id}
              value={category.id}
              className={`cursor-pointer ${
                categoryIndex === categoriesData.length - 1
                  ? 'border-none'
                  : 'border-b'
              }`}
            >
              <div className='flex flex-row items-center justify-start gap-1'>
                <Image
                  height={20}
                  width={20}
                  className='w-5 h-5 object-contain'
                  src={category.image}
                  alt='icone categorie'
                />
                <p>{category.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        onClick={() => setOpenCreateModal(true)}
        type='button'
        className='flex gap-3 p-2 lg:w-auto lg:h-auto w-10 h-10 justify-center bg-navbar items-center transition lg:hover:bg-blue rounded-full lg:rounded-md font-bold text-white'
      >
        <AddIcon width='16' height='16' />
        <p className='lg:block hidden'> Nouvelle mensualité</p>
      </button>
    </div>
  );
}
