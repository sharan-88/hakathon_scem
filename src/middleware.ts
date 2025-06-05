import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Paths that require authentication
const protectedPaths = [
  '/student',
  '/college',
  '/company',
];

// Public paths that don't require authentication
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Get auth token from cookie
  const authToken = request.cookies.get('auth_token');
  const userRole = request.cookies.get('user_role');

  // If no auth token, redirect to login
  if (!authToken || !userRole) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  const role = userRole.value;
  const isStudentPath = pathname.startsWith('/student');
  const isCollegePath = pathname.startsWith('/college');
  const isCompanyPath = pathname.startsWith('/company');

  // Redirect to appropriate dashboard based on role
  if (role === 'student' && !isStudentPath) {
    return NextResponse.redirect(new URL('/student/dashboard', request.url));
  }
  if (role === 'college' && !isCollegePath) {
    return NextResponse.redirect(new URL('/college/dashboard', request.url));
  }
  if (role === 'company' && !isCompanyPath) {
    return NextResponse.redirect(new URL('/company/dashboard', request.url));
  }

  // Allow access if role matches path
  if (
    (role === 'student' && isStudentPath) ||
    (role === 'college' && isCollegePath) ||
    (role === 'company' && isCompanyPath)
  ) {
    return NextResponse.next();
  }

  // Redirect to appropriate dashboard if role doesn't match path
  const dashboardUrls = {
    student: '/student/dashboard',
    college: '/college/dashboard',
    company: '/company/dashboard',
  };

  return NextResponse.redirect(new URL(dashboardUrls[role as keyof typeof dashboardUrls], request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 