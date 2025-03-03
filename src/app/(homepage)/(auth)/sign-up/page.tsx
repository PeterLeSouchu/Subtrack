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
import { signupSchema } from './signup-schema';
import { z } from 'zod';
import Link from 'next/link';
import GoogleButton from '../../components/Google-button';
import { signUpUser } from './signup-action';
import ErrorMessage from '@/src/components/Error-message';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<undefined | string>('');
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setError('');
    const res = await signUpUser(values);
    if (res.error) {
      setError(res.error || 'Erreur inconnue');
    } else {
      router.push('/sign-in');
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-white w-1/2 max-w-96 min-w-72  p-5 rounded-xl shadow-2xl drop-shadow-md'
      >
        <Image
          src='/logo2.png'
          width={300}
          height={300}
          alt='logo-subtrack'
          className='w-14 mx-auto lg:hidden'
        />
        <h2 className='text-center text-2xl font-extrabold'>Inscription</h2>
        <ErrorMessage message={error} />
        <GoogleButton auth="S'inscrire" />
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
        <FormField
          control={form.control}
          name='passwordConfirm'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation du mot de passe</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Confirmez votre mot de passe'
                  {...field}
                />
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
