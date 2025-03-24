import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';
import { parse, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

export const GET = auth(async function GET(req) {
  if (!req.auth?.user?.id) {
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
    const userId = req.auth.user.id;

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
      include: { category: true },
      orderBy: {
        price: 'asc',
      },
    });

    console.log(
      "on est dans l'api route mensualité et voila les mensualité",
      mensualities
    );

    return NextResponse.json(
      {
        message: 'Mensualités du mois récupérées avec succès',
        mensualities,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des mensualités :', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});
