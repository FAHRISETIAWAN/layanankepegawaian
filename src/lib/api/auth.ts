import { getSession } from 'next-auth/react'

export interface AuthUser {
  nip: string
  nama: string
  jabatan: string
  unit: string
  email: string
  role: string
}

export interface LoginResponse {
  access_token: string
  user: AuthUser
}

export function logout() {
  window.location.href = '/api/auth/signout'
}

export async function getMe(): Promise<AuthUser> {
  const session = await getSession()
  if (!session?.user) throw new Error('Unauthorized')
  return {
    nip:     (session as any).nip ?? '',
    nama:    session.user.name ?? '',
    jabatan: (session.user as any).jabatan ?? '',
    unit:    (session.user as any).unit ?? '',
    email:   session.user.email ?? '',
    role:    (session.user as any).role ?? 'pegawai',
  }
}
