import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (request.nextUrl.pathname.startsWith("/dash")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  if (request.nextUrl.pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/dash", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dash/:path*", "/auth"],
};
