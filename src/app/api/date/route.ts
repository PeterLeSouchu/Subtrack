import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { format } from 'date-fns';
import { auth } from '@/src/lib/auth';
import { fr } from 'date-fns/locale';

type YearMonthData = { year: number; month: string[] };

export async function GET(): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }
  try {
    const userId = session.user.id;

    const mensualities = await prisma.history.findMany({
      where: {
        userId,
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const groupedData = mensualities.reduce<YearMonthData[]>(
      (acc, mensuality) => {
        const year = new Date(mensuality.createdAt).getFullYear();
        const month = format(new Date(mensuality.createdAt), 'MMMM', {
          locale: fr,
        }).toLowerCase();

        const yearObj = acc.find((item) => item.year === year);
        if (!yearObj) {
          acc.push({ year, month: [month] });
        } else {
          if (!yearObj.month.includes(month)) {
            yearObj.month.push(month);
          }
        }

        return acc;
      },
      []
    );

    return NextResponse.json(
      { date: groupedData, message: 'Récupération des dates réussies' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message:
          'Erreur serveur lors de la récupération des données historiques.',
      },
      { status: 500 }
    );
  }
}
