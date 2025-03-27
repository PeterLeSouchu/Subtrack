import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export const editPasswordSchema = z.object({
  password: z.string(),
});

export const POST = auth(async function POST(req) {
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user.id;
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis.' },
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

    const isMatch = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Mot de passe incorrect', notGoodPassword: true },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: 'Compte supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la suppression ou de la génération de l'OTP :",
      error
    );
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});
