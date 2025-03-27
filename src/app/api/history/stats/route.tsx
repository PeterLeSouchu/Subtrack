import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { fr } from 'date-fns/locale';
import { NextResponse } from 'next/server';
import { endOfMonth, parse, startOfMonth } from 'date-fns';
import { type NextRequest } from 'next/server';

interface CategoryStats {
  name: string;
  price: number;
  percentage: number;
  color: string;
}

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const yearNotParsed = searchParams.get('year');
  const month = searchParams.get('month');

  if (!yearNotParsed || !month) {
    return NextResponse.json(
      { message: 'Les paramètres year et month sont requis.' },
      { status: 400 }
    );
  }

  const year = parseInt(yearNotParsed, 10);

  try {
    const userId = session.user.id;

    const parsedDate = parse(`1 ${month} ${year}`, 'd MMMM yyyy', new Date(), {
      locale: fr,
    });

    if (isNaN(parsedDate.getTime())) {
      return new Response(
        JSON.stringify({ error: 'Mois ou année invalides' }),
        { status: 400 }
      );
    }

    const startDate = startOfMonth(parsedDate);
    const endDate = endOfMonth(parsedDate);

    const mensualities = await prisma.history.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        category: true,
      },
    });

    const totalPrice = mensualities.reduce(
      (total, mensuality) => total + Number(mensuality.price),
      0
    );

    const totalMensuality = mensualities.length;

    const averagePrice = (totalPrice / totalMensuality).toFixed(2);

    const categoryStats: CategoryStats[] = mensualities.reduce(
      (acc: CategoryStats[], mensuality) => {
        const categoryName = mensuality.category.name;
        const categoryPrice = Number(mensuality.price);
        const categoryColor = mensuality.category.color;

        const existingCategory = acc.find(
          (category) => category.name === categoryName
        );

        if (existingCategory) {
          existingCategory.price += categoryPrice;
        } else {
          acc.push({
            name: categoryName,
            price: categoryPrice,
            percentage: 0,
            color: categoryColor,
          });
        }

        return acc;
      },
      []
    );

    categoryStats.forEach((category) => {
      category.percentage = Number(
        ((category.price / totalPrice) * 100).toFixed(0)
      );
    });

    return NextResponse.json(
      {
        message: 'Mensualités récupérées avec succès',
        stats: {
          totalPrice,
          totalMensuality,
          averagePrice,
        },
        statsCategory: categoryStats,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("voila l'ereurrrrrrrrrrrr", error);
    return NextResponse.json(
      {
        message:
          'Erreur serveur lors de la récupération des mensualités historiques.',
      },
      { status: 500 }
    );
  }
}
