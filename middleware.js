import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAdminRoute = url.pathname.startsWith('/admin');

  if (isAdminRoute) {
    // Redirect to login if user is not authenticated
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Redirect to login if user is not an admin
    if (token.role !== 'admin') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Match all routes starting with /admin
};
