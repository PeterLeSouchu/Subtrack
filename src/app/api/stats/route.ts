import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

interface CategoryStats {
  name: string;
  price: number;
  percentage: number;
}

export const GET = auth(async function GET(req) {
  if (req.auth?.user) {
    try {
      const userId = req.auth.user.id;

      const mensualities = await prisma.mensuality.findMany({
        where: { userId },
        include: { category: true },
      });

      if (mensualities.length < 1) {
        return NextResponse.json(
          {
            message: 'Mensualités récupérées avec succès',
          },
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
