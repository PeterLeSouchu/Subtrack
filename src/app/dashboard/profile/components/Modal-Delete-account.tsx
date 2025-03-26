import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Label } from '@/src/components/ui/label';
import { useToast } from '../../../providers/Toast-provider';
import { ErrorType } from '@/src/types/error-response';
import { useDeleteAccount } from '../profile.service';
import { AlertIcon } from '@/src/components/icons';

export const editPasswordSchema = z.object({
  password: z.string(),
});

export default function ModalDeleteAccount({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { mutate } = useDeleteAccount();
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(editPasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof editPasswordSchema>) => {
    mutate(data, {
      onSuccess: () => {
        showToast('Mot de passe modifié', 'success');
        onClose();
        reset();
      },
      onError: (error: ErrorType) => {
        showToast(error?.response?.data?.message, 'error');
        onClose();
        reset();
      },
    });
  };

  function closeModal() {
    onClose();
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className='w-2/3'>
        <DialogHeader>
          <DialogTitle>Supression du compte</DialogTitle>
        </DialogHeader>
        <DialogDescription className='flex items-start gap-2'>
          <AlertIcon width='20' height='20' />
          Entrez votre mot de passe pour valider la suppresion de votre compte.
          Attention, cette action est irréversible.
        </DialogDescription>
        {}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='password'>Mot de passe</Label>
            <Input
              {...register('password')}
              placeholder='Mot de passe'
              id='formerPassword'
            />
            {errors.password?.message && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex justify-end gap-2'>
            {' '}
            <Button type='button' onClick={closeModal}>
              Annuler
            </Button>
            <Button className='bg-navbar lg:hover:bg-blue' type='submit'>
              Modifier
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
