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
import Spinner from '@/src/components/Spinner';
import { useGetAvailableCategory, usePostLimit } from '../profile.service';

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
  const { mutate } = usePostLimit();
  const { showToast } = useToast();
  const { data: categories, isLoading: categoriesLoading } =
    useGetAvailableCategory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log('Data:', data);
    mutate(data, {
      onSuccess: () => showToast('Limite ajoutée', 'success'),
      onError: (error: ErrorType) =>
        showToast(error?.response?.data?.message, 'error'),
    });
    onClose();
    reset();
  };

  function closeModal() {
    onClose();
    reset();
  }

  if (categoriesLoading) return <Spinner />;

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className='w-2/3'>
        <DialogHeader>
          <DialogTitle>Nouvelle limite budgétaire</DialogTitle>
        </DialogHeader>
        {}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <div>
                <Label htmlFor='category'>Categorie</Label>
                <Select onValueChange={field.onChange} value={field.value}>
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
