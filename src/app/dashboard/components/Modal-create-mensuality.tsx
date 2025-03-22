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
import { usePostMensuality } from '../dashboard.service';
import { useToast } from '../../providers/Toast-provider';
import { ErrorType } from '@/src/types/error-response';

const schema = z.object({
  name: z.string().min(1, 'Veuillez attribuer un nom'),
  price: z.string().min(1, 'Veuillez attribuer un prix'),
  category: z.string({ required_error: 'Veuillez sélectionner une catégorie' }),
});

const categoryOptions = [
  { name: 'Logement', id: '1' },
  { name: 'Transport', id: '2' },
  { name: 'Assurances', id: '3' },
  { name: 'Alimentation', id: '4' },
  { name: 'Loisirs', id: '5' },
  { name: 'Crédits', id: '6' },
  { name: 'Épargne', id: '7' },
  { name: 'Santé', id: '8' },
  { name: 'Éducation', id: '9' },
  { name: 'Services', id: '10' },
  { name: 'Autres', id: '11' },
];

export default function ModalCreateMensuality({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { mutate } = usePostMensuality();
  const { showToast } = useToast();
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
      onSuccess: () => showToast('Mensualité ajoutée', 'success'),
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

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className='w-2/3'>
        <DialogHeader>
          <DialogTitle>Nouvelle mensualité</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='name'>Nom</Label>
            <Input {...register('name')} placeholder='Nom' id='name' />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
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
                    {categoryOptions.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
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
