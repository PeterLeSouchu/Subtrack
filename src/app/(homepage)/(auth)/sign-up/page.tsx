'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import Link from 'next/link';
const formSchema = z
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
        message:
          'La confirmation du mot de passe doit contenir au moins 8 caractères.',
      })
      .regex(/[A-Z]/, {
        message:
          'La confirmation du mot de passe doit contenir au moins une majuscule.',
      })
      .regex(/[a-z]/, {
        message:
          'La confirmation du mot de passe doit contenir au moins une minuscule.',
      })
      .regex(/[0-9]/, {
        message:
          'La confirmation du mot de passe doit contenir au moins un chiffre.',
      })
      .regex(/[\W_]/, {
        message:
          'La confirmation du mot de passe doit contenir au moins un caractère spécial.',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['password'],
    message: 'Les mots de passe ne correspondent pas',
  });

export default function SignUp() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-white w-1/2 max-w-96 min-w-72  p-5 rounded-xl shadow-2xl drop-shadow-md'
      >
        <h2 className='text-center text-2xl font-extrabold'>Inscription</h2>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Entrez votre adresse mail' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input placeholder='Entrez votre mot de passe' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <FormControl>
                <Input placeholder='Confirmez votre mot de passe' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type='submit' className='w-full bg-blue'>
            S&apos;inscrire
          </Button>
          <Link
            className=' text-center underline block my-3 lg:hover:text-icon transition  '
            href='/sign-in'
          >
            Déjà inscrit ? Connectez-vous ici
          </Link>
        </div>
      </form>
    </Form>
  );
}
