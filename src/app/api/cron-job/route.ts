import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    const currentDate = new Date();
    const usersWithExpiredOTP = await prisma.user.findMany({
      where: {
        otpExpiresAt: {
          lt: currentDate,
        },
        otpCode: {
          not: null,
        },
      },
    });

    if (usersWithExpiredOTP.length > 0) {
      await prisma.user.updateMany({
        where: {
          id: { in: usersWithExpiredOTP.map((user) => user.id) },
        },
        data: {
          otpCode: null,
          otpExpiresAt: null,
        },
      });
    }

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const activeUsers = await prisma.user.findMany({
      where: {
        lastLog: {
          gte: threeMonthsAgo,
        },
      },
      select: {
        id: true,
      },
    });

    const activeUserIds = activeUsers.map((user) => user.id);

    if (activeUserIds.length === 0) {
      return NextResponse.json({
        message: 'Aucun utilisateur actif dans les 3 derniers mois.',
      });
    }

    const mensualities = await prisma.mensuality.findMany({
      where: {
        userId: {
          in: activeUserIds,
        },
      },
    });

    if (mensualities.length === 0) {
      return NextResponse.json({ message: 'Aucune mensualité à transférer.' });
    }

    for (const mensuality of mensualities) {
      await prisma.history.create({
        data: {
          userId: mensuality.userId,
          name: mensuality.name,
          price: mensuality.price,
          categoryId: mensuality.categoryId,
          createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
        },
      });
    }

    return NextResponse.json({
      message:
        'OTP expirés nettoyés et mensualités transférées pour les utilisateurs actifs.',
    });
  } catch (error) {
    console.error('Erreur lors du traitement:', error);
    return NextResponse.json(
      { error: 'Erreur lors du traitement' },
      { status: 500 }
    );
  }
}
