'use client';

import { signOut } from 'next-auth/react';

export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
      <button onClick={() => signOut()}>Se déconnecter</button>
    </>
  );
}
