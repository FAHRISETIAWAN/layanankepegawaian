'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

const DEMO_ACCOUNTS = [
  { nip: '199001012020121001', label: 'Admin' },
  { nip: '199002022020122002', label: 'Verifikator IPG' },
  { nip: '199003032020123003', label: 'Verifikator TUBEL' },
  { nip: '199004042020124004', label: 'Verifikator PWK' },
  { nip: '199005052020125005', label: 'Verifikator UjiKom' },
  { nip: '199006062020126006', label: 'Verifikator Mutasi' },
  { nip: '199007072020127007', label: 'Monitoring' },
  { nip: '199008082020128008', label: 'Pegawai' },
]

function LoginForm() {
  const router        = useRouter()
  const params        = useSearchParams()
  const callbackUrl   = params.get('callbackUrl') ?? '/dashboard'
  const [nip, setNip] = useState('')
  const [pass, setPass] = useState('demo')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nip) return setError('NIP wajib diisi')
    setLoading(true); setError('')
    const res = await signIn('credentials', { nip, password: pass, redirect: false })
    if (res?.ok) {
      router.push(callbackUrl)
    } else {
      setError('NIP tidak ditemukan. Gunakan salah satu NIP demo di bawah.')
      setLoading(false)
    }
  }

  const quickLogin = async (demoNip: string) => {
    setLoading(true); setError('')
    const res = await signIn('credentials', { nip: demoNip, password: 'demo', redirect: false })
    if (res?.ok) router.push(callbackUrl)
    else { setError('Login gagal'); setLoading(false) }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Layanan Kepegawaian</h1>
          <p className="mt-1 text-xs text-slate-400">Demo Mode — Tanpa Keycloak</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">NIP</label>
              <input
                type="text"
                value={nip}
                onChange={e => setNip(e.target.value)}
                placeholder="Masukkan NIP..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600">Password</label>
              <input
                type="password"
                value={pass}
                onChange={e => setPass(e.target.value)}
                placeholder="Password apapun diterima"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50">
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>
        </div>

        {/* Quick login */}
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs font-semibold text-slate-500">Akun Demo — Klik untuk langsung masuk</p>
          <div className="grid grid-cols-2 gap-2">
            {DEMO_ACCOUNTS.map(acc => (
              <button key={acc.nip} onClick={() => quickLogin(acc.nip)} disabled={loading}
                className="rounded-lg border border-slate-200 px-3 py-2 text-left transition hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-50">
                <p className="text-xs font-semibold text-slate-700">{acc.label}</p>
                <p className="truncate text-[10px] text-slate-400">{acc.nip}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
