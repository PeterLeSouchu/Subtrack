'use server';

import prisma from '../../../prisma/prisma-client';

export default async function test(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  console.log(Date.now(), user);
  return user;
}
