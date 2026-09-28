import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/sign-in', '/sign-up', '/legal-notices', '/cgu'];

function isAuthenticated(req: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === 'development'
      ? 'authjs.session-token'
      : '__Secure-authjs.session-token';

  const token = req.cookies.get(cookieName);
  return Boolean(token?.value);
}

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = isAuthenticated(req);
  console.log('isLoggedIn dans le middleware', isLoggedIn);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl.origin));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|video).*)'],
};
