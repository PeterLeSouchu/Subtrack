import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from '@/src/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/src/components/ui/input-otp';

import { AlertIcon } from '@/src/components/icons';
import { Button } from '@/src/components/ui/button';
import { useState } from 'react';
import { useDeleteGoogleAccount } from '../profile.service';
import { ErrorType } from '@/src/types/error-response';
import Spinner from '@/src/components/Spinner';

export default function ModalDeleteGoogleAccount({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [otpDisplay, setOtpDisplay] = useState(false);
  const [error, setError] = useState('');
  const { mutate: mutateOtpSend, isPending: isOtpSendPending } =
    useDeleteGoogleAccount();
  function closeModal() {
    setOtpDisplay(false);
    onClose();
  }
  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className='w-2/3'>
        <DialogHeader>
          <DialogTitle>Suppression du compte</DialogTitle>
        </DialogHeader>
        {error && (
          <div className='font-bold text-white rounded-md bg-red-500 p-2 flex items-center gap-2'>
            <AlertIcon width='40' height='40' />
            <p>{error}</p>
          </div>
        )}

        {isOtpSendPending ? (
          <Spinner />
        ) : otpDisplay ? (
          <>
            <p>
              Saisissez le code OTP que vous avez reçu par mail (pensez à
              vérifier vos spams) :
            </p>
            <div className='flex justify-center items-center'>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </>
        ) : (
          <>
            <DialogDescription className='flex items-start gap-2'>
              <AlertIcon width='20' height='20' />
              Attention, cette action est irréversible, êtes-vous sûr de vouloir
              supprimer votre compte ?
            </DialogDescription>
            <div className='flex justify-end gap-2'>
              <Button type='button' onClick={closeModal}>
                Annuler
              </Button>
              <Button
                onClick={() => {
                  mutateOtpSend(undefined, {
                    onSuccess: () => {
                      setOtpDisplay(true);
                    },
                    onError: (error: ErrorType) => {
                      setError(
                        error.response?.data?.message ||
                          'Une erreur est survenue'
                      );
                    },
                  });
                }}
                className='bg-navbar lg:hover:bg-blue'
                type='button'
              >
                Continuer
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
