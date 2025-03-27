import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { sendMail } from '@/src/utils/nodemailer';

export const editPasswordSchema = z.object({
  password: z.string(),
});

export const POST = auth(async function POST(req) {
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const userId = req.auth.user.id;

    const otpCode = crypto.randomBytes(3).toString('hex');
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 15);

    const otpStock = await prisma.user.update({
      where: { id: userId },
      data: {
        otpCode,
        otpExpiresAt,
      },
    });
    if (!otpStock) {
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { email: true },
    });

    if (user?.email) {
      await sendMail(
        user.email,
        'Code OTP pour la suppression de votre compte',
        `
        <h1> Subtrack </h1>
        <p>Voici votre code OTP pour confirmer la suppression de votre compte : ${otpCode}</p>
        <p> Le code expirera dans 15 minutes. </p>
        <p> Bonne continuation ! </p>
        `
      );
      return NextResponse.json(
        { message: 'Un code OTP a été envoyé à votre adresse email.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
    }
  } catch (error) {
    console.error(
      "Erreur lors de la suppression ou de la génération de l'OTP :",
      error
    );
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});
