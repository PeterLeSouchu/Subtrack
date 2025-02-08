import prisma from './prisma/prisma-client';

async function main() {
  await prisma.user.delete({
    where: {
      id: 'user_2slte6Y1JUHcf0ZpYZE6wo0LifR',
    },
  });
}

main();
