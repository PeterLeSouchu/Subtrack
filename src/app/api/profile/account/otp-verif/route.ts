import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const deleteSchema = z.object({
  otp: z
    .string()
    .min(6, { message: 'Le code OTP doit contenir au moins 6 caractères' }),
});

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = session.user.id;
    const body = await req.json();
    const { otp } = body;

    if (!otp) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    const parsedData = deleteSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: 'Les informations fournies ne sont pas correctes' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { otpCode: true, otpExpiresAt: true },
    });

    if (!user?.otpCode || !user?.otpExpiresAt) {
      return NextResponse.json(
        { message: 'Aucun code OTP trouvé pour cet utilisateur.' },
        { status: 400 }
      );
    }

    const currentDate = new Date();
    if (user.otpExpiresAt < currentDate) {
      return NextResponse.json(
        { message: 'Le code OTP a expiré.' },
        { status: 400 }
      );
    }

    if (user.otpCode !== otp) {
      return NextResponse.json(
        { message: 'Le code OTP est incorrect.' },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: 'Compte supprimé avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la suppression ou de la génération de l'OTP :",
      error
    );
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
