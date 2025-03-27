'use server';

import { prisma } from '@/prisma/prisma-client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { signupSchema } from './signup-schema';

type SignupData = z.infer<typeof signupSchema>;

export async function signUpUser(data: SignupData) {
  try {
    const parsedData = signupSchema.parse(data);
    const { email, password } = parsedData;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { error: 'Ce compte existe déjà' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return {
      message: 'Inscription réussie',
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }

    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: 'Erreur inconnue' };
  }
}
