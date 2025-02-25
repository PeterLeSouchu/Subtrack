'use server';

import { prisma } from '@/prisma/prisma-client';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const signupSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Format invalide.' })
      .min(5, { message: 'Format invalide.' }),

    password: z
      .string()
      .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      })
      .regex(/[A-Z]/, {
        message: 'Le mot de passe doit contenir au moins une majuscule.',
      })
      .regex(/[a-z]/, {
        message: 'Le mot de passe doit contenir au moins une minuscule.',
      })
      .regex(/[0-9]/, {
        message: 'Le mot de passe doit contenir au moins un chiffre.',
      })
      .regex(/[\W_]/, {
        message: 'Le mot de passe doit contenir au moins un caractère spécial.',
      }),

    passwordConfirm: z
      .string()
      .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      })
      .regex(/[A-Z]/, {
        message: 'Le mot de passe doit contenir au moins une majuscule.',
      })
      .regex(/[a-z]/, {
        message: 'Le mot de passe doit contenir au moins une minuscule.',
      })
      .regex(/[0-9]/, {
        message: 'Le mot de passe doit contenir au moins un chiffre.',
      })
      .regex(/[\W_]/, {
        message: 'Le mot de passe doit contenir au moins un caractère spécial.',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['password'],
    message: 'Les mots de passe ne correspondent pas',
  });

type SignupData = z.infer<typeof signupSchema>;

export async function signUpUser(data: SignupData) {
  const parsedData = signupSchema.safeParse(data);
  if (!parsedData.success) {
    // Only 1rst message, because there's already front validation
    throw new Error(parsedData.error.issues[0].message);
  }

  const { email, password } = parsedData.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error('Cet email est déjà utilisé !');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  redirect('/dashboard');
}
