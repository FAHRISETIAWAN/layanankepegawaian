'use client'

import { pengajuanApi, type Pengajuan, type StatusPengajuan } from '@/lib/api/pengajuan'
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, UserGroupIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

type StatusType = StatusPengajuan

const LAYANAN_COLOR: Record<string, string> = {
  'IPG Profesi':                              'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400',
  'IPG Sertifikasi':                          'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400',
  'IPG Akademik':                             'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400',
  'Tugas Belajar Beasiswa':                   'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400',
  'Tugas Belajar Mandiri':                    'bg-teal-100 text-teal-600 dark:bg-teal-900/40 dark:text-teal-400',
  'Pindah Wilayah Kerja':                     'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400',
  'Uji Kompetensi JF - Kenaikan Jenjang':     'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400',
  'Uji Kompetensi JF - Perpindahan Jabatan':  'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400',
}

const LAYANAN_ABBR: Record<string, string> = {
  'IPG Profesi':                              'IPG',
  'IPG Sertifikasi':                          'IPG',
  'IPG Akademik':                             'IPG',
  'Tugas Belajar Beasiswa':                   'TBL',
  'Tugas Belajar Mandiri':                    'TBL',
  'Pindah Wilayah Kerja':                     'PWK',
  'Uji Kompetensi JF - Kenaikan Jenjang':     'UJK',
  'Uji Kompetensi JF - Perpindahan Jabatan':  'UJK',
}

const statusConfig: Record<StatusType, { label: string; bg: string; text: string; icon: React.ReactNode }> = {
  menunggu:     { label: 'Menunggu',    bg: 'bg-amber-100 dark:bg-amber-900/30',     text: 'text-amber-700 dark:text-amber-400',     icon: <DocumentTextIcon className="h-3 w-3" /> },
  diproses:     { label: 'Diproses',    bg: 'bg-indigo-100 dark:bg-indigo-900/30',   text: 'text-indigo-700 dark:text-indigo-400',   icon: <ClockIcon className="h-3 w-3" /> },
  diverifikasi: { label: 'Selesai',     bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', icon: <CheckCircleIcon className="h-3 w-3" /> },
  ditolak:      { label: 'Ditolak',     bg: 'bg-red-100 dark:bg-red-900/30',         text: 'text-red-700 dark:text-red-400',         icon: <XCircleIcon className="h-3 w-3" /> },
}

function formatPegawai(names: string[]) {
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]}, ${names[1]}`
  return `${names[0]}, ${names[1]}, +${names.length - 2} lainnya`
}

function formatWaktu(tanggal: string) {
  const d = new Date(tanggal)
  if (isNaN(d.getTime())) return '-'
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
}

export function UpcomingVisits() {
  const [list, setList] = useState<Pengajuan[]>([])
  const [loading, setLoading] = useState(true)

  const LIMIT = 20

  useEffect(() => {
    pengajuanApi.getAll()
      .then((data) => {
        const today = new Date().toISOString().slice(0, 10)
        const todayItems = data.filter((p) => p.tanggal?.slice(0, 10) === today)
        setList(todayItems)
      })
      .catch(() => setList([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col rounded-2xl bg-white dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 sm:p-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-100">Aktivitas Terkini</h2>
          <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
            {loading ? 'Memuat...' : `${list.length} pengajuan hari ini`}
          </p>
        </div>
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
          Hari ini
        </span>
      </div>

      {/* List */}
      {loading ? (
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 py-3.5">
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-36 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-24 animate-pulse rounded bg-slate-100 dark:bg-slate-800" />
              </div>
              <div className="h-5 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="flex items-center justify-center py-10 text-sm text-slate-400 dark:text-slate-500">
          Belum ada pengajuan hari ini
        </div>
      ) : (
        <ul>
          {list.slice(0, LIMIT).map((act) => {
            const st = statusConfig[act.status] ?? statusConfig['menunggu']
            const colorClass = LAYANAN_COLOR[act.layanan] ?? 'bg-slate-100 text-slate-600'
            const abbr = LAYANAN_ABBR[act.layanan] ?? '?'
            const names = act.pegawaiList.map((p) => p.namaPegawai)

            return (
              <li key={act.id} className="flex items-center gap-3 px-4 py-3.5 transition hover:bg-slate-50 dark:hover:bg-slate-700/30 sm:px-5">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold ${colorClass}`}>
                  {abbr}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                    <span className="font-mono">{act.kode}</span>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <span className="font-mono">{act.nomorSurat}</span>
                    <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-slate-500 dark:text-slate-400">{act.layanan}</span>
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1 text-[11px] text-slate-400">
                      <UserGroupIcon className="h-3 w-3 shrink-0" />
                      <span className="truncate">{formatPegawai(names)} ({names.length} orang)</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${st.bg} ${st.text}`}>
                        {st.icon}
                        {st.label}
                      </span>
                      <span className="text-[10px] text-slate-400">{formatWaktu(act.tanggal)}</span>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {/* Footer — hanya tampil jika data melebihi limit */}
      {list.length > LIMIT && (
        <div className="px-4 py-3">
          <button className="w-full text-center text-xs font-medium text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
            Lihat semua aktivitas ({list.length}) →
          </button>
        </div>
      )}
    </div>
  )
}
