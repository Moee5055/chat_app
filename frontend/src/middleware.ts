import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

const isProtectedRoute = createRouteMatcher(['/chats']);

export default clerkMiddleware(async (auth, request) => {
  const user = await auth();
  if (isProtectedRoute(request)) {
    await auth.protect();
  }
  if (user.userId && isPublicRoute(request)) {
    return NextResponse.redirect(new URL('/chats', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
