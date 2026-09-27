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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Supression du compte</DialogTitle>
        </DialogHeader>
        <DialogDescription className='flex items-start gap-2'>
          <AlertIcon width='20' height='20' />
          Entrez votre mot de passe pour valider la suppresion de votre compte.
          Attention, cette action est irréversible.
        </DialogDescription>
        {}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {error && (
            <div className='flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-100'>
              <AlertIcon width='20' height='20' className='mt-0.5 shrink-0' />
              <p>{error}</p>
            </div>
          )}
          <div>
            <Label htmlFor='password' className='mb-1.5 block'>Mot de passe</Label>
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
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground' aria-label='Afficher ou masquer le mot de passe'
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
              <p className='mt-1.5 text-sm font-medium text-destructive'>{errors.password.message}</p>
            )}
          </div>

          <div className='flex justify-end gap-2'>
            {' '}
            <Button variant='outline' disabled={isPending} type='button' onClick={closeModal}>
              Annuler
            </Button>
            <Button
              disabled={isPending}
              variant='destructive'
              type='submit'
            >
              {isPending ? <Spinner color='border-white' /> : 'Supprimer mon compte'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
