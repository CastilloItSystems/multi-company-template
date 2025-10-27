import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rutas públicas que no requieren autenticación
const publicRoutes = ["/", "/auth/login", "/auth/register"];

// Rutas protegidas del admin
const adminRoutes = ["/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener el token de las cookies
  const token = request.cookies.get("access_token")?.value;

  // Si la ruta es pública, permitir acceso
  if (
    publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    // Si el usuario ya está autenticado y trata de acceder al login/register,
    // redirigir al dashboard admin
    if (
      token &&
      (pathname.startsWith("/auth/login") ||
        pathname.startsWith("/auth/register"))
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Si la ruta es del admin y no hay token, redirigir al login
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Si la ruta es de una empresa (ruta dinámica), verificar autenticación
  // Formato: /[companyCode]/...
  const pathParts = pathname.split("/").filter(Boolean);
  if (
    pathParts.length > 0 &&
    !pathname.startsWith("/auth") &&
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api")
  ) {
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
