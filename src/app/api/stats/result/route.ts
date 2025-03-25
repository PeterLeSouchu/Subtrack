import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { fr } from 'date-fns/locale';
import { NextResponse } from 'next/server';
import { parse, startOfYear, endOfYear, getYear } from 'date-fns';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = session.user.id;

    const yearsInHistory = await prisma.history.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
    });

    const years = yearsInHistory.map((entry) => getYear(entry.createdAt));

    if (years.length === 0) {
      return NextResponse.json(
        { message: "Aucune donnée disponible dans l'historique" },
        { status: 404 }
      );
    }

    const yearsSorted = years.sort((a, b) => a - b);

    const closestYear = yearsSorted[yearsSorted.length - 1];

    const searchParams = req.nextUrl.searchParams;
    const yearNotParsed = searchParams.get('year');

    const year = Number(yearNotParsed);

    const selectedYear = year || closestYear;

    if (!selectedYear || isNaN(Number(selectedYear))) {
      return new Response(
        JSON.stringify({ error: 'Année invalide ou manquante' }),
        { status: 400 }
      );
    }

    const parsedDate = parse(
      `1 janvier ${selectedYear}`,
      'd MMMM yyyy',
      new Date(),
      {
        locale: fr,
      }
    );

    if (isNaN(parsedDate.getTime())) {
      return new Response(JSON.stringify({ error: 'Année invalide' }), {
        status: 400,
      });
    }

    const startDate = startOfYear(parsedDate);
    const endDate = endOfYear(parsedDate);

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

    const uniqueMonths = new Set(
      mensualities.map((mensuality) => mensuality.createdAt.getMonth())
    ).size;

    const averageMonthlyPrice =
      uniqueMonths > 0 ? (totalPrice / uniqueMonths).toFixed(2) : '0.00';

    return NextResponse.json(
      {
        message: 'Statistiques annuelles récupérées avec succès',
        stats: {
          totalPrice,
          totalMensuality,
          averageMonthlyPrice,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des statistiques annuelles',
      error
    );
    return NextResponse.json(
      {
        message: 'Erreur serveur lors de la récupération des statistiques.',
      },
      { status: 500 }
    );
  }
}
