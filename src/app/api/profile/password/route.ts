import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const editPasswordSchema = z
  .object({
    formerPassword: z.string(),
    password: z
      .string()
      .min(8, {
        message: 'Le mot de passe doit contenir au moins 8 caractères.',
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/, {
        message:
          'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.',
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Les mots de passe ne correspondent pas',
  });

export const PATCH = auth(async function PATCH(req) {
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user.id;
    const body = await req.json();
    const { formerPassword, password, passwordConfirm } = body;

    if (!formerPassword || !password || !passwordConfirm) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    if (password !== passwordConfirm) {
      return NextResponse.json(
        { message: 'Les nouveaux mots de passe ne correspondent pas' },
        { status: 400 }
      );
    }

    const parsedData = editPasswordSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Les informations fournies ne sont pas correctes' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user?.password) {
      return NextResponse.json(
        { message: 'Utilisateur invalide' },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(formerPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Mot de passe incorrect' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { message: 'Mot de passe mis à jour avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour du mot de passe :', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});
