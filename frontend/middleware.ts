import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/auth/login", "/auth/register"];

// Rutas protegidas que requieren autenticación
const protectedRoutes = ["/dashboard", "/users", "/companies"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener el token de las cookies
  const token = request.cookies.get("access_token")?.value;

  // Si la ruta es pública, permitir acceso
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    // Si el usuario ya está autenticado y trata de acceder al login/register,
    // redirigir al dashboard
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Si la ruta es protegida y no hay token, redirigir al login
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
