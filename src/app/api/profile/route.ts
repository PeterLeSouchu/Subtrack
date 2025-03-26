import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export const GET = auth(async function GET(req) {
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user.id;

    const profile = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    });

    if (!profile) {
      return NextResponse.json(
        { message: 'Utilisateur invalide' },
        { status: 404 }
      );
    }

    const hasAccount = await prisma.account.findFirst({
      where: {
        userId,
      },
    });

    const limits = await prisma.limit.findMany({
      where: {
        userId: userId,
      },
      include: {
        category: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        price: 'asc',
      },
    });

    if (limits.length < 0) {
      return NextResponse.json(
        { message: 'Aucune limite pour cet utilisateur' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        message: 'Information utilisateur récupérées avec succès',
        userData: {
          email: profile.email,
          limits,
          hasAccount: hasAccount ? true : undefined,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des mensualités :', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});
