import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

interface CategoryStats {
  name: string;
  price: number;
  percentage: number;
  color: string;
}

export const GET = auth(async function GET(req) {
  if (req.auth?.user?.id) {
    try {
      const userId = req.auth.user.id;

      const mensualities = await prisma.mensuality.findMany({
        where: { userId },
        include: {
          category: true,
        },
      });

      if (mensualities.length < 1) {
        return NextResponse.json(
          {
            message: "Aucune donnée d'historique disponible",
          },
          { status: 200 }
        );
      }

      const latestHistory = await prisma.history.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
      if (!latestHistory) {
        return NextResponse.json(
          { message: "Aucune donnée d'historique disponible" },
          { status: 200 }
        );
      }

      const firstDayOfLatestMonth = new Date(
        latestHistory.createdAt.getFullYear(),
        latestHistory.createdAt.getMonth(),
        1
      );

      const lastDayOfLatestMonth = new Date(
        latestHistory.createdAt.getFullYear(),
        latestHistory.createdAt.getMonth() + 1,
        0
      );

      const monthlyHistory = await prisma.history.findMany({
        where: {
          userId,
          createdAt: {
            gte: firstDayOfLatestMonth,
            lte: lastDayOfLatestMonth,
          },
        },
      });

      const totalPriceLastMonth = monthlyHistory.reduce(
        (total, mensuality) => total + Number(mensuality.price),
        0
      );

      const totalPrice = mensualities.reduce(
        (total, mensuality) => total + Number(mensuality.price),
        0
      );

      const difference = Number((totalPrice - totalPriceLastMonth).toFixed(2));

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
            benefitOrLoss: difference,
          },
          statsCategory: categoryStats,
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
});
