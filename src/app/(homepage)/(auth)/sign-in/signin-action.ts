'use server';

import { prisma } from '@/prisma/prisma-client';
import bcrypt from 'bcryptjs';

export async function signInUser(data: { email: string; password: string }) {
  try {
    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      throw new Error('Identifiants incorrects');
    }

    const isMatchedPasswords = await bcrypt.compare(
      password,
      existingUser.password as string
    );

    if (!isMatchedPasswords) {
      throw new Error('Identifiants incorrects');
    }

    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log("voici l'erreur : ", error.message);
      throw new Error(error.message);
    }

    throw new Error('Erreur inconnues');
  }
}
