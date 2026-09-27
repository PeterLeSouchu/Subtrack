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
import { useToast } from '../../../providers/Toast-provider';
import { ErrorType } from '@/src/types/error-response';
import Image from 'next/image';

import { useGetAvailableCategory, usePostLimit } from '../profile.service';
import { useState } from 'react';
import { AlertIcon } from '@/src/components/icons';
import Spinner from '@/src/components/Spinner';

const schema = z.object({
  price: z.string().min(1, 'Veuillez attribuer un prix'),
  category: z.string({ required_error: 'Veuillez sélectionner une catégorie' }),
});

export default function ModalCreateLimit({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [errorLimit, setErrorLimit] = useState('');
  const { mutate, isPending } = usePostLimit();
  const { showToast } = useToast();
  const { data: categories } = useGetAvailableCategory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    mutate(data, {
      onSuccess: () => {
        showToast('Limite ajoutée', 'success');
        setErrorLimit('');
        onClose();
        reset();
      },
      onError: (error: ErrorType) => {
        if (error.response.data.isLimitExceeded) {
          setErrorLimit(
            `Les mensualités dépassent cette limite budgétaire de ${error.response.data.limitPrice}€`
          );
        } else {
          showToast(error?.response?.data?.message, 'error');
          setErrorLimit('');
          onClose();
          reset();
        }
      },
    });
  };

  function closeModal() {
    setErrorLimit('');
    onClose();
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvelle limite budgétaire</DialogTitle>
        </DialogHeader>
        {}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {errorLimit && (
            <div className='flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-100'>
              <AlertIcon width='20' height='20' className='mt-0.5 shrink-0' />
              <p>{errorLimit}</p>
            </div>
          )}
          <div>
            <Label htmlFor='price' className='mb-1.5 block'>Prix</Label>
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
              <p className='mt-1.5 text-sm font-medium text-destructive'>{errors.price.message}</p>
            )}
          </div>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <div>
                <Label htmlFor='category' className='mb-1.5 block'>Categorie</Label>
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
                  <p className='mt-1.5 text-sm font-medium text-destructive'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            )}
          />
          <div className='flex justify-end gap-2'>
            {' '}
            <Button variant='outline' disabled={isPending} type='button' onClick={closeModal}>
              Annuler
            </Button>
            <Button
              disabled={isPending || !isValid}
              type='submit'
            >
              {isPending ? <Spinner color='border-white' /> : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
