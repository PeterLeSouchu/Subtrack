'use server';

import { prisma } from '@/prisma/prisma-client';
import bcrypt from 'bcryptjs';

export async function signInUser(data: { email: string; password: string }) {
  try {
    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return { error: 'Identifiants incorrects' };
    }

    const isMatchedPasswords = await bcrypt.compare(
      password,
      existingUser.password as string
    );

    if (!isMatchedPasswords) {
      return { error: 'Identifiants incorrects' };
    }

    return {
      message: 'Authentification réussie',
      userId: existingUser.id,
      email,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: 'Identifiants incorrects' };
  }
}
