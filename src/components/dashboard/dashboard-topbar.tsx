'use client'

import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { ThemeToggle } from './theme-toggle'

const PAGE_LABELS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/patients': 'Patients',
  '/dashboard/calendar': 'Calendar',
  '/dashboard/messages': 'Messages',
  '/dashboard/reports': 'Reports',
  '/dashboard/profile': 'Profile',
  '/dashboard/settings': 'Settings',
  '/formpermintaan': 'Form Permintaan',
  '/formdatapegawai': 'Data Pendidikan Pegawai',
  '/formkelengkapan': 'Kelengkapan Dokumen',
  '/verifikasi': 'Verifikasi Pengajuan',
  '/laporan': 'Laporan Pengajuan',
  '/pegawai': 'Manajemen Pegawai',
  '/hukdis':  'Hukuman Disiplin',
  '/pwk':     'Pindah Wilayah Kerja',
  '/sk': 'Surat Keputusan',
  '/surat/rekomendasi': 'Surat Rekomendasi',
  '/surat/sertifikat': 'Sertifikat',
  '/perpanjangan': 'Perpanjangan TUBEL Beasiswa',
  '/formujikom': 'Uji Kompetensi JF',
}

export function DashboardTopbar() {
  const pathname = usePathname()
  const pageLabel = PAGE_LABELS[pathname] ?? 'Halaman'
  const { data: session } = useSession()
  const nama = session?.user?.name ?? 'Sultan Hasanudin'
  const nip  = (session as { nip?: string } | null)?.nip ?? ''
  const initials = nama.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <header className="flex h-14 items-center justify-between bg-white px-4 dark:bg-slate-900 sm:px-6">
      {/* Left: logo (mobile) + breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 lg:hidden">
          <span className="text-xs font-bold text-white">IP</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-slate-800 dark:text-slate-200">{pageLabel}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        {/* Avatar + dropdown */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
              {initials || 'U'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200">{nama}</p>
              {nip && <p className="text-[10px] text-slate-400 dark:text-slate-500">NIP {nip}</p>}
            </div>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl bg-white py-1 dark:bg-slate-900">
                <div className="px-4 py-3">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">{nama}</p>
                  {nip && <p className="mt-0.5 text-[10px] text-slate-400">NIP {nip}</p>}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
