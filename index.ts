import prisma from './prisma/prisma-client';

async function main() {
  await prisma.user.delete({
    where: {
      clerkId: 'user_2sljq1MbNjSaqVIe9xWBD7d6PAJ',
    },
  });
}

main();
