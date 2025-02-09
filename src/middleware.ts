import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

// Combine both middleware functions
export default function middleware(req: NextRequest, evt: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next(); // Allow API routes
  }
  return clerkMiddleware()(req, evt);
}

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next|_vercel|favicon.ico).*)",
    "/",
    "/auth:path*",
  ],
};
