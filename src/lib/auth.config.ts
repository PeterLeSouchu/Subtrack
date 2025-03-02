import Google from 'next-auth/providers/google';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { object, string } from 'zod';

export const signInSchema = object({
  email: string({ required_error: "L'email est requis" }),
  password: string({ required_error: 'Le mot de passe est requis' }),
});

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
        // Recherche de l'utilisateur
        const user = { email: credentials.email as string };

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
} satisfies NextAuthConfig;
