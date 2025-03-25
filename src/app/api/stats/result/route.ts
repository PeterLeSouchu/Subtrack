import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { fr } from 'date-fns/locale';
import { NextResponse } from 'next/server';
import { startOfYear, endOfYear, getMonth, getYear, format } from 'date-fns';
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
      where: { userId },
      select: { createdAt: true },
    });

    if (yearsInHistory.length === 0) {
      return NextResponse.json(
        { message: 'Aucune donnée disponible' },
        { status: 200 }
      );
    }

    const years = yearsInHistory.map((entry) => getYear(entry.createdAt));
    const yearsSorted = years.sort((a, b) => a - b);
    const closestYear = yearsSorted[yearsSorted.length - 1];

    const searchParams = req.nextUrl.searchParams;
    const yearNotParsed = searchParams.get('year');
    const year = Number(yearNotParsed);
    const selectedYear = year || closestYear;

    if (!selectedYear || isNaN(selectedYear)) {
      return NextResponse.json(
        { message: 'Année invalide ou manquante' },
        { status: 400 }
      );
    }

    const startDate = startOfYear(new Date(selectedYear, 0));
    const endDate = endOfYear(new Date(selectedYear, 11));

    const historyEntries = await prisma.history.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    if (historyEntries.length === 0) {
      return NextResponse.json(
        { message: 'Aucune donnée disponible pour cette année' },
        { status: 404 }
      );
    }

    const monthlyStats = Array.from({ length: 12 }, (_, index) => {
      const monthName = format(new Date(selectedYear, index), 'LLLL', {
        locale: fr,
      });
      const totalPrice = historyEntries
        .filter((entry) => getMonth(entry.createdAt) === index)
        .reduce((sum, entry) => sum + Number(entry.price), 0);

      if (totalPrice > 0) {
        return { month: monthName, price: totalPrice };
      }
    }).filter(Boolean);

    const totalPrice = historyEntries.reduce(
      (total, entry) => total + Number(entry.price),
      0
    );
    const totalMensuality = historyEntries.length;
    const uniqueMonths = new Set(
      historyEntries.map((entry) => entry.createdAt.getMonth())
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
          monthlyStats,
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
      { message: 'Erreur serveur lors de la récupération des statistiques.' },
      { status: 500 }
    );
  }
}
