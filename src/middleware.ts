import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl

    if (
      pathname.startsWith('/login') ||
      pathname.startsWith('/unauthorized') ||
      pathname.startsWith('/error') ||
      pathname.startsWith('/api/')
    ) {
      return NextResponse.next()
    }

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: 'sdm-access-token',
    })

    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.search = ''
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()

  } catch (error) {
    console.error('Middleware error:', error)
    const errUrl = req.nextUrl.clone()
    errUrl.pathname = '/error'
    errUrl.search = ''
    return NextResponse.redirect(errUrl)
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
