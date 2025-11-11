import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const session = await auth();
  if (session?.user?.id) {
    try {
      const categories = await prisma.category.findMany();

      return NextResponse.json(
        {
          message: 'Catégories récupérées avec succès',
          categories,
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }
}
