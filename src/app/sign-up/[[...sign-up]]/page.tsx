import { SignUp } from '@clerk/nextjs';

export default function Signup() {
  return (
    <div className='flex items-center justify-center pt-32'>
      {' '}
      <SignUp routing='hash' forceRedirectUrl='/dashboard' />
    </div>
  );
}
