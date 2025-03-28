import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth';

export async function GET(): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }
  try {
    const userId = session.user.id;

    const mensualities = await prisma.history.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
    });

    if (mensualities.length === 0) {
      return NextResponse.json(
        { message: 'Aucune donnée disponible' },
        { status: 200 }
      );
    }

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
}
