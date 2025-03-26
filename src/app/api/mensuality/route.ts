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
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user.id;

    const mensualities = await prisma.mensuality.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { price: 'asc' },
    });

    return NextResponse.json(
      {
        message: 'Mensualités du mois récupérées avec succès',
        mensualities: mensualities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des mensualités :', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
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
        return NextResponse.json(
          {
            message: 'Les informations fournies ne sont pas correctes',
          },
          { status: 400 }
        );
      }

      if (isNaN(Number(parsedData.data.price))) {
        return NextResponse.json(
          {
            message: 'Les informations fournies ne sont pas correctes',
          },
          { status: 400 }
        );
      }

      const existingCategory = await prisma.category.findUnique({
        where: { id: parsedData.data.category },
      });

      if (!existingCategory) {
        return NextResponse.json(
          { message: 'Catégorie non trouvée' },
          { status: 400 }
        );
      }

      const limitPrice = await prisma.limit.findFirst({
        where: { categoryId: parsedData.data.category },
        select: {
          price: true,
        },
      });

      const mensualities = await prisma.mensuality.findMany({
        where: {
          userId: req.auth.user.id,
          categoryId: parsedData.data.category,
        },

        select: {
          price: true,
        },
      });

      const totalPriceWithoutNewMensuality = mensualities.reduce(
        (sum, mensuality) => sum + mensuality.price,
        0
      );

      const totalPriceWithNewMensuality =
        totalPriceWithoutNewMensuality + Number(parsedData.data.price);

      if (limitPrice && totalPriceWithNewMensuality > limitPrice.price) {
        return NextResponse.json(
          {
            isLimitExceeded: true,
            limitPrice: totalPriceWithNewMensuality - limitPrice.price,
            message: 'Le prix total dépasse la limite de la catégorie.',
          },
          { status: 200 }
        );
      }

      const newMensuality = await prisma.mensuality.create({
        data: {
          name,
          price: Number(price),
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
    return NextResponse.json(
      { message: "Vous n'êtes pas autoriser à faire cette action" },
      { status: 401 }
    );
  }
});

export const PATCH = auth(async function PATCH(req) {
  if (req.auth?.user) {
    try {
      const body = await req.json();
      const { id, name, category, price } = body;

      if (!id || !name || !category || !price) {
        return NextResponse.json(
          { message: 'Tous les champs sont requis.' },
          { status: 400 }
        );
      }

      const parsedData = mensualitySchema.safeParse(body);
      if (!parsedData.success) {
        return NextResponse.json(
          {
            message: 'Les informations fournies ne sont pas correctes',
          },
          { status: 400 }
        );
      }

      const existingCategory = await prisma.category.findUnique({
        where: { id: parsedData.data.category },
      });

      if (!existingCategory) {
        return NextResponse.json(
          { message: 'Catégorie non trouvée' },
          { status: 400 }
        );
      }

      const existingMensuality = await prisma.mensuality.findUnique({
        where: { id },
      });

      if (!existingMensuality) {
        return NextResponse.json(
          { message: 'Mensualité non trouvée' },
          { status: 404 }
        );
      }

      const limitPrice = await prisma.limit.findFirst({
        where: { categoryId: parsedData.data.category },
        select: {
          price: true,
        },
      });

      const mensualities = await prisma.mensuality.findMany({
        where: {
          userId: req.auth.user.id,
          categoryId: parsedData.data.category,
        },

        select: {
          price: true,
        },
      });

      const totalPriceWithoutNewMensuality = mensualities.reduce(
        (sum, mensuality) => sum + mensuality.price,
        0
      );

      const totalPriceWithNewMensuality =
        totalPriceWithoutNewMensuality + Number(parsedData.data.price);

      if (limitPrice && totalPriceWithNewMensuality > limitPrice.price) {
        return NextResponse.json(
          {
            isLimitExceeded: true,
            limitPrice: totalPriceWithNewMensuality - limitPrice.price,
            message: 'Le prix total dépasse la limite de la catégorie.',
          },
          { status: 200 }
        );
      }

      const updatedMensuality = await prisma.mensuality.update({
        where: { id },
        data: {
          name,
          price: Number(price),
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
          message: 'Mensualité mise à jour avec succès',
          mensuality: updatedMensuality,
        },
        { status: 200 }
      );
    } catch {
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à faire cette action" },
      { status: 401 }
    );
  }
});
