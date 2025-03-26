import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

import { z } from 'zod';

const limitPostSchema = z.object({
  price: z.string().min(1),
  category: z.string().min(1),
});

const limitPatchSchema = z.object({
  price: z.string().min(1),
  id: z.string().min(1),
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

    const { category, price } = body;

    if (!category || !price) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }
    const parsedData = limitPostSchema.safeParse(body);
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

    const mensualities = await prisma.mensuality.findMany({
      where: {
        userId: req.auth.user.id,
        categoryId: parsedData.data.category,
      },

      select: {
        price: true,
      },
    });

    const totalPrice = mensualities.reduce(
      (sum, mensuality) => sum + mensuality.price,
      0
    );

    if (totalPrice > Number(parsedData.data.price)) {
      return NextResponse.json(
        {
          isLimitExceeded: true,
          limitPrice: totalPrice - Number(parsedData.data.price),
          message: 'Les mensualités dépassent cette limite budgétaire.',
        },
        { status: 200 }
      );
    }

    const newLimit = await prisma.limit.create({
      data: {
        user: {
          connect: { id: userId },
        },
        price: Number(parsedData.data.price),
        category: {
          connect: { id: category },
        },
      },
      include: {
        category: true,
      },
    });

    if (!newLimit) {
      return NextResponse.json({ message: 'Erreur server' }, { status: 500 });
    }

    return NextResponse.json(
      {
        message: 'Limite budgétaire créée avec succès avec succès',
        limit: newLimit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des mensualités :', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});

export const PATCH = auth(async function PATCH(req) {
  if (req.auth?.user?.id) {
    try {
      const body = await req.json();
      const { id: limitId, price } = body;

      if (!limitId || !price) {
        return NextResponse.json(
          { message: 'Tous les champs sont requis.' },
          { status: 400 }
        );
      }

      const parsedData = limitPatchSchema.safeParse(body);
      if (!parsedData.success) {
        return NextResponse.json(
          {
            message: 'Les informations fournies ne sont pas correctes',
          },
          { status: 400 }
        );
      }

      const existingLimit = await prisma.limit.findUnique({
        where: { id: parsedData.data.id },
      });

      if (!existingLimit) {
        return NextResponse.json(
          { message: 'Limite non trouvée' },
          { status: 400 }
        );
      }

      if (existingLimit.userId !== req.auth.user.id) {
        return NextResponse.json(
          { message: "Vous n'êtes pas autorisé à faire cette action" },
          { status: 401 }
        );
      }

      const mensualities = await prisma.mensuality.findMany({
        where: {
          userId: req.auth.user.id,
          categoryId: existingLimit.categoryId,
        },
        select: {
          price: true,
        },
      });

      const totalPrice = mensualities.reduce(
        (sum, mensuality) => sum + mensuality.price,
        0
      );

      if (totalPrice > Number(parsedData.data.price)) {
        return NextResponse.json(
          {
            isLimitExceeded: true,
            limitPrice: totalPrice - Number(parsedData.data.price),
            message: 'Les mensualités dépassent cette limite budgétaire.',
          },
          { status: 200 }
        );
      }

      const updatedLimit = await prisma.limit.update({
        where: { id: limitId },
        data: {
          price: Number(price),
        },
      });

      return NextResponse.json(
        {
          message: 'Limite mise à jour avec succès',
          mensuality: updatedLimit,
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
