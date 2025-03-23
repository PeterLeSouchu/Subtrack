'use client';

import {
  TrashIcon,
  UpIcon,
  EditIcon,
  SearchIcon,
  AddIcon,
} from '@/src/components/icons';
import Image from 'next/image';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/src/components/ui/table';
import { Dispatch, SetStateAction, useState } from 'react';
import { Switch } from '@/src/components/ui/switch';
import { Label } from '@/src/components/ui/label';
import { motion } from 'framer-motion';
import { useConfirm } from '../providers/Confirm-provider';
import ModalCreateMensuality from './components/Modal-create-mensuality';
import ModalEditMensuality from './components/Modal-edit-mensuality';
import {
  useDeleteMensuality,
  useGetCategory,
  useGetMensuality,
  useGetStats,
} from './dashboard.service';
import { MensualityGetType } from '@/src/types/mensuality';
import { CategoryType } from '@/src/types/category';
import Spinner from '@/src/components/Spinner';
import { StatsType } from '@/src/types/stats';
import { useToast } from '../providers/Toast-provider';

export default function Dashboard() {
  const [showGraphic, setShowGraphic] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mensualityToEdit, setMensualityToEdit] = useState<
    MensualityGetType | undefined
  >();
  const { confirm } = useConfirm();
  const { showToast } = useToast();
  const { data: mensualities, isLoading: mensualitiesLoading } =
    useGetMensuality();
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: stats, isLoading: statsLoading } = useGetStats();
  const { mutate } = useDeleteMensuality();

  const filteredMensualities = mensualities?.mensualities.filter(
    (mensuality) =>
      (selectedCategory === 'all' ||
        mensuality.category.id === selectedCategory) &&
      (mensuality.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        mensuality.price.toString().includes(searchValue) ||
        mensuality.category.name.toLowerCase().includes(searchValue))
  );

  if (mensualitiesLoading || categoriesLoading || statsLoading)
    return <Spinner />;

  async function handleDelete(id: string) {
    if (
      await confirm({
        title: 'Etes-vous sur de vouloir supprimer cette mensualité ?  ',
        confirmBtn: 'Supprimer',
      })
    ) {
      mutate(id, {
        onSuccess: () => showToast('Mensualité supprimée', 'success'),
        onError: (error) => showToast(error?.response?.data?.message, 'error'),
      });
    }
  }

  function handleEditMensuality(mensuality: MensualityGetType) {
    setMensualityToEdit(mensuality);
    setOpenEditModal(true);
  }

  return (
    <div className='flex   h-full    '>
      <div className='xl:w-2/3 w-full h-full flex overflow-y-scroll  flex-col'>
        <div className=''>
          {' '}
          <StatsHeader statsData={stats?.stats} />
        </div>
        <div className='flex items-center justify-center space-x-2 xl:hidden pt-4 '>
          <Switch
            onCheckedChange={() => setShowGraphic((value) => !value)}
            id='airplane-mode'
          />

          <Label htmlFor='airplane-mode'>Voir graphique</Label>
        </div>{' '}
        <TableMobile
          showGraphic={showGraphic}
          handleDelete={handleDelete}
          setOpenCreateModal={setOpenCreateModal}
          editMensuality={handleEditMensuality}
          mensualitiesData={filteredMensualities}
          categoriesData={categories?.categories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCategory={setSelectedCategory}
        />
        <TableDesktop
          handleDelete={handleDelete}
          setOpenCreateModal={setOpenCreateModal}
          editMensuality={handleEditMensuality}
          mensualitiesData={filteredMensualities}
          categoriesData={categories?.categories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCategory={setSelectedCategory}
        />
        <GraphicMobile showGraphic={showGraphic} />
      </div>

      <GraphicDesktop />
      <ModalCreateMensuality
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      {mensualityToEdit && (
        <ModalEditMensuality
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          mensualityToEdit={mensualityToEdit}
          setMensualityToEdit={setMensualityToEdit}
        />
      )}
    </div>
  );
}

function TableDesktop({
  handleDelete,
  setOpenCreateModal,
  mensualitiesData,
  categoriesData,
  searchValue,
  setSearchValue,
  setSelectedCategory,
  editMensuality,
}: {
  handleDelete: (id: string) => void;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  mensualitiesData: MensualityGetType[] | undefined;
  categoriesData: CategoryType[] | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  editMensuality: (mensuality: MensualityGetType) => void;
}) {
  return (
    <section className={`flex-1 p-3 w-full overflow-hidden   xl:block hidden `}>
      <div className='xl:bg-white xl:drop-shadow-md w-full h-full p-4  flex flex-col gap-4 rounded-md md:overflow-hidden overflow-y-scroll'>
        <div className='flex gap-2 w-full'>
          <div className='flex flex-1 bg-white border items-center rounded-full  w-full  p-1'>
            <input
              id='search'
              placeholder='Cherchez une mensualité'
              type='text'
              className='rounded-full bg-transparent flex-1 outline-none px-3 w-full min-w-[120px]'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <label htmlFor='search'>
              {' '}
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
                  <div className='flex  flex-row items-center justify-start gap-1'>
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
            className='flex gap-3 p-2 lg:w-auto lg:h-auto  w-10 h-10 justify-center bg-navbar items-center transition lg:hover:bg-blue rounded-full lg:rounded-md font-bold text-white'
          >
            <AddIcon width='16' height='16' />
            <p className='lg:block hidden'> Nouvelle mensualité</p>
          </button>
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
            {mensualitiesData && mensualitiesData?.length > 0 ? (
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
      </div>
    </section>
  );
}

function TableMobile({
  showGraphic,
  handleDelete,
  setOpenCreateModal,
  mensualitiesData,
  categoriesData,
  searchValue,
  setSearchValue,
  setSelectedCategory,
  editMensuality,
}: {
  showGraphic: boolean;
  handleDelete: (id: string) => void;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  mensualitiesData: MensualityGetType[] | undefined;
  categoriesData: CategoryType[] | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  editMensuality: (mensuality: MensualityGetType) => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: showGraphic ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className={`xl:flex-1 md:p-3 px-3 pt-3 pb-0 w-full md:overflow-hidden ${
        showGraphic ? 'hidden' : 'flex'
      } xl:hidden `}
    >
      <div className='xl:bg-white xl:drop-shadow-md w-full h-full p-4  flex flex-col gap-4 rounded-md md:overflow-hidden overflow-y-scroll'>
        <div className='flex gap-2 w-full'>
          <div className='flex flex-1 bg-white border items-center rounded-full  w-full  p-1'>
            <input
              id='search'
              placeholder='Cherchez une mensualité'
              type='text'
              className='rounded-full bg-transparent flex-1 outline-none px-3 w-full min-w-[120px]'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <label htmlFor='search'>
              {' '}
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
                  <div className='flex  flex-row items-center justify-start gap-1'>
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
            className='flex gap-3 p-2 lg:w-auto lg:h-auto  w-10 h-10 justify-center bg-navbar items-center transition lg:hover:bg-blue rounded-full lg:rounded-md font-bold text-white'
          >
            <AddIcon width='16' height='16' />
            <p className='lg:block hidden'> Nouvelle mensualité</p>
          </button>
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
            {mensualitiesData && mensualitiesData?.length > 0 ? (
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
            </article>
          ))
        ) : (
          <p className='text-center text-gray-500'>Aucune mensualité.</p>
        )}
      </div>
    </motion.section>
  );
}

function GraphicMobile({ showGraphic }: { showGraphic: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: showGraphic ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className={`    h-full w-full ${
        showGraphic ? 'block' : 'hidden'
      } xl:hidden   `}
    >
      <section className='py-3 px-3 h-full rounded-md '>
        <div className='h-full w-full drop-shadow-md rounded-md '>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
            tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
            obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto impedit
            atque et facilis?
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
            tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
            obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto impedit
            atque et facilis?
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
            tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
            obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto impedit
            atque et facilis?
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function GraphicDesktop() {
  return (
    <div className='w-1/3 hidden   h-full    xl:block'>
      <section className=' p-3 h-full rounded-md '>
        <div className='bg-white h-full w-full p-3 drop-shadow-md rounded-md '>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
            tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
            obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto impedit
            atque et facilis?
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
            tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
            obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto impedit
            atque et facilis?
          </div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
            tenetur accusantium, magnam sit ipsum earum ex quos. Corrupti
            obcaecati rem provident? Sunt nesciunt voluptas vitae, iusto impedit
            atque et facilis?
          </div>
        </div>
      </section>
    </div>
  );
}

function StatsHeader({ statsData }: { statsData: StatsType | undefined }) {
  return (
    <section className='flex py-3 px-3  justify-start items-center  w-full overflow-x-scroll gap-3 '>
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap '>
        <span className='text-[#D6A514] font-black lg:text-4xl text-lg'>
          {statsData?.totalPrice || 0} €
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>
          Montant total
        </h3>
      </article>
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap'>
        <span className='text-[#2C4A7B] font-black lg:text-4xl text-lg'>
          # {statsData?.totalMensuality || 0}
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>
          Nombre de mensualités
        </h3>
      </article>
      <article className='flex flex-1 flex-col bg-white drop-shadow-md rounded-lg p-3 lg:h-20  text-nowrap'>
        <span className='text-[#43669D] font-black lg:text-4xl text-lg flex gap-1 items-center'>
          {statsData?.averagePrice || 0} €
        </span>
        <h3 className='text-stattext font-bold text-left text-sm'>Moyenne</h3>
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
  );
}
