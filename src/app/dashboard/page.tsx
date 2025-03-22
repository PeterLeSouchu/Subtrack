'use client';

import {
  BalanceIcon,
  TrashIcon,
  UpIcon,
  EditIcon,
  SearchIcon,
  AddIcon,
} from '@/src/components/icons';

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
import { usePostMensuality } from './dashboard.service';
import { useToast } from '../providers/Toast-provider';
import { useConfirm } from '../providers/Confirm-provider';
import ModalCreateMensuality from './components/Modal-create-mensuality';
import ModalEditMensuality from './components/Modal-edit-mensuality';

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
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
  { category: 'Sécurité', icon: '❤️‍🩹', name: 'Gaz', price: '450€' },
];

export default function Dashboard() {
  const [showGraphic, setShowGraphic] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const { mutate } = usePostMensuality();

  async function handleDelete() {
    console.log('teststs');
    if (
      await confirm({
        title:
          'Etes-vous sur de vouloir supprimer cette mensualité Etes-vous sur de vouloir supprimer cette mensualité Etes-vous sur de vouloir supprimer cette mensualité Etes-vous sur de vouloir supprimer cette mensualité Etes-vous sur de vouloir supprimer cette mensualité v ',
        confirmBtn: 'Supprimer',
      })
    ) {
      console.log('la confirm modal fonctionne');
    }
  }

  function handleTestApi() {
    mutate(
      { name: 'hello', price: 3, category: 'dd' },
      {
        onSuccess: () => showToast("tout s'est tres  bien passé", 'success'),
        onError: () => showToast('voici la notif', 'error'),
      }
    );
  }

  return (
    <div className='flex   h-full    '>
      <div className='xl:w-2/3 w-full h-full flex overflow-y-scroll  flex-col'>
        <div className=''>
          {' '}
          <StatsHeader />
        </div>
        <div className='flex items-center justify-center space-x-2 xl:hidden pt-4 '>
          <Switch
            onCheckedChange={() => setShowGraphic((value) => !value)}
            id='airplane-mode'
          />
          <button className='bg-red-500 p-3' onClick={handleTestApi}>
            {' '}
            test api route
          </button>
          <Label htmlFor='airplane-mode'>Voir graphique</Label>
        </div>{' '}
        <TableMobile
          showGraphic={showGraphic}
          handleDelete={handleDelete}
          setOpenCreateModal={setOpenCreateModal}
          setOpenEditModal={setOpenEditModal}
        />
        <TableDesktop
          handleDelete={handleDelete}
          setOpenCreateModal={setOpenCreateModal}
          setOpenEditModal={setOpenEditModal}
        />
        <GraphicMobile showGraphic={showGraphic} />
      </div>

      <GraphicDesktop />
      <ModalCreateMensuality
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      <ModalEditMensuality
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
}

function StatsHeader() {
  return (
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

function TableDesktop({
  handleDelete,
  setOpenCreateModal,
  setOpenEditModal,
}: {
  handleDelete: () => void;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
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
            />
            <label htmlFor='search'>
              {' '}
              <SearchIcon width='20' height='20' />
            </label>
          </div>
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
            {data.map((item, index) => (
              <TableRow key={index} className='border-t p-0 border-gray-200'>
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
                  <button
                    className=' hover:bg-red-200 transition p-1 rounded-full'
                    onClick={handleDelete}
                  >
                    <TrashIcon width='18' />
                  </button>
                  <button
                    onClick={() => setOpenEditModal(true)}
                    className=' hover:bg-amber-100 transition p-1 rounded-full'
                  >
                    <EditIcon width='16' />
                  </button>
                </TableCell>
              </TableRow>
            ))}
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
  setOpenEditModal,
}: {
  showGraphic: boolean;
  handleDelete: () => void;
  setOpenCreateModal: Dispatch<SetStateAction<boolean>>;
  setOpenEditModal: Dispatch<SetStateAction<boolean>>;
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
            />
            <label htmlFor='search'>
              {' '}
              <SearchIcon width='20' height='20' />
            </label>
          </div>
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
            {data.map((item, index) => (
              <TableRow key={index} className='border-t p-0 border-gray-200'>
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
                <button className=' p-1' onClick={handleDelete}>
                  <TrashIcon width='20' />
                </button>
                <button onClick={() => setOpenEditModal(true)} className=' p-1'>
                  <EditIcon width='18' />
                </button>
              </div>
            </div>
          </article>
        ))}
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
