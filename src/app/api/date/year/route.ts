import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth';

export const GET = auth(async (req) => {
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }
  try {
    const userId = req.auth.user.id;

    const mensualities = await prisma.history.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
    });

    const years = Array.from(
      new Set(
        mensualities.map((mensuality) =>
          new Date(mensuality.createdAt).getFullYear()
        )
      )
    ).sort((a, b) => b - a);

    return NextResponse.json(
      { date: years, message: 'Récupération des dates réussies' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          'Erreur serveur lors de la récupération des données historiques.',
      },
      { status: 500 }
    );
  }
});
