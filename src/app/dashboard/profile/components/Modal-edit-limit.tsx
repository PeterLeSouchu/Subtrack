import { useForm } from 'react-hook-form';
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

import { Label } from '@/src/components/ui/label';
import { useToast } from '../../../providers/Toast-provider';
import { ErrorType } from '@/src/types/error-response';

import { usePatchLimit } from '../profile.service';
import { Limit } from '@/src/types/category';
import Image from 'next/image';
import { useState } from 'react';
import { AlertIcon } from '@/src/components/icons';

const schema = z.object({
  price: z.string().min(1, 'Veuillez attribuer un prix'),
});

export default function ModalEditLimit({
  open,
  onClose,
  limitToEdit,
  setLimitToEdit,
}: {
  open: boolean;
  onClose: () => void;
  limitToEdit: Limit;
  setLimitToEdit: (p: Limit | undefined) => void;
}) {
  const [errorLimit, setErrorLimit] = useState('');
  const { mutate } = usePatchLimit();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: limitToEdit.price.toString(),
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate(
      { ...data, id: limitToEdit.id },
      {
        onSuccess: () => {
          showToast('Limite modifiée', 'success');
          setLimitToEdit(undefined);
          setErrorLimit('');
          reset();
          onClose();
        },
        onError: (error: ErrorType) => {
          if (error.response.data.isLimitExceeded) {
            setErrorLimit(
              `Les mensualités dépassent cette limite budgétaire de ${error.response.data.limitPrice}€`
            );
          } else {
            showToast(error?.response?.data?.message, 'error');
            setLimitToEdit(undefined);
            setErrorLimit('');
            onClose();
            reset();
          }
        },
      }
    );
  };

  function closeModal() {
    setErrorLimit('');
    setLimitToEdit(undefined);
    reset();
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent
        className='w-2/3'
        onOpenAutoFocus={(event) => event.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className='text-center'>
            Modification de la catégorie :{' '}
          </DialogTitle>
          <div className='flex justify-center items-center gap-3'>
            <span className='bg-[#E8E5FF]  text-blue w-fit font-semibold py-1 px-2 flex items-center gap-2 rounded-xl'>
              <div className='w-7 h-7 overflow-hidden'>
                <Image
                  width={28}
                  height={28}
                  className='object-contain'
                  src={limitToEdit.category.image}
                  alt='Icone catégorie'
                />
              </div>
              <p className='font-extrabold text-sm sm:text-base'>
                {limitToEdit.category.name}
              </p>
            </span>{' '}
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          {errorLimit && (
            <div className='font-bold text-white rounded-md  bg-red-500 p-2 flex items-center gap-2'>
              <AlertIcon width='40' height='40' />
              <p>{errorLimit}</p>
            </div>
          )}
          <div>
            <Label htmlFor='price'>Prix</Label>
            <Input
              {...register('price')}
              placeholder='Prix'
              id='price'
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ''
                );
              }}
            />
            {errors.price && (
              <p className='text-red-500 text-sm'>{errors.price.message}</p>
            )}
          </div>

          <div className='flex justify-end gap-2'>
            {' '}
            <Button type='button' onClick={closeModal}>
              Annuler
            </Button>
            <Button className='bg-navbar lg:hover:bg-blue' type='submit'>
              Ajouter
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
