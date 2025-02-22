'use client';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';

export default function Dashboard() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <SessionProvider>
      <h1>Dashboard</h1>
    </SessionProvider>
  );
}
