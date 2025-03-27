import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    const mensualities = await prisma.mensuality.findMany();

    if (!mensualities || mensualities.length === 0) {
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

    console.log('voici userWithExpiredOtp', usersWithExpiredOTP);

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

    return NextResponse.json({
      message: 'Mensualités transférées et OTP expirés nettoyés avec succès.',
    });
  } catch (error) {
    console.error('Erreur lors du transfert des mensualités:', error);

    return NextResponse.json(
      { error: 'Erreur lors du transfert des mensualités' },
      { status: 500 }
    );
  }
}
