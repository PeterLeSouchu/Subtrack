import { CategoryType } from "@/src/types/category";
import { MensualityGetType } from "@/src/types/mensuality";
import { EditIcon, SearchIcon, TrashIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/src/components/ui/table";
import { AddIcon } from "@/src/components/icons";
import { CategoryChip } from "./Category-chip";
import { motion } from "framer-motion";

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
  isDashboard = true,
}: {
  handleDelete?: (mensuality: MensualityGetType) => void;
  setOpenCreateModal?: Dispatch<SetStateAction<boolean>>;
  mensualitiesData: MensualityGetType[] | undefined;
  categoriesData: CategoryType[] | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  editMensuality?: (mensuality: MensualityGetType) => void;
  showGraphic: boolean;
  isDashboard?: boolean;
}) {
  const hasData = mensualitiesData && mensualitiesData.length > 0;
  const showActions = isDashboard && editMensuality && handleDelete;

  return (
    <section
      className={`min-w-0 flex-1 ${showGraphic ? 'hidden' : 'block'} xl:block`}
    >
      <div className='overflow-hidden rounded-2xl border border-line bg-white shadow-card'>
        <NavBar
          setOpenCreateModal={setOpenCreateModal}
          categoriesData={categoriesData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCategory={setSelectedCategory}
          isDashboard={isDashboard}
        />

        <Table className='hidden w-full md:table'>
          <TableHeader>
            <TableRow className='hover:bg-transparent'>
              <TableHead className='px-5'>Catégorie</TableHead>
              <TableHead className='px-5'>Nom</TableHead>
              <TableHead className='px-5 text-right'>Prix</TableHead>
              {showActions && <TableHead className='w-24 px-5'></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasData ? (
              mensualitiesData.map((mensuality, index) => (
                <TableRow key={index} className='group'>
                  <TableCell className='px-5 py-3.5'>
                    <CategoryChip
                      name={mensuality.category.name}
                      image={mensuality.category.image}
                    />
                  </TableCell>
                  <TableCell className='px-5 py-3.5 font-semibold text-ink'>
                    {mensuality.name}
                  </TableCell>
                  <TableCell className='px-5 py-3.5 text-right font-semibold tabular-nums text-ink'>
                    {mensuality.price} €
                  </TableCell>
                  {showActions && (
                    <TableCell className='px-5 py-3.5'>
                      <div className='flex justify-end gap-1'>
                        <button
                          onClick={() => editMensuality(mensuality)}
                          aria-label={`Modifier ${mensuality.name}`}
                          className='rounded-md p-2 text-stattext transition-colors hover:bg-brand-50 hover:text-brand-700'
                        >
                          <EditIcon width='16' height='16' />
                        </button>
                        <button
                          onClick={() => handleDelete(mensuality)}
                          aria-label={`Supprimer ${mensuality.name}`}
                          className='rounded-md p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600'
                        >
                          <TrashIcon width='16' height='16' />
                        </button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow className='hover:bg-transparent'>
                <TableCell colSpan={4} className='p-0'>
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className='md:hidden'>
          {hasData ? (
            <ul className='divide-y divide-line'>
              {mensualitiesData.map((mensuality, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showGraphic ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className='flex items-center gap-3 px-4 py-3.5'
                  key={index}
                >
                  <div className='flex min-w-0 flex-1 flex-col gap-2'>
                    <p className='truncate font-semibold text-ink'>
                      {mensuality.name}
                    </p>
                    <CategoryChip
                      name={mensuality.category.name}
                      image={mensuality.category.image}
                    />
                  </div>
                  <div className='flex flex-col items-end gap-1'>
                    <p className='font-display text-lg font-semibold tabular-nums text-ink'>
                      {mensuality.price} €
                    </p>
                    {showActions && (
                      <div className='flex'>
                        <button
                          onClick={() => editMensuality(mensuality)}
                          aria-label={`Modifier ${mensuality.name}`}
                          className='rounded-md p-2 text-stattext transition-colors hover:bg-brand-50 hover:text-brand-700'
                        >
                          <EditIcon width='16' height='16' />
                        </button>
                        <button
                          onClick={() => handleDelete(mensuality)}
                          aria-label={`Supprimer ${mensuality.name}`}
                          className='rounded-md p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600'
                        >
                          <TrashIcon width='16' height='16' />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className='flex flex-col items-center gap-3 px-4 py-14 text-center'>
      <Image
        width={200}
        height={200}
        src='https://res.cloudinary.com/dix2wzs7n/image/upload/v1742933761/d82emd9fze6brfxsoxt4.webp'
        alt=''
        className='w-24'
      />
      <p className='text-stattext'>Aucune mensualité.</p>
    </div>
  );
}

function NavBar({
  setOpenCreateModal,

  categoriesData,
  searchValue,
  setSearchValue,
  setSelectedCategory,
  isDashboard,
}: {
  setOpenCreateModal?: Dispatch<SetStateAction<boolean>>;
  categoriesData: CategoryType[] | undefined;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  isDashboard: boolean;
}) {
  return (
    <div className='flex items-center gap-2 border-b border-line p-3 md:p-4'>
      <div className='relative min-w-0 flex-1'>
        <label htmlFor='search' className='sr-only'>
          Rechercher
        </label>
        <SearchIcon
          className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stattext'
          aria-hidden='true'
        />
        <input
          id='search'
          placeholder='Rechercher par nom, catégorie ou prix'
          type='text'
          className='h-10 w-full truncate rounded-lg border border-input bg-white pl-9 pr-3 text-sm shadow-card transition-colors placeholder:text-muted-foreground/70 hover:border-brand-300 focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/15'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Select onValueChange={setSelectedCategory}>
        <SelectTrigger className='w-auto min-w-[7.5rem]'>
          <SelectValue placeholder='Catégorie' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={'all'}>
            <p>Toutes</p>
          </SelectItem>
          {categoriesData?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className='flex flex-row items-center justify-start gap-2'>
                <Image
                  height={20}
                  width={20}
                  className='h-5 w-5 object-contain'
                  src={category.image}
                  alt=''
                />
                <p>{category.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isDashboard && setOpenCreateModal && (
        <button
          onClick={() => setOpenCreateModal(true)}
          type='button'
          className='flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-semibold text-white shadow-card transition-colors hover:bg-brand-700 lg:w-auto lg:px-4'
        >
          <AddIcon width='14' height='14' />
          <span className='hidden lg:block'>Nouvelle mensualité</span>
          <span className='sr-only lg:hidden'>Nouvelle mensualité</span>
        </button>
      )}
    </div>
  );
}
