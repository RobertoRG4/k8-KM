// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  // Define las rutas públicas que no requieren autenticación
  const publicPaths = ["/login", "/register"];

  // Si la ruta es pública, permite el acceso
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Si no hay token y la ruta no es pública, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay token, permite el acceso
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Aplica el middleware a todas las rutas excepto las siguientes:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (archivos de optimización de imágenes)
     * - favicon.ico, sitemap.xml, robots.txt (archivos de metadatos)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
