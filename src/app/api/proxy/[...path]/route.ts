import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const BE_URL = process.env.BE_URL ?? 'http://localhost:3001/api'

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: 'sdm-access-token',
  })

  const targetPath = path.join('/')
  const search = req.nextUrl.search ?? ''
  const url = `${BE_URL}/${targetPath}${search}`

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Gunakan access_token Keycloak sebagai Bearer ke BE
  const accessToken = (token as any)?.access_token ?? req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`
  }

  const body = req.method !== 'GET' && req.method !== 'HEAD'
    ? await req.text()
    : undefined

  const res = await fetch(url, {
    method: req.method,
    headers,
    body,
  })

  const data = await res.text()

  return new NextResponse(data, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('Content-Type') ?? 'application/json' },
  })
}

export const GET    = handler
export const POST   = handler
export const PATCH  = handler
export const PUT    = handler
export const DELETE = handler
