import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select';
import { Label } from '@/src/components/ui/label';
import { useGetCategory, usePatchMensuality } from '../dashboard.service';
import { useToast } from '../../providers/Toast-provider';
import { ErrorType } from '@/src/types/error-response';
import Image from 'next/image';
import Spinner from '@/src/components/Spinner';
import { MensualityGetType } from '@/src/types/mensuality';
import { useState } from 'react';
import { AlertIcon } from '@/src/components/icons';

const schema = z.object({
  name: z.string().min(1, 'Veuillez attribuer un nom'),
  price: z.string().min(1, 'Veuillez attribuer un prix'),
  category: z.string({ required_error: 'Veuillez sélectionner une catégorie' }),
});

export default function ModalEditMensuality({
  open,
  onClose,
  mensualityToEdit,
  setMensualityToEdit,
}: {
  open: boolean;
  onClose: () => void;
  mensualityToEdit: MensualityGetType;
  setMensualityToEdit: (p: MensualityGetType | undefined) => void;
}) {
  const [errorLimit, setErrorLimit] = useState('');
  const { mutate, isPending } = usePatchMensuality();
  const { showToast } = useToast();
  const { data: categories, isLoading: categoriesLoading } = useGetCategory();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: mensualityToEdit.name,
      price: mensualityToEdit.price.toString(),
      category: mensualityToEdit.category.id,
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate(
      { ...data, id: mensualityToEdit.id },
      {
        onSuccess: (res) => {
          if (res.data.isLimitExceeded) {
            setErrorLimit(
              `Vous dépassez la limite de cette catégorie de ${res.data.limitPrice}€`
            );
          } else {
            showToast('Mensualité modifiée', 'success');
            setMensualityToEdit(undefined);
            reset();
            onClose();
          }
        },
        onError: (error: ErrorType) => {
          if (error.response.data.isLimitExceeded) {
            setErrorLimit(
              `Vous dépassez la limite de cette catégorie de ${error.response.data.limitPrice}€`
            );
          } else {
            setErrorLimit('');
            setMensualityToEdit(undefined);
            reset();
            onClose();
            showToast(error?.response?.data?.message, 'error');
          }
        },
      }
    );
  };

  function closeModal() {
    setErrorLimit('');
    setMensualityToEdit(undefined);
    reset();
    onClose();
  }

  if (categoriesLoading) return <Spinner />;

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent
        className='w-2/3'
        onOpenAutoFocus={(event) => event.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>Nouvelle mensualité</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {errorLimit && (
            <div className='font-bold text-white rounded-md  bg-red-500 p-2 flex items-center gap-2'>
              <AlertIcon width='40' height='40' />
              <p>{errorLimit}</p>
            </div>
          )}
          <div>
            <Label htmlFor='name'>Nom</Label>
            <Input
              disabled={isPending}
              {...register('name')}
              placeholder='Nom'
              id='name'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor='price'>Prix</Label>
            <Input
              disabled={isPending}
              {...register('price')}
              placeholder='Prix'
              id='price'
              onInput={(e) => {
                const value = e.currentTarget.value;

                if (value.split('.').length > 2) {
                  e.currentTarget.value = value.slice(0, -1);
                } else {
                  e.currentTarget.value = value.replace(/[^0-9.]/g, '');
                }
              }}
              onBlur={(e) => {
                const value = e.currentTarget.value;
                e.currentTarget.value = value;
              }}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <div>
                <Label htmlFor='category'>Categorie</Label>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Catégorie' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.categories.map((category, categoryIndex) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                        className={`cursor-pointer ${
                          categoryIndex === categories.categories.length - 1
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
                {errors.category && (
                  <p className='text-red-500 text-sm'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className='flex justify-end gap-2'>
            {' '}
            <Button disabled={isPending} type='button' onClick={closeModal}>
              Annuler
            </Button>
            <Button
              disabled={isPending}
              className='bg-navbar lg:hover:bg-blue'
              type='submit'
            >
              {isPending ? <Spinner /> : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
