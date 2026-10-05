import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { token } = req.nextauth;

    // Redirect authenticated users away from auth pages
    if (token && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect unauthenticated users to login
    if (!token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Public routes
        if (pathname === "/" || pathname === "/login" || pathname === "/register") {
          return true;
        }

        // Protected routes require auth
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
