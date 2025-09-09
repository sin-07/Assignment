import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define routes that require authentication
const protectedRoutes = [
  '/leads',
  '/campaigns',
  '/linkedin-accounts',
  '/activity-logs',
  '/user-logs', 
  '/settings'
]

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/login-success'
]

// Helper function to check if user is authenticated by looking at cookie
function isAuthenticated(request: NextRequest): boolean {
  // Check if user data exists in cookies (we'll set this when user logs in)
  const userData = request.cookies.get('userData')
  return !!userData?.value
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow API routes to pass through
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const isPublicRoute = publicRoutes.includes(pathname)
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const userIsAuthenticated = isAuthenticated(request)

  // If user is on a protected route and not authenticated, redirect to login
  if (isProtectedRoute && !userIsAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and trying to access login/register, redirect to leads
  if (userIsAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/leads', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)  
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
