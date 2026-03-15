import { type NextRequest, NextResponse } from "next/server";
import { checkRights } from "./lib/actions/check-rights";

const protectedRoutes = ["/dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    const { success } = await checkRights();

    if (!success) {
      return NextResponse.rewrite(new URL("/404", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
