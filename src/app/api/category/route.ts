import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export const GET = auth(async function GET(req) {
  if (req.auth?.user) {
    try {
      const categories = await prisma.category.findMany();

      return NextResponse.json(
        {
          message: 'Catégories récupérées avec succès',
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
});
