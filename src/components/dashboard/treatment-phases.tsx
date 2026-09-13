'use client'

import { pengajuanApi, type Pengajuan } from '@/lib/api/pengajuan'
import { useEffect, useState } from 'react'

const PHASES = [
  { phase: 'IPG',              keys: ['IPG Profesi', 'IPG Sertifikasi', 'IPG Akademik'],                                                   color: '#6366f1' },
  { phase: 'Tugas Belajar',    keys: ['Tugas Belajar Mandiri', 'Tugas Belajar Beasiswa'],                                                  color: '#10b981' },
  { phase: 'Pindah Wilayah',   keys: ['Pindah Wilayah Kerja'],                                                                            color: '#f97316' },
  { phase: 'Uji Kompetensi',   keys: ['Uji Kompetensi JF - Perpindahan Jabatan', 'Uji Kompetensi JF - Kenaikan Jenjang'],                 color: '#f43f5e' },
]

export function TreatmentPhases() {
  const [data, setData] = useState<{ phase: string; count: number; color: string }[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const thisMonth = new Date().toISOString().slice(0, 7)
    pengajuanApi.getAll()
      .then((list: Pengajuan[]) => {
        const active = list.filter((p) => p.tanggal?.slice(0, 7) === thisMonth)
        setTotal(active.length)
        setData(PHASES.map((ph) => ({
          phase: ph.phase,
          count: active.filter((p) => ph.keys.includes(p.layanan)).length,
          color: ph.color,
        })))
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [])

  const max = Math.max(...data.map((p) => p.count), 1)

  return (
    <div className="h-full rounded-2xl bg-white p-4 dark:bg-slate-800 sm:p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Rekap Jenis Pengajuan</h3>
        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
          {loading ? 'Memuat...' : `Total ${total} pengajuan aktif bulan ini`}
        </p>
      </div>

      {loading ? (
        <div className="space-y-3.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                <div className="h-3 w-8 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="h-2 w-full animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3.5">
          {data.map((p) => (
            <div key={p.phase}>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: p.color }} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{p.phase}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.count}</span>
                  <span className="w-8 text-right text-xs text-slate-400">{Math.round((p.count / max) * 100)}%</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(p.count / max) * 100}%`, backgroundColor: p.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
