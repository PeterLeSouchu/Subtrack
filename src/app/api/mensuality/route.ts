import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const mensualitySchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  category: z.string().min(1),
});

export const GET = auth(async function GET(req) {
  if (req.auth?.user) {
    try {
      const userId = req.auth.user.id;

      const mensualities = await prisma.mensuality.findMany({
        where: { userId },
        include: { category: true },
      });

      return NextResponse.json(
        {
          message: 'Mensualités récupérées avec succès',
          mensualities,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error('Erreur lors de la récupération des mensualités :', error);
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }
});

export const POST = auth(async function POST(req) {
  if (req.auth?.user) {
    try {
      const body = await req.json();
      const { name, category, price } = body;
      if (!name || !category || !price) {
        return NextResponse.json(
          { message: 'Tous les champs sont requis.' },
          { status: 400 }
        );
      }
      const parsedData = mensualitySchema.safeParse(body);
      if (!parsedData.success) {
        console.log('voila les erreurs', parsedData.error);
        return NextResponse.json(
          {
            message: 'Les informations fournies ne sont pas correctes',
          },
          { status: 400 }
        );
      }

      console.log('donnée parsée', parsedData.data);

      const existingCategory = await prisma.category.findFirst({
        where: { name: parsedData.data.category },
      });

      if (!existingCategory) {
        return NextResponse.json(
          { message: 'Catégorie non trouvée' },
          { status: 400 }
        );
      }

      console.log('la categorie', existingCategory);

      const newMensuality = await prisma.mensuality.create({
        data: {
          name,
          price: price.toString(),
          user: {
            connect: { id: req.auth.user.id },
          },
          category: {
            connect: { id: existingCategory.id },
          },
        },
      });

      return NextResponse.json(
        {
          message: 'Mensualité ajoutée avec succès',
          mensuality: newMensuality,
        },
        { status: 201 }
      );
    } catch {
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
  } else {
    console.log('non autoriser à faire cette requête');
    return NextResponse.json(
      { message: "Vous n'êtes pas autoriser à faire cette action" },
      { status: 401 }
    );
  }
});
