import { type NextRequest, NextResponse } from "next/server";
import { checkRights } from "./app/lib/actions/utils";

const protectedRoutes = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    try {
      await checkRights();
    } catch {
      return NextResponse.rewrite(new URL("/404", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
