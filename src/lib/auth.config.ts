import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/prisma/prisma-client';

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        const user = {
          email: credentials.email as string,
          id: existingUser?.id,
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    async signIn({ user }) {
      if (!user || !user.email) {
        console.error('Utilisateur non trouvé ou email manquant.');
        return false;
      }

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              lastLog: new Date(),
            },
          });
          return true;
        } else {
          await prisma.user.update({
            where: { email: user.email },
            data: { lastLog: new Date() },
          });
          return true;
        }
      } catch (error) {
        console.error(
          'Erreur lors de la mise à jour / création de lastLog:',
          error
        );
        return false;
      }
    },
  },
} satisfies NextAuthConfig;
