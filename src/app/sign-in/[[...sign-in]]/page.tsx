import { SignIn } from '@clerk/nextjs';

export default function Signin() {
  return (
    <div className='flex items-center justify-center pt-32'>
      {' '}
      <SignIn forceRedirectUrl='/dashboard' />
    </div>
  );
}
