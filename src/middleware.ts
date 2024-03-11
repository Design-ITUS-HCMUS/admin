import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routesConfig } from '@/utils/routes';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { jwtVerify } from 'jose';
export async function middleware(request: NextRequest) {
  // If the request path is in the publicRoutes array, return the request
  if (routesConfig.publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(request.nextUrl);
  }

  // if the request uses the public api or auth api, return the request
  if (
    request.nextUrl.pathname.startsWith(routesConfig.publicApiRoutePrefix) ||
    request.nextUrl.pathname.startsWith(routesConfig.authApiRoutePrefix)
  ) {
    return NextResponse.rewrite(request.nextUrl);
  }

  // otherwise, check if the token is valid
  const token = request.cookies.get('token');

  return await validateToken(token)
    .then((result) => {
      if (!result) {
        // if token is invalid or expired, redirect to resetRoute
        const response = routesConfig.authRoutes.includes(request.nextUrl.pathname)
          ? NextResponse.rewrite(request.nextUrl)
          : NextResponse.redirect(new URL(routesConfig.resetRoute, request.url));
        response.cookies.delete('token');
        return response;
      } else {
        if (routesConfig.authRoutes.includes(request.nextUrl.pathname)) {
          return NextResponse.redirect(new URL(routesConfig.defaultRoute, request.url));
        }
        return NextResponse.rewrite(request.nextUrl);
      }
    })
    .catch(() => {
      return new NextResponse(null, { status: 404 });
    });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - .svg (svg files)
     * - .jpg (jpg files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.jpg).*)',
  ],
};

async function validateToken(token: RequestCookie | undefined): Promise<boolean> {
  try {
    const value = token?.value || '';
    const { payload } = await jwtVerify(value, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    if (payload) {
      if (payload.exp !== undefined) {
        const now = new Date().getTime() / 1000;
        if (payload.exp < now) {
          return false;
        }
      }
      return true;
    }
    return false;
  } catch (err: any) {
    return false;
  }
}
