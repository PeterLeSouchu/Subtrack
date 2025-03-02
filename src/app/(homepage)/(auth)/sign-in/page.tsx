'use client';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';

import { z } from 'zod';
import Link from 'next/link';
import GoogleButton from '../../components/Google-button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { signInUser } from './signin-action';

const formSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export default function SignIn() {
  const [error, setError] = useState<string>('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInUser(values);
      signIn('credentials', values);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError('Erreur incconue');
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-white p-5 w-3/4 max-w-96 min-w-72 rounded-xl shadow-xl drop-shadow-md'
      >
        <Image
          src='/logo2.png'
          width={300}
          height={300}
          alt='logo-subtrack'
          className='w-14 mx-auto lg:hidden'
        />
        <h2 className='text-center text-2xl font-extrabold'>Connexion</h2>
        <p className='text-red-600 text-center'>{error}</p>
        <GoogleButton auth='Se connecter' />
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
                <Input
                  type='password'
                  placeholder='Entrez votre mot de passe'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type='submit' className='w-full bg-blue'>
            Se connecter
          </Button>
          <Link
            className=' text-center underline block my-3 lg:hover:text-icon transition  '
            href='/sign-up'
          >
            Vous êtes nouveau ? Inscrivez-vous ici
          </Link>
        </div>
      </form>
    </Form>
  );
}
