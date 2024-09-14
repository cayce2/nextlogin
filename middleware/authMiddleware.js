// middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from './utils/jwt'

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname

  // Define paths that are considered public
  const isPublicPath = path === '/' || path === '/api/auth/login' || path === '/api/auth/register'

  if (isPublicPath) {
    return NextResponse.next()
  }

  // Check for the token in the request cookies
  const token = request.cookies.get('token')?.value

  // If there's no token and the path is not public, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    // Verify the token
    verifyToken(token)
    return NextResponse.next()
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    const response = NextResponse.redirect(new URL('/', request.url))
    response.cookies.delete('token')
    return response
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/api/:path*'],
}