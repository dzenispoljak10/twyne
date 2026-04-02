import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { rateLimit } from '@/lib/rateLimit'

const TOO_MANY = NextResponse.json(
  { error: 'Zu viele Anfragen. Bitte versuchen Sie es später.' },
  { status: 429 }
)

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getIp(request)

  // ── Rate limiting ──────────────────────────────────────────────────────────
  if (request.method === 'POST') {
    if (pathname === '/api/anfragen') {
      const { success } = rateLimit(`anfragen:${ip}`, 3, 60 * 60 * 1000)
      if (!success) return TOO_MANY
    }

    if (pathname === '/api/uploads') {
      const { success } = rateLimit(`uploads:${ip}`, 5, 60 * 60 * 1000)
      if (!success) return TOO_MANY
    }

    if (pathname.startsWith('/api/auth')) {
      const { success } = rateLimit(`auth:${ip}`, 10, 15 * 60 * 1000)
      if (!success) return TOO_MANY
    }
  }

  // ── Pathname als Header weiterleiten — wird im Admin-Layout gelesen ────────
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', pathname)

  // ── Ausnahmen — kein Auth-Check ────────────────────────────────────────────
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/upload/') ||
    pathname === '/admin/login'
  ) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // ── Admin-Schutz ───────────────────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    const secureCookie = request.url.startsWith('https://')
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
      secureCookie,
    })

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
