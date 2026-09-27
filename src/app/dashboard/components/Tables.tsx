import { CategoryType } from "@/src/types/category";
import { MensualityGetType } from "@/src/types/mensuality";
import { PencilLine, Plus, SearchIcon, Trash2 } from "lucide-react";
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
import { Button } from "@/src/components/ui/button";
import { CategoryChip, CategoryIcon } from "./Category-chip";
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
      className={`min-w-0 flex-1 ${showGraphic ? "hidden" : "block"} xl:block`}
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink/5">
        <NavBar
          setOpenCreateModal={setOpenCreateModal}
          categoriesData={categoriesData}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setSelectedCategory={setSelectedCategory}
          isDashboard={isDashboard}
        />

        <Table className="hidden w-full md:table">
          <TableHeader>
            <TableRow className="border-line bg-slate-50/70 hover:bg-slate-50/70">
              <TableHead className="h-10 px-5 text-xs font-medium text-stattext">
                Mensualité
              </TableHead>
              <TableHead className="h-10 px-5 text-xs font-medium text-stattext">
                Catégorie
              </TableHead>
              <TableHead className="h-10 px-5 text-right text-xs font-medium text-stattext">
                Prix
              </TableHead>
              {showActions && <TableHead className="h-10 w-24 px-5" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasData ? (
              mensualitiesData.map((mensuality, index) => (
                <TableRow
                  key={index}
                  className="group border-line hover:bg-brand-50/40"
                >
                  <TableCell className="px-5 py-4 font-medium text-ink">
                    {mensuality.name}
                  </TableCell>
                  <TableCell className="px-5 py-4">
                    <CategoryChip
                      name={mensuality.category.name}
                      image={mensuality.category.image}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 text-right font-semibold text-ink">
                    {mensuality.price} €
                  </TableCell>
                  {showActions && (
                    <TableCell className="px-5 py-4">
                      <RowActions
                        name={mensuality.name}
                        onEdit={() => editMensuality(mensuality)}
                        onDelete={() => handleDelete(mensuality)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="p-0">
                  <EmptyState
                    onCreate={
                      isDashboard && setOpenCreateModal
                        ? () => setOpenCreateModal(true)
                        : undefined
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="md:hidden">
          {hasData ? (
            <ul className="divide-y divide-line">
              {mensualitiesData.map((mensuality, index) => (
                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showGraphic ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 px-4 py-3"
                  key={index}
                >
                  <CategoryIcon image={mensuality.category.image} />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <p className="truncate font-medium text-ink">
                      {mensuality.name}
                    </p>
                    <p className="truncate text-xs text-stattext">
                      {mensuality.category.name}
                    </p>
                  </div>
                  <p className="font-semibold text-ink">{mensuality.price} €</p>
                  {showActions && (
                    <RowActions
                      name={mensuality.name}
                      onEdit={() => editMensuality(mensuality)}
                      onDelete={() => handleDelete(mensuality)}
                      alwaysVisible
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          ) : (
            <EmptyState
              onCreate={
                isDashboard && setOpenCreateModal
                  ? () => setOpenCreateModal(true)
                  : undefined
              }
            />
          )}
        </div>

        {hasData && (
          <div className="border-t border-line bg-slate-50/50 px-5 py-3 text-xs text-stattext">
            {mensualitiesData.length}{" "}
            {mensualitiesData.length > 1 ? "mensualités" : "mensualité"}
          </div>
        )}
      </div>
    </section>
  );
}

function RowActions({
  name,
  onEdit,
  onDelete,
  alwaysVisible = false,
}: {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
  alwaysVisible?: boolean;
}) {
  return (
    <div
      className={`flex justify-end gap-0.5 transition-opacity ${
        alwaysVisible
          ? ""
          : "opacity-60 group-hover:opacity-100 focus-within:opacity-100"
      }`}
    >
      <button
        onClick={onEdit}
        aria-label={`Modifier ${name}`}
        className="rounded-lg p-2 text-stattext transition-colors hover:bg-brand-50 hover:text-brand-700"
      >
        <PencilLine className="h-4 w-4" />
      </button>
      <button
        onClick={onDelete}
        aria-label={`Supprimer ${name}`}
        className="rounded-lg p-2 text-stattext transition-colors hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 ring-1 ring-inset ring-brand-100">
        <Image
          width={200}
          height={200}
          src="https://res.cloudinary.com/dix2wzs7n/image/upload/v1742933761/d82emd9fze6brfxsoxt4.webp"
          alt=""
          className="w-9"
        />
      </span>
      <div>
        <p className="font-semibold text-ink">Aucune mensualité</p>
        <p className="mt-1 text-sm text-stattext">
          {onCreate
            ? "Ajoutez votre première mensualité pour commencer le suivi."
            : "Aucun résultat pour cette recherche."}
        </p>
      </div>
      {onCreate && (
        <Button onClick={onCreate} className="mt-2">
          <Plus />
          Nouvelle mensualité
        </Button>
      )}
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
    <div className="flex items-center gap-2 p-3 md:p-4">
      <div className="relative min-w-0 flex-1">
        <label htmlFor="search" className="sr-only">
          Rechercher
        </label>
        <SearchIcon
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stattext"
          aria-hidden="true"
        />
        <input
          id="search"
          placeholder="Rechercher par nom, catégorie ou prix"
          type="text"
          className="h-10 w-full truncate rounded-xl border-0 bg-slate-50 pl-9 pr-3 text-sm ring-1 ring-inset ring-ink/5 transition placeholder:text-muted-foreground/70 hover:ring-ink/10 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Select onValueChange={setSelectedCategory}>
        <SelectTrigger className="h-10 w-auto min-w-[8rem]">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={"all"}>
            <p>Toutes</p>
          </SelectItem>
          {categoriesData?.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              <div className="flex flex-row items-center justify-start gap-2">
                <Image
                  height={20}
                  width={20}
                  className="h-5 w-5 object-contain"
                  src={category.image}
                  alt=""
                />
                <p>{category.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isDashboard && setOpenCreateModal && (
        <Button
          onClick={() => setOpenCreateModal(true)}
          type="button"
          className="w-10 shrink-0 px-0 lg:w-auto lg:px-4"
        >
          <Plus />
          <span className="hidden lg:block">Nouvelle mensualité</span>
          <span className="sr-only lg:hidden">Nouvelle mensualité</span>
        </Button>
      )}
    </div>
  );
}
