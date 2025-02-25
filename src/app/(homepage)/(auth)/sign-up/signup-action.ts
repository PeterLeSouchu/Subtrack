'use server';
import { prisma } from '@/prisma/prisma-client';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

type SignupData = {
  email: string;
  passwordConfirm: string;
  password: string;
};

export async function signUpUser(data: SignupData) {
  const { email, password, passwordConfirm } = data;

  if (!email || !password) {
    throw new Error('Tous les champs sont requis !');
  }

  if (password !== passwordConfirm) {
    throw new Error('Les mots de passes ne correspondent pas !');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Cet email est déjà utilisé !');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  redirect('/dashboard');
}
