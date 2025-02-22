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
// import { signinAction } from './signin-action';

import { z } from 'zod';
import Link from 'next/link';

const formSchema = z.object({
  email: z
    .string()
    .email({ message: 'Format invalide.' })
    .min(5, { message: 'Format invalide.' }),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
    .regex(/[A-Z]/, {
      message: 'Le mot de passe doit contneir au moins une majuscule.',
    })
    .regex(/[a-z]/, {
      message: 'Le mot de passe doit contneir au moins une minuscule.',
    })
    .regex(/[0-9]/, {
      message: 'Le mot de passe doit contneir au moins un chiffre',
    })
    .regex(/[\W_]/, {
      message: 'Le mot de passe doit contneir au moins un caractère spécial',
    }),
});

export default function SignIn() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // signinAction();
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8 bg-white p-5 w-1/2 max-w-96 min-w-72 rounded-xl shadow-2xl drop-shadow-md'
      >
        <Image
          src='/logo2.png'
          width={300}
          height={300}
          alt='logo-subtrack'
          className='w-14 mx-auto lg:hidden'
        />
        <h2 className='text-center text-2xl font-extrabold'>Connexion</h2>
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
