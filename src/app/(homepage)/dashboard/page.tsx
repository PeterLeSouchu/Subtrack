import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';
import test from '../actions/test';

export default async function Dashboard() {
  const { userId } = await auth();

  if (userId) {
    const user = await test(userId);
  }

  if (userId) {
    return (
      <div>
        <h1>Vous êtes connecté et voici le user {userId}</h1>

        <UserButton />
      </div>
    );
  }
  return <h1>Dashboard</h1>;
}
