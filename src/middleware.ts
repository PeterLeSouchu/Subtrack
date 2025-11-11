import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/sign-in", "/sign-up", "/legal-notices", "/cgu"];

function isAuthenticated(req: NextRequest) {
  const secureToken = req.cookies.get("__Secure-authjs.session-token");
  return Boolean(secureToken?.value);
}

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = isAuthenticated(req);
  console.log("isLoggedIn dans le middleware", isLoggedIn);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl.origin));
  }

  if (isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|video).*)"],
};
