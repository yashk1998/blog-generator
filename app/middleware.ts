import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AuthService } from './lib/auth';

export async function middleware(request: NextRequest) {
  
  const publicPaths = ['/login', '/register'];
  
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const user = await AuthService.getCurrentUser();
  
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};