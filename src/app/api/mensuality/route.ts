import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export const GET = auth(function GET(req) {
  console.log('on est dans la route  et voila req.auth', req.auth);
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
});

export const POST = auth(async function POST(req) {
  try {
    const body = await req.json();
    const { name, category, price } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { message: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    const newProduct = { name, category, price };

    console.log('new produit', newProduct);
    return NextResponse.json(
      { message: 'Produit ajouté avec succès', product: newProduct },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 });
  }
});
