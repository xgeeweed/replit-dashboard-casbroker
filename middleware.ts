import NextAuth from "next-auth";
import authConfig from "@/app/auth/auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isDriverApiRoute = nextUrl.pathname.startsWith('/api/driver');
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isStaticFile = nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg)$/);

  // Skip middleware for API routes and static files
  if (isApiAuthRoute || isDriverApiRoute || isStaticFile || nextUrl.pathname.startsWith('/_next')) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn && nextUrl.pathname !== "/auth/register") {
      // Get user role from auth session
      const userRole = req.auth?.user?.role;
      
      // Redirect based on user role
      if (userRole === "DRIVER") {
        return Response.redirect(new URL("/dashboard/driver-dashboard", nextUrl));
      }
      
      // Default redirect for other roles
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return;
});

// Configure middleware matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - api/driver (driver API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - _next/data (client-side data)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api/auth|api/driver|_next/static|_next/image|_next/data|favicon.ico|public).*)",
  ],
}; 