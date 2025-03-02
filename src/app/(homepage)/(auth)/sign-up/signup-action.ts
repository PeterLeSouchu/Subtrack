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
      throw new Error('Cet email est déjà utilisé !');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return user;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.issues[0].message);
    }
    console.log("voici l'erreur ", error);

    throw new Error('Erreur inconnue');
  }
}
