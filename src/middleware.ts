import { NextRequest } from 'next/server';
import authConfig from './auth.config';
import NextAuth from 'next-auth';

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req) {
  // Your custom middleware logic goes here
  const { nextUrl } = req;
  console.log("voici l'url", nextUrl.pathname);
  // if (!req.auth) {
  //   return Response.redirect(new URL('/sign-in', nextUrl));
  // }
});
