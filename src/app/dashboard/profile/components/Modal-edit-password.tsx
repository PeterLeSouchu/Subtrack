import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
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
import { useEditPassword } from '../profile.service';
import { AlertIcon, EyeOpenIcon, EyeCloseIcon } from '@/src/components/icons';
import Spinner from '@/src/components/Spinner';

export const editPasswordSchema = z
  .object({
    formerPassword: z.string(),
    password: z
      .string()
      .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, {
        message:
          'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
      }),

    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Les mots de passe ne correspondent pas',
  });

export default function ModalEditPassword({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [errorPassword, setErrorPassword] = useState('');
  const { mutate, isPending } = useEditPassword();
  const { showToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showFormerPassword, setShowFormerPassword] = useState(false);

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
        setErrorPassword('');
        onClose();
        reset();
      },
      onError: (error: ErrorType) => {
        if (
          error.response.data.passwordNotMatch ||
          error.response.data.notGoodPassword
        ) {
          setErrorPassword(error.response.data.message);
        } else {
          showToast(error?.response?.data?.message, 'error');
          setErrorPassword('');
          onClose();
          reset();
        }
      },
    });
  };

  function closeModal() {
    setErrorPassword('');
    onClose();
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification du mot de passe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          {errorPassword && (
            <div className='flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-100'>
              <AlertIcon width='20' height='20' className='mt-0.5 shrink-0' />
              <p>{errorPassword}</p>
            </div>
          )}
          <div>
            <Label htmlFor='formerPassword' className='mb-1.5 block'>Mot de passe actuel</Label>
            <div className='relative'>
              <Input
                disabled={isPending}
                {...register('formerPassword')}
                placeholder='Mot de passe'
                id='formerPassword'
                type={showFormerPassword ? 'text' : 'password'}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground' aria-label='Afficher ou masquer le mot de passe'
                onClick={() => setShowFormerPassword(!showFormerPassword)}
              >
                {showFormerPassword ? (
                  <EyeCloseIcon width='15' height='15' />
                ) : (
                  <EyeOpenIcon width='15' height='15' />
                )}
              </button>
            </div>
            {errors.formerPassword?.message && (
              <p className='mt-1.5 text-sm font-medium text-destructive'>
                {errors.formerPassword.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor='password' className='mb-1.5 block'>Nouveau mot de passe</Label>
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
          <div>
            <Label htmlFor='passwordConfirm' className='mb-1.5 block'>Confirmez le mot de passe</Label>
            <div className='relative'>
              <Input
                disabled={isPending}
                {...register('passwordConfirm')}
                placeholder='Mot de passe'
                id='passwordConfirm'
                type={showConfirmPassword ? 'text' : 'password'}
              />
              <button
                type='button'
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground' aria-label='Afficher ou masquer le mot de passe'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeCloseIcon width='15' height='15' />
                ) : (
                  <EyeOpenIcon width='15' height='15' />
                )}
              </button>
            </div>
            {errors.passwordConfirm?.message && (
              <p className='mt-1.5 text-sm font-medium text-destructive'>
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='outline' disabled={isPending} type='button' onClick={closeModal}>
              Annuler
            </Button>
            <Button
              disabled={isPending}
              type='submit'
            >
              {isPending ? <Spinner color='border-white' /> : 'Modifier'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
