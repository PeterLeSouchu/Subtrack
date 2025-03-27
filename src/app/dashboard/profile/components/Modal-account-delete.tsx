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
import { AlertIcon, EyeCloseIcon, EyeOpenIcon } from '@/src/components/icons';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import Spinner from '@/src/components/Spinner';

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
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useDeleteAccount();
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
        setError('');
        onClose();
        reset();
        signOut();
      },
      onError: (error: ErrorType) => {
        if (error.response.data.notGoodPassword) {
          setError(error.response.data.message);
        } else {
          setError('');
          showToast(error?.response?.data?.message, 'error');
          onClose();
          reset();
        }
      },
    });
  };

  function closeModal() {
    setError('');
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
          {error && (
            <div className='font-bold text-white rounded-md bg-red-500 p-2 flex items-center gap-2'>
              <AlertIcon width='40' height='40' />
              <p>{error}</p>
            </div>
          )}
          <div>
            <Label htmlFor='password'>Mot de passe</Label>
            <div className='relative'>
              <Input
                disabled={isPending}
                {...register('password')}
                placeholder='Mot de passe'
                id='password'
                type={showPassword ? 'text' : 'password'}
              />
              <button
                type='button'
                className='absolute right-2 top-2'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeCloseIcon width='15' height='15' />
                ) : (
                  <EyeOpenIcon width='15' height='15' />
                )}
              </button>
            </div>
            {errors.password?.message && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

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
              {isPending ? <Spinner /> : 'Supprimer mon compte'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
