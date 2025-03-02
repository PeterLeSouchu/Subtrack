import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { object, string } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/prisma/prisma-client';

export const signInSchema = object({
  email: string({ required_error: "L'email est requis" }),
  password: string({ required_error: 'Le mot de passe est requis' }),
});

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('hellllllllllllllllllo');

        const { email, password } = await signInSchema.parseAsync(credentials);

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        const isSamePassword = await bcrypt.compare(
          user?.password,
          hashedPassword
        );

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
