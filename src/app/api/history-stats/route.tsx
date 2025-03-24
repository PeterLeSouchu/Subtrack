import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { fr } from 'date-fns/locale';
import { NextResponse } from 'next/server';
import { parse } from 'date-fns';
import { type NextRequest } from 'next/server';

interface CategoryStats {
  name: string;
  price: number;
  percentage: number;
  color: string;
}

export async function GET(req: NextRequest) {
  console.log('ROUTE HISTORY STATS APPELE');
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  const searchParams = req.nextUrl.searchParams;
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  console.log('voial les query param dans la route api ', year, month);

  if (!year || !month) {
    return NextResponse.json(
      { message: 'Les paramètres year et month sont requis.' },
      { status: 400 }
    );
  }

  try {
    const userId = session.user.id;

    const monthNumber =
      parse(month as string, 'MMMM', new Date(), { locale: fr }).getMonth() + 1;

    const startOfMonth = new Date(
      `${year}-${monthNumber.toString().padStart(2, '0')}-01T00:00:00.000Z`
    );
    const endOfMonth = new Date(
      `${year}-${monthNumber.toString().padStart(2, '0')}-01T23:59:59.999Z`
    );
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    console.log('start', startOfMonth, 'et end ', endOfMonth);

    const mensualities = await prisma.history.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      include: {
        category: true,
      },
    });

    if (mensualities.length < 1) {
      return NextResponse.json(
        { message: 'Aucune mensualité trouvée pour ce mois.' },
        { status: 200 }
      );
    }

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
