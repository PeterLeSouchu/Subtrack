import { prisma } from '@/prisma/prisma-client';
import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { message: "Vous n'êtes pas autorisé à effectuer cette action" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const userId = session.user.id;

    const mensuality = await prisma.mensuality.findUnique({
      where: { id },
    });

    if (!mensuality) {
      return NextResponse.json(
        { message: 'Mensualité non trouvée' },
        { status: 404 }
      );
    }

    if (mensuality.userId !== userId) {
      return NextResponse.json(
        { message: 'Accès non autorisé' },
        { status: 403 }
      );
    }

    await prisma.mensuality.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Mensualité supprimée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
}
