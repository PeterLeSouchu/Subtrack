'use client';
import { useSession } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className='flex border border-red-400  h-full '>
      <div className='w-2/3 border border-yellow-400  '>Profile</div>
      <div className='w-1/3 border border-x-green-400 '></div>
    </div>
  );
}
