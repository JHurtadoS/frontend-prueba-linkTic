import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";

const SECRET_KEY = Buffer.from(process.env.JWT_SECRET!, "base64");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login"];
  const adminRoutes = ["/empresas/admin", "/inventario", "/ordenes"];

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && !publicRoutes.includes(pathname)) {
    console.log(token);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY, {
        algorithms: ["HS256"],
      });

      console.log(payload);

      const isAdmin = payload.isAdmin;
      const email = payload.sub;

      if (isAdmin && pathname === "/empresas") {
        return NextResponse.redirect(new URL("/empresas/admin", request.url));
      }

      if (!isAdmin && adminRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/empresas", request.url));
      }

      request.headers.set("x-user-email", email as string);
      request.headers.set("x-user-role", isAdmin ? "admin" : "externo");
    } catch (err) {
      console.error("Error decoding token:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
