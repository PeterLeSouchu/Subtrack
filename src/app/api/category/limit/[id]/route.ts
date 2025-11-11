import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const userId = session.user.id;

    const limitToDelete = await prisma.limit.findFirst({
      where: {
        categoryId: id,
        userId,
      },
    });

    if (!limitToDelete) {
      return NextResponse.json(
        { message: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    await prisma.limit.delete({
      where: { id: limitToDelete.id },
    });

    return NextResponse.json(
      { message: 'Limite supprimée avec succès' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
