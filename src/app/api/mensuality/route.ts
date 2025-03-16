import { auth } from '@/src/lib/auth';
import { NextResponse } from 'next/server';

export const GET = auth(function GET(req) {
  console.log('on est dans la route  et voila req.auth', req.auth);
  if (req.auth) return NextResponse.json(req.auth);
  return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
});
