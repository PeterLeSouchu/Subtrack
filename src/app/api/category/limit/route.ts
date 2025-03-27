import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const session = await auth();
  if (session?.user?.id) {
    try {
      const userId = session?.user?.id;

      const userLimits = await prisma.limit.findMany({
        where: { userId },
        select: { categoryId: true },
      });

      const excludedCategoryIds = userLimits.map((limit) => limit.categoryId);

      const categories = await prisma.category.findMany({
        where: {
          id: { notIn: excludedCategoryIds },
        },
      });

      return NextResponse.json(
        {
          message: 'Catégories disponibles récupérées avec succès',
          categories,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }
}
