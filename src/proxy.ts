import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from 'next/headers';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from './lib/auth-utils';

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const pathName = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: string | JwtPayload = jwt.verify(accessToken, process.env.JWT_SECRET as string)

    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken")
      return NextResponse.redirect(new URL('/login', request.url))
    }

    userRole = verifiedToken.role;
  }
  const routerOwner = getRouteOwner(pathName);
  //path = /doctor/appointments => "DOCTOR"
  //path = /my-profile => "COMMON"
  //path = /login => null
  const isAuth = isAuthRoute(pathName);

  //rule 1: user is logged in and trying to access auth route. redirect to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
  }

  // rule 2: user is trying to access the open public route
  if (routerOwner === null) {
    return NextResponse.next();
  }
  //rule 1 & 2 for open public routes and auth routes

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set('redirect', pathName);
    return NextResponse.redirect(loginUrl)
  }
  // rule 3: user is trying to access the common protected route
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  //rule 4: USER is trying to access role based protected route
  if (routerOwner === "PATIENT" || routerOwner === "DOCTOR" || routerOwner === "ADMIN") {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }
  }

  // console.log(userRole, routerOwner, isAuth);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|well-known).*)',
  ],
}