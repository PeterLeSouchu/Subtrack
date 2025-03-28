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
      if (!user || !user.email) return false;

      try {
        await prisma.user.update({
          where: { email: user.email },
          data: { lastLog: new Date() },
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour de lastLog:', error);
        return false;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
