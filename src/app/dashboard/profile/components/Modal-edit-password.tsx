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
import { useEditPassword } from '../profile.service';

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
  const { mutate } = useEditPassword();
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
          <DialogTitle>Modification du mot de passe</DialogTitle>
        </DialogHeader>
        {}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='formerPassword'>Mot de passe actuel</Label>
            <Input
              {...register('formerPassword')}
              placeholder='Mot de passe'
              id='formerPassword'
            />
            {errors.formerPassword?.message && (
              <p className='text-red-500 text-sm'>
                {errors.formerPassword.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor='password'>Nouveau mot de passe</Label>
            <Input
              {...register('password')}
              placeholder='Mot de passe'
              id='password'
            />
            {errors.password?.message && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor='passwordConfirm'>Confirmez le mot de passe</Label>
            <Input
              {...register('passwordConfirm')}
              placeholder='Mot de passe'
              id='passwordConfirm'
            />
            {errors.passwordConfirm?.message && (
              <p className='text-red-500 text-sm'>
                {errors.passwordConfirm.message}
              </p>
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
