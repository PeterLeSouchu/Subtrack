import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/src/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/src/components/ui/input-otp';
import { AlertIcon } from '@/src/components/icons';
import { Button } from '@/src/components/ui/button';
import { useState } from 'react';
import { useSendOtpAccount, useVerifOtpAccount } from '../profile.service';
import { ErrorType } from '@/src/types/error-response';
import Spinner from '@/src/components/Spinner';
import { signOut } from 'next-auth/react';

export default function ModalDeleteGoogleAccount({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [otpDisplay, setOtpDisplay] = useState(false);
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { mutate: mutateOtpSend, isPending: isOtpSendPending } =
    useSendOtpAccount();
  const { mutate: mutateOtpVerif, isPending: isOtpVerifPending } =
    useVerifOtpAccount();

  function closeModal() {
    onClose();
    setOtpDisplay(false);
    setOtp('');
    setError('');
  }

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setError('Veuillez entrer le code OTP');
      return;
    }

    mutateOtpVerif(
      { otp },
      {
        onSuccess: () => {
          closeModal();
          signOut();
        },
        onError: (error: ErrorType) => {
          console.log(error.response.data);
          setError(error.response?.data?.message || 'Une erreur est survenue');
        },
      }
    );
  };

  function handleSentOtp() {
    mutateOtpSend(undefined, {
      onSuccess: () => setOtpDisplay(true),
      onError: (error: ErrorType) => {
        setError(error.response?.data?.message || 'Une erreur est survenue');
      },
    });
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

        {otpDisplay ? (
          <>
            <p>
              Saisissez le code OTP que vous avez reçu par mail (pensez à
              vérifier vos spams) :
            </p>
            <div className='flex justify-center items-center'>
              <InputOTP
                maxLength={6}
                disabled={isOtpVerifPending}
                value={otp}
                onChange={handleOtpChange}
              >
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
            <div className='flex justify-end gap-2 mt-4'>
              <Button disabled={isOtpVerifPending} onClick={closeModal}>
                Annuler
              </Button>
              <Button
                onClick={handleVerifyOtp}
                className='bg-brand-600 text-white transition hover:bg-brand-700'
                type='button'
                disabled={isOtpVerifPending || !otp || otp.length < 6}
              >
                {isOtpVerifPending ? <Spinner /> : 'Supprimer mon compte'}
              </Button>
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
              <Button
                disabled={isOtpSendPending}
                type='button'
                onClick={closeModal}
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleSentOtp()}
                className='bg-brand-600 text-white transition hover:bg-brand-700'
                type='button'
              >
                {isOtpSendPending ? <Spinner /> : 'Continuer'}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
